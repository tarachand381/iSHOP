import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MainContext } from '../../../Context';
import { VscDiffMultiple } from "react-icons/vsc";
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios';
import Swal from 'sweetalert2'
import ReactDOMServer from "react-dom/server"


export default function ProductView() {
    const { category, categoryHandler, API_BASE_URL, CATEGORY, notify, PRODUCT_URL, getProduct, product } = useContext(MainContext);

    useEffect(
        () => {
            getProduct();
        }, []
    )
    function statusHandler(id, flag) {

        axios.patch(API_BASE_URL + PRODUCT_URL + `/status-update`, { id, flag }).then(

            (responce) => {

                if (responce.data.status == 1) {

                    getProduct();
                }
                notify(responce.data.msg, responce.data.status)
            }
        ).catch(
            (error) => {

                notify("internal server error", responce.data.status)

            })
    }

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(API_BASE_URL + PRODUCT_URL + `/delete/` + id)
                    .then((response) => {
                        if (response.data.status === 1) {
                            getProduct();  // refresh products
                            notify(response.data.msg, response.data.status);
                            Swal.fire("Deleted!", "Product has been deleted.", "success");
                        } else {
                            notify(response.data.msg, response.data.status);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        notify("Internal server error", 0);
                    });
            }
        });
    };


    const viewAllDetails = (prod) => {
        const popUpProduct = ReactDOMServer.renderToString(<PopUpProduct API_BASE_URL={API_BASE_URL} product={prod} />)
        Swal.fire({
            html: popUpProduct,
            showCloseButton: true,
            customClass: {
                popup: "w-[800px]"
            }
        });
    }
    return (
        <div className="flex items-center justify-center ">
            <div className='w-full max-w-9xl  bg-white p-4 rounded-lg shadow-md'>
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='text-2xl font-semibold uppercase text-gray-900'>Product Manegment</h1>
                    <Link to={"/admin/product/add"}>
                        <button className="bg-blue-800 text-white px-3 py-2 text-[18px] rounded hover:bg-blue-900">
                            Add New Product
                        </button> </Link>
                </div>
                <table className="min-w-full text-sm bg-white border mt-5  rounded-lg">
                    <thead className='bg-blue-600 text-white text-[20px]'>
                        <tr>
                            <th className="px-4 py-2 border-b text-center"> Name</th>
                            <th className="px-4 py-2 border-b text-center"> Price</th>
                            <th className="px-4 py-2 border-b text-center"> Category</th>
                            <th className="px-4 py-2 border-b text-center">Image</th>
                            <th className="px-4 py-2 border-b text-center">Status</th>
                            <th className="px-4 py-2 border-b text-center">Stock</th>
                            <th className="px-4 py-2 border-b text-center">Top selling</th>
                            <th className="px-4 py-2 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {
                            Array.isArray(product) &&
                            product.map(
                                (prod, i) => {
                                    return (
                                        <tr key={i} className="hover:bg-gray-50 transition text-[17px] duration-200">
                                            <td className="px-4 py-2 border-b  text-gray-800 text-center">{prod.name}</td>
                                            <td className="px-4 py-2 border-b  text-gray-800 text-center">
                                                <span> ₹{prod.finalPrice} </span>
                                                <del>₹{prod.originalPrice}</del>
                                                <span className='text-red-500 :'>({prod.discountPercentage}%)</span>
                                            </td>

                                            <td className="px-4 py-2 text-gray-800 border-b text-center">{prod?.categoryId?.name}</td>
                                            <td className="px-4 py-2  text-center">
                                                <img src={API_BASE_URL + "/product/" + prod.thumbnail}
                                                    alt="product"
                                                    className='w-14 h-14 rounded-md text-center mt-1 mx-auto'
                                                />
                                            </td>

                                            <td className="px-4 py-2 text-gray-600 text-center">
                                                {
                                                    prod.status ?
                                                        <button
                                                            onClick={() => statusHandler(prod._id, 1)} className="px-4 py-2 bg-green-600 rounded-full text-white  hover:bg-green-700 transition"
                                                        >
                                                            Active
                                                        </button>
                                                        :
                                                        <button onClick={() => statusHandler(prod._id, 1)} className="  bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 ">
                                                            InActive
                                                        </button>
                                                }
                                            </td>
                                            <td className="px-4 py-2 text-gray-600 text-center">

                                                {
                                                    prod.stock ?
                                                        <button
                                                            onClick={() => statusHandler(prod._id, 2)} className="px-4 py-2 bg-green-600 rounded-full text-white  hover:bg-green-700 transition"
                                                        >
                                                            In
                                                        </button>

                                                        :
                                                        <button onClick={() => statusHandler(prod._id, 2)} className="  bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 ">
                                                            Out
                                                        </button>
                                                }
                                            </td>

                                            <td className="px-4 py-2 text-gray-600 text-center">
                                                {
                                                    prod.topSelling ?
                                                        <button

                                                            onClick={() => statusHandler(prod._id, 3)} className="px-4 py-2 bg-green-600 rounded-full text-white  hover:bg-green-700 transition"
                                                        >
                                                            Yes
                                                        </button>

                                                        :
                                                        <button onClick={() => statusHandler(prod._id, 3)} className="  bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 ">
                                                            No
                                                        </button>
                                                }
                                            </td>
                                            <td className="px-4 py-2 flex text-center items-center justify-center space-x-2">

                                                <Link to={`/admin/product/edit/${prod._id}`}>
                                                    <button className="flex items-center mt-2 bg-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-800 ">
                                                        <FaEdit className="text-lg" />
                                                    </button>
                                                </Link>

                                                <button onClick={() => deleteHandler(prod._id)} className="flex items-center mt-2 bg-red-600 text-white px-2 py-2 rounded-full shadow-md hover:bg-red-700 ">
                                                    <FaTrash className="text-lg" />
                                                </button>

                                                <Link to={`/admin/product/multiple-image/` + prod._id}>
                                                    <button className="flex items-center mt-2 bg-purple-600 text-white px-2 py-2 rounded-full shadow-md hover:bg-purple-700 ">
                                                        <VscDiffMultiple />
                                                    </button>
                                                </Link>

                                                <button onClick={() => viewAllDetails(prod)} className="flex items-center mt-2 bg-yellow-600 text-white px-2 py-2 rounded-full shadow-md hover:bg-yellow-700 ">
                                                    <IoEyeSharp />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PopUpProduct({ product, API_BASE_URL }) {

    return (
        <div className="p-6 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-hidden">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-6 py-3 text-left font-semibold uppercase">Field</th>
                            <th className="px-6 py-3 text-left font-semibold uppercase">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Name</td>
                            <td className="px-6 py-4 text-gray-600">{product.name}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Slug</td>
                            <td className="px-6 py-4 text-gray-600">{product.slug}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">
                                Short Description
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {product.shortDescription}
                            </td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">
                                Long Description
                            </td>
                            <td className="px-6 py-4 text-gray-600" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">
                                Original Price
                            </td>
                            <td className="px-6 py-4 text-gray-600">{product.originalPrice}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">
                                Discount Percentage
                            </td>
                            <td className="px-6 py-4 text-gray-600">10%</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Final Price</td>
                            <td className="px-6 py-4 text-gray-600"></td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Category ID</td>
                            <td className="px-6 py-4 text-gray-600">63f7b2c1e123456789abcdef</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Colors</td>
                            <td className="px-6 py-4 text-gray-600">Red, Blue</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Thumbnail</td>
                            <td className="px-6 py-4 text-gray-600">
                                {product?.thumbnail ? (
                                    <img
                                        src={`${API_BASE_URL}/product/${encodeURIComponent(product.thumbnail)}`}
                                        alt="Thumbnail"
                                        className="w-16 h-16 rounded-md shadow-md"
                                    />
                                ) : (
                                    <span className="text-gray-400">No thumbnail</span>
                                )}
                            </td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Images</td>
                            <td className="px-6 py-4 text-gray-600">
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(product?.images) && product.images.length > 0 ? (
                                        product.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={`${API_BASE_URL}/product/${encodeURIComponent(img)}`}
                                                alt={`Image ${i + 1}`}
                                                className="w-16 h-16 rounded-md shadow-md"
                                            />
                                        ))
                                    ) : (
                                        <span className="text-gray-400">No images</span>
                                    )}
                                </div>
                            </td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Stock</td>
                            <td className="px-6 py-4 text-gray-600">In Stock</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Top Selling</td>
                            <td className="px-6 py-4 text-gray-600">Yes</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Status</td>
                            <td className="px-6 py-4 text-gray-600">Active</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Created At</td>
                            <td className="px-6 py-4 text-gray-600">2025-01-15</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-blue-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Updated At</td>
                            <td className="px-6 py-4 text-gray-600">2025-01-16</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
} 