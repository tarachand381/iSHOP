import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { HiChevronRight } from 'react-icons/hi'
import { useRef } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { MainContext } from '../../../Context';

export default function ColorAdd() {

    const { notify, API_BASE_URL, colorHandler, COLOR_URL, color } = useContext(MainContext)



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {

            name: e.target.name.value,
            colorCode: e.target.colorCode.value,


        }



        axios.post(API_BASE_URL + COLOR_URL + "/create", data).then(

            (responce) => {

                if (responce.data.status == 1) {

                    e.target.reset()
                }
                notify(responce.data.msg, responce.data.status)
            }
        ).catch(

            (error) => {

                notify("internal server error", 0)

            }

        )

    };

    return (

        <>
            <nav className="flex mt-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link
                            to="/admin"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-800 "
                        >
                            <HiHome className="w-4 h-4 me-2.5" />
                            DashBoard
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <HiChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                            <Link
                                to="/admin/color"
                                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-800 md:ms-2 "
                            >
                                Color
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <HiChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                Add
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="max-w-xxl text-[17px] mx-auto mt-10 bg-white p-8 rounded shadow">
                <h2 className="text-3xl bg-slate-200 font-bold mb-6 text-center">Add Color</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Color Name:</label>
                        <input
                            name='name'

                            type="text"

                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">color code:</label>
                        <input
                            name='colorCode'
                            type="color"

                            className="w-full h-10  border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                    >
                        Add Color
                    </button>

                </form>
            </div>
        </>
    );
}
