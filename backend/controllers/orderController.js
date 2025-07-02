require("dotenv").config();
const cartModel = require("../modules/CartModel");
const OrderModel = require("../modules/OrderModel");
const Razorpay = require('razorpay');
const crypto = require("crypto");

var RazorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_id,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class orderController {
    orderPlace(order_data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    console.log("orderPlace called with:", order_data);

                    const { user_id, order_total, payment_mode, shipping_details } = order_data;

                    // Fetch cart with populated product details
                    const cart = await cartModel.find({ user_id }).populate('product_id', '_id finalPrice');

                    console.log("Cart fetched from DB:", cart);

                    // Filter out cart items where product_id is null
                    const validCartItems = cart.filter(cd => cd.product_id !== null);

                    if (validCartItems.length === 0) {
                        return reject({
                            msg: "Cart is empty or all products are invalid",
                            status: 0
                        });
                    }

                    // Map only valid items to product_details
                    const product_details = validCartItems.map(cd => {
                        return {
                            product_id: cd.product_id._id,
                            qty: cd.qty,
                            price: cd.product_id.finalPrice,
                            total: (cd.product_id.finalPrice * cd.qty)
                        };
                    });

                    console.log("Product details for order:", product_details);

                    const order = new OrderModel({
                        user_id: user_id,
                        product_details: product_details,
                        order_total: order_total,
                        payment_mode: payment_mode,
                        shipping_details: shipping_details
                    });

                    await order.save();

                    // Clear the cart after order is placed
                    await cartModel.deleteMany({ user_id });

                    if (payment_mode == 0) {
                        // COD Payment
                        resolve({
                            msg: "Order placed successfully (COD)",
                            status: 1,
                            order_id: order._id
                        });
                    } else {
                        // Online Payment - Razorpay flow
                        this.intialPaymentGateWay(order._id, order_total).then(
                            (razorpay_order) => {
                                resolve({
                                    msg: "Order placed successfully",
                                    status: 1,
                                    razorpay_order
                                });
                            }
                        ).catch(
                            (err) => {
                                console.log("intialPaymentGateWay error:", err);
                                reject({
                                    msg: "Order not placed due to payment gateway error",
                                    status: 0
                                });
                            }
                        );
                    }
                } catch (error) {
                    console.log("orderPlace error:", error);
                    reject({
                        msg: "Internal server error",
                        status: 0
                    });
                }
            }
        );
    }

    intialPaymentGateWay(order_id, order_total) {
        return new Promise(
            (resolve, reject) => {
                try {
                    var options = {
                        amount: order_total * 100, // amount in paise
                        currency: "INR",
                        receipt: order_id.toString()
                    };

                    RazorpayInstance.orders.create(options, async function (err, razorpay_order) {
                        if (err) {
                            console.log("Razorpay order create error:", err);
                            reject({
                                msg: "intialPaymentGateWay Error",
                                status: 0
                            });
                        } else {
                            await OrderModel.updateOne(
                                { _id: order_id },
                                { razorpay_order_id: razorpay_order.id }
                            );
                            resolve({
                                msg: "Order created",
                                status: 1,
                                order_id,
                                razorpay_order: razorpay_order.id
                            });
                        }
                    });

                } catch (error) {
                    console.log("intialPaymentGateWay catch error:", error);
                    reject({
                        msg: "Internal server error",
                        status: 0
                    });
                }
            }
        );
    }

    async paymentSuccess(order_data) {
        return new Promise(async (resolve, reject) => {
            try {
                const { order_id, user_id, razorpay_response } = order_data;

                // Create data string for signature verification
                const data = `${razorpay_response.razorpay_order_id}|${razorpay_response.razorpay_payment_id}`;

                // Generate HMAC-SHA256 signature using secret key
                const generatedSignature = crypto
                    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                    .update(data)
                    .digest('hex');

                // Compare signatures
                if (generatedSignature === razorpay_response.razorpay_signature) {
                    await cartModel.deleteMany({ user_id });

                    await OrderModel.updateOne(
                        { razorpay_order_id: razorpay_response.razorpay_order_id },
                        {
                            razorpay_payment_id: razorpay_response.razorpay_payment_id,
                            order_status: 1
                        }
                    );

                    resolve({ status: 1, msg: 'Order placed successfully' });
                } else {
                    reject({ status: 0, msg: 'Payment verification failed' });
                }
            } catch (error) {
                console.log("paymentSuccess error:", error);
                reject({ msg: "Internal server error", status: 0 });
            }
        });
    }
}

module.exports = orderController;
