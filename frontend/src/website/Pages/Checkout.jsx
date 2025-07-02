import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainContext } from "../../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../redux/reducers/cartSlice";
import { useRazorpay } from "react-razorpay";

const Checkout = () => {
    const { Razorpay } = useRazorpay();
    const { API_BASE_URL, ORDER_URL, notify } = useContext(MainContext);

    const user = useSelector((state) => state.user.data);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const [selectedAddress, setSelectedAddress] = useState(0);
    const [paymentMode, setPaymentMode] = useState(0);

    const handlePlaceOrder = () => {
        const address = user?.shipping_address?.[selectedAddress];

        if (!user || !address || !cart?.total) {
            console.log("Missing data", { user, address, cart });
            notify("Missing required information", 0);
            return;
        }


        const payload = {
            user_id: user._id,
            order_total: cart.total,
            payment_mode: paymentMode,
            shipping_details: address,
        };

        console.log("📦 Sending order payload", payload);

        axios
            .post(`${API_BASE_URL}${ORDER_URL}/place-order`, payload)
            .then((res) => {
                if (res.data.status === 1) {
                    if (paymentMode === 0) {
                        navigator(`/thankYou/${res.data.order_id}`);
                        dispatch(emptyCart());
                    } else {
                        handlePayment(res.data.order_id, res.data.razorpay_order.razorpay_order);
                    }
                } else {
                    notify(res.data.msg || "Order failed", 0);
                }
            })
            .catch((err) => {
                console.error("❌ Order Error:", err.response?.data || err.message);
                notify("Order placement failed", 0);
            });
    };

    const handlePayment = async (order_id, razorpay_order_id) => {
        const options = {
            key: "rzp_test_gVUyxQXH72z0U1",
            currency: "INR",
            name: "iSHOP",
            description: "Test Transaction",
            image: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
            order_id: razorpay_order_id,
            handler: async function (response) {
                try {
                    const res = await axios.post(`${API_BASE_URL}${ORDER_URL}/payment-success`, {
                        order_id,
                        razorpay_response: response,
                        user_id: user._id,
                    });

                    notify(res.data.msg, res.data.status);
                    if (res.data.status === 1) {
                        navigator(`/thankYou/${res.data.order_id}`);
                        dispatch(emptyCart());
                    }
                } catch (error) {
                    console.error("Payment Success API Error:", error);
                    notify("Payment confirmation failed", 0);
                }
            },
            prefill: {
                name: user?.name,
                email: user?.email,
                contact: user?.contact,
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new Razorpay(options);
        rzp.on("payment.failed", function (response) {
            alert("Payment Failed");
            console.error(response.error);
        });
        rzp.open();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Left Section */}
                <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h1>

                    {/* Address */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Address</h2>
                        {user?.shipping_address?.map((address, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedAddress(index)}
                                className={`p-4 border rounded-lg mb-4 cursor-pointer ${selectedAddress === index ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                    }`}
                            >
                                <p className="font-medium">{address.name}</p>
                                <p>{address.contact}</p>
                                <p>{address.addressLine1}</p>
                                {address.addressLine2 && <p>{address.addressLine2}</p>}
                                <p>
                                    {address.city}, {address.state}, {address.postalCode}
                                </p>
                                <p>{address.country}</p>
                            </div>
                        ))}
                        <div className="w-[100px] text-center p-2 bg-blue-500 text-white rounded-md cursor-pointer">+</div>
                    </div>

                    {/* Payment Mode */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Payment Mode</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setPaymentMode(0)}
                                className={`flex-1 py-3 text-center rounded-lg font-medium border ${paymentMode === 0
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-gray-50 text-gray-700 border-gray-300"
                                    }`}
                            >
                                Cash on  Delivery (COD)
                            </button>
                            <button
                                onClick={() => setPaymentMode(1)}
                                className={`flex-1 py-3 text-center rounded-lg font-medium border ${paymentMode === 1
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-gray-50 text-gray-700 border-gray-300"
                                    }`}
                            >
                                Online Payment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                    <div className="p-4 bg-gray-50 border rounded-lg">
                        <div className="flex justify-between mb-2">
                            <p>Total Amount:</p>
                            <p className="font-medium">₹{cart.original_total}</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p>Discount:</p>
                            <p className="text-green-600">₹{cart.original_total - cart.total}</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p>Final Amount:</p>
                            <p className="font-semibold text-lg">₹{cart.total}</p>
                        </div>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
