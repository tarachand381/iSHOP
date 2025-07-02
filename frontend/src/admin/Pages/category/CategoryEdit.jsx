import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { HiChevronRight } from 'react-icons/hi'
import { useRef } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { MainContext } from '../../../Context';

export default function CategoryEdit() {
    const { categoryId } = useParams();
    const { notify, API_BASE_URL, CATEGORY, categoryHandler, category } = useContext(MainContext)
    const categoryName = useRef();
    const categorySlug = useRef();

    function generateSlug() {
        let slug = categoryName.current.value;
        slug = slug.toString()
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        categorySlug.current.value = slug;
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', categoryName.current.value);
        formData.append('slug', categorySlug.current.value);
        formData.append('category_image', e.target.category_image.files[0]);

        axios.put(API_BASE_URL + CATEGORY + "/update/" + categoryId, formData).then(

            (responce) => {

                if (responce.data.status == 1) {

                    e.target.reset()
                }
                notify(responce.data.msg, responce.data.status)
            }
        ).catch(

            (error) => {
                console.log(error)
            }
        )
    };

    useEffect(
        () => {
            categoryHandler(categoryId)

        }, [categoryId]
    )

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
                                to="/admin/category"
                                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-800 md:ms-2 "
                            >
                                Category
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
                <h2 className="text-3xl bg-slate-200 font-bold mb-6 text-center">Add Category</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Category Name:</label>
                        <input
                            onChange={generateSlug}
                            ref={categoryName}
                            defaultValue={category.name}
                            type="text"

                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Slug:</label>
                        <input
                            ref={categorySlug}
                            defaultValue={category.slug}
                            readOnly
                            type="text"

                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Image:</label>
                        <input
                            type="file"
                            name='category_image'
                            className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />

                        <img className='w-[70px] mt-5' src={API_BASE_URL + '/category/' + category.category_image} alt="" />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                    >
                        Add Category
                    </button>

                </form>
            </div>
        </>
    );
}
