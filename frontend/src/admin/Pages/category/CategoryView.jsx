import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MainContext } from '../../../Context';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function CategoryView() {
    const { category, categoryHandler, API_BASE_URL, CATEGORY, notify } = useContext(MainContext);

    useEffect(
        () => {
            categoryHandler();
        }, []
    )
    function statusHandler(id) {

        axios.patch(API_BASE_URL + CATEGORY + `/status/${id}`).then(
            (responce) => {

                if (responce.data.status == 1) {
                    categoryHandler();
                }
                notify(responce.data.msg, responce.data.status)
            }
        ).catch(
            (error) => {

                notify("internal server error", 0)

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
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                axios.delete(API_BASE_URL + CATEGORY + `/delete/` + id).then(

                    (responce) => {
                        if (responce.data.status == 1) {

                            categoryHandler();
                        }
                        notify(responce.data.msg, responce.data.status)
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
            }
        });
    }

    return (
        <div className="flex items-center justify-center ">
            <div className='w-full max-w-9xl  bg-white p-4 rounded-lg shadow-md'>
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='text-2xl font-semibold uppercase text-gray-900'>Category Manegment</h1>
                    <Link to={"/admin/category/add"}>
                        <button className="bg-blue-800 text-white px-3 py-2 text-[18px] rounded hover:bg-blue-900">
                            Add New Category
                        </button> </Link>
                </div>
                <table className="min-w-full text-sm bg-white border mt-3 border-gray-200 rounded-lg">
                    <thead className='bg-blue-600 text-white text-[20px]'>
                        <tr>
                            <th className="px-4 py-2 border-b text-center">Category Name</th>
                            <th className="px-4 py-2 border-b text-center">Slug</th>
                            <th className="px-4 py-2 border-b text-center">Image</th>
                            <th className="px-4 py-2 border-b text-center">Status</th>
                            <th className="px-4 py-2 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {
                            Array.isArray(category) &&
                            category.map(
                                (cat, i) => {
                                    return (
                                        <tr key={i} className="hover:bg-gray-50 transition text-[17px] duration-200">
                                            <td className="px-4 py-2 border-b text-gray-800 text-center">{cat.name}</td>
                                            <td className="px-4 py-2 border-b text-gray-800 text-center">{cat.slug}</td>

                                            <td className="px-4 py-2  text-center">
                                                <img src={API_BASE_URL + "/category/" + cat.category_image}
                                                    alt="Category"
                                                    className='w-14 h-14 rounded-md mt-1 mx-auto'
                                                />
                                            </td>

                                            <td className="px-4 py-2 text-gray-600 text-center">
                                                {
                                                    cat.status ?
                                                        <button
                                                            onClick={() => statusHandler(cat._id)}
                                                            className="px-4 py-2 bg-green-600 rounded-full text-white  hover:bg-green-700 transition"
                                                        >
                                                            Active
                                                        </button>
                                                        :
                                                        <button onClick={() => statusHandler(cat._id)} className="  bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 ">
                                                            InActive
                                                        </button>
                                                }
                                            </td>

                                            <td className=" gap-1 py-2 flex text-center items-center justify-center space-x-2">

                                                <Link to={`/admin/category/edit/${cat._id}`}>
                                                    <button className="flex items-center bg-blue-700 text-white px-4 py-2 mt-2 rounded-full  shadow-md hover:bg-blue-800 ">
                                                        <FaEdit />
                                                    </button>
                                                </Link>

                                                <button onClick={() => deleteHandler(cat._id)} className="flex items-center mt-2 bg-red-600 text-white  px-4 py-2 rounded-full shadow-md hover:bg-red-700 ">
                                                    <FaTrash />
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