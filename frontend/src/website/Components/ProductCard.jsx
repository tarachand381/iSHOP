import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cartSlice";
import axios from "axios";
import { MainContext } from "../../Context";

const ProductCard = ({ product }) => {
    const { API_BASE_URL, USER_URL } = useContext(MainContext)
    const user = useSelector((state) => state.user)

    const dispatcher = useDispatch()

    function addCartButton(productData) {
        if (user != null) {
            axios.post(API_BASE_URL + USER_URL + "/add-to-cart", {
                userId: user.data._id,
                productId: productData.productId
            })

        }
        dispatcher(addToCart(productData))


    }

    return (
        <div className="max-w-sm rounded h-[370px] overflow-hidden shadow-lg border border-gray-200 bg-white">
            <img
                className="w-full h-48 object-cover"
                src={`http://localhost:5000/product/${product.thumbnail}`}
                alt="Product"
            />
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-lg font-semibold text-gray-900">₹{product.finalPrice}</span>
                        <span className="text-sm line-through text-gray-500 ml-2">
                            {product.originalPrice}
                        </span>
                    </div>
                    <span className="text-green-500 text-sm font-bold">Save {product.discountPercentage}%</span>
                </div>
                <ul className='flex my-4  gap-4'>

                    {
                        product?.colors?.map((col, i) => {
                            return (
                                <li style={{ background: col.colorCode }} key={i} className='w-[20px] h-[20px]  rounded-full  border'>

                                </li>
                            )
                        })
                    }

                </ul>
                <button onClick={() => addCartButton({
                    productId: product._id,
                    finalPrice: product.finalPrice,
                    originalPrice: product.originalPrice
                })} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;