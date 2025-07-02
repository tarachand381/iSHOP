import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MainContext } from '../../../Context';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function ColorView() {
    const { colorHandler, COLOR_URL, color, API_BASE_URL, notify } = useContext(MainContext);

    useEffect(
        () => {
            colorHandler();
        }, []
    )

    function statusHandler(id) {

        axios.patch(API_BASE_URL + COLOR_URL + `/status/${id}`).then(

            (responce) => {

                if (responce.data.status == 1) {

                    colorHandler();
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

                axios.delete(API_BASE_URL + COLOR_URL + `/delete/` + id).then(

                    (responce) => {
                        if (responce.data.status == 1) {

                            colorHandler();
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
                    <h1 className='text-2xl font-semibold uppercase text-gray-900'>Color Manegment</h1>
                    <Link to={"/admin/color/add"}>
                        <button className="bg-blue-800 text-white px-3 py-2 text-[18px] rounded hover:bg-blue-900">
                            Add New Color
                        </button> </Link>
                </div>
                <table className="min-w-full text-sm bg-white  border mt-6 border-gray-200 rounded-lg">
                    <thead className='bg-blue-600 text-white text-[20px] bg-blue-00 '>
                        <tr>
                            <th className="px-4 py-2 border-b text-center">Color Name</th>
                            <th className="px-4 py-2 border-b text-center">Color Code</th>

                            <th className="px-4 py-2 border-b text-center">Status</th>
                            <th className="px-4 py-2 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>

                        {

                            Array.isArray(color) &&
                            color.map(
                                (d, i) => {
                                    return (
                                        <tr key={i} className="hover:bg-gray-50 transition text-[18px] duration-200">
                                            <td className="px-4 py-2 border-b text-gray-800 text-center">{d.name}</td>
                                            <td className="text-center">
                                                <div style={{ background: d.colorCode }} className=" text-gray-800 px-6 py-3 text-md rounded-xl">
                                                    {d.colorCode}
                                                </div>
                                            </td>


                                            <td className="px-4 py-2 text-gray-600 text-center">

                                                {
                                                    d.status ?
                                                        <button
                                                            onClick={() => statusHandler(d._id)}
                                                            className="px-5  py-2 bg-green-600 rounded-full text-white  hover:bg-green-700 transition"
                                                        >
                                                            Active
                                                        </button>

                                                        :
                                                        <button onClick={() => statusHandler(d._id)} className="  bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 ">
                                                            InActive
                                                        </button>

                                                }
                                            </td>
                                            <td className="px-4 gap-3 py-2 flex text-center items-center justify-center space-x-2">


                                                <Link to={`/admin/color/edit/${d._id}`}>


                                                    <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-800 ">
                                                        <FaEdit className="text-lg" />

                                                    </button>
                                                </Link>

                                                <button onClick={() => deleteHandler(d._id)} className="flex items-center  bg-red-600 text-white px-3 py-2 rounded-full shadow-md hover:bg-red-700 ">
                                                    <FaTrash className="text-lg" />

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