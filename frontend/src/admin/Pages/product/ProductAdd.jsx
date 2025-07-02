import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiHome } from 'react-icons/hi'
import { HiChevronRight } from 'react-icons/hi'
import { MainContext } from "../../../Context";
import Select from 'react-select'
import axios from "axios";
import { toast } from "react-toastify";
export default function ProductAdd() {


    const { notify, category, categoryHandler, API_BASE_URL, CATEGORY, colorHandler, COLOR_URL, color, PRODUCT_URL }
        = useContext(MainContext)

    const [selColors, SetselColors] = useState([])

    const productName = useRef();
    const productSlug = useRef();
    const originaPrice = useRef();
    const discountPrice = useRef();
    const finalPrice = useRef();

    const finaPriceCalculate = () => {

        let op = originaPrice.current.value
        let dp = discountPrice.current.value
        let final = Math.floor(op - op * (dp / 100))
        finalPrice.current.value = final

    }

    function generateSlug() {
        let slug = productName.current.value;
        slug = slug.toString()
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        productSlug.current.value = slug;
    }

    const submitHandler = (e) => {

        e.preventDefault()


        const form = new FormData()
        form.append("name", productName.current.value);
        form.append("slug", productSlug.current.value);
        form.append("originalPrice", originaPrice.current.value);
        form.append("discountPercentage", discountPrice.current.value);
        form.append("finalPrice", finalPrice.current.value);
        form.append("categoryId", e.target.category.value);
        form.append("sortDescription", e.target.sortDescription.value)
        form.append("longDescription", e.target.longDescription.value)
        form.append("thumbnail", e.target.thumbnail.files[0])
        form.append("colors", JSON.stringify(selColors))


        axios.post(API_BASE_URL + PRODUCT_URL + "/create", form).then(

            (response) => {
                if (response.data.status == 1) {
                    e.target.reset()
                }
                notify(response.data.msg, response.data.status)
            }
        ).catch(

            (error) => {

                notify("Internal server error", 0)

            }
        )

    }

    useEffect(
        () => {

            categoryHandler()
            colorHandler()
        },
        []
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
                                to="/admin/product"
                                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-800 md:ms-2 "
                            >
                                Product
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

            <section className="bg-gray-100 py-10">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Add a New Product
                    </h2>
                    <form onSubmit={submitHandler}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div>
                                <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    ref={productName}
                                    onChange={generateSlug}
                                    id="name"
                                    placeholder="Type product name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label htmlFor="slug" className="block text-base font-medium text-gray-700 mb-1">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    ref={productSlug}
                                    id="slug"
                                    placeholder="Product slug"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Prices Row (3 columns) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                            {/* Original Price */}
                            <div>
                                <label htmlFor="originalPrice" className="block text-base font-medium text-gray-700 mb-1">
                                    Original Price
                                </label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    id="originalPrice"
                                    onChange={finaPriceCalculate}
                                    ref={originaPrice}
                                    placeholder="enter originalPrice"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>

                            {/* Discount Price */}
                            <div>
                                <label htmlFor="discountPercentage" className="block text-base font-medium text-gray-700 mb-1">
                                    Discount Price
                                </label>
                                <input
                                    type="number"
                                    name="discountPercentage"
                                    id="discountPercentage"
                                    onChange={finaPriceCalculate}
                                    ref={discountPrice}
                                    placeholder="enter discountPercentage"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>

                            {/* Final Price */}
                            <div>
                                <label htmlFor="finalPrice" className="block text-base font-medium text-gray-700 mb-1">
                                    Final Price
                                </label>
                                <input
                                    type="number"
                                    name="finalPrice"
                                    id="finalPrice"
                                    ref={finalPrice}
                                    readOnly
                                    placeholder="enter finalPrice"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>
                        </div>



                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">


                            <div>
                                <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-1">
                                    Category
                                </label>

                                <Select
                                    name="category"
                                    options={
                                        category.map((cat, i) => {

                                            return { value: cat._id, label: cat.name }

                                        })
                                    } />

                            </div>
                            <div>
                                <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-1">
                                    Color
                                </label>
                                <Select
                                    onChange={
                                        (color) => {

                                            const d = color.map(o => o.value);
                                            SetselColors(d)

                                        }
                                    }
                                    options={
                                        color.map((col, i) => {

                                            return { value: col._id, label: col.name }

                                        })
                                    }
                                    isMulti
                                    name="colors"
                                    closeMenuOnSelect={false}
                                />
                            </div>
                        </div>



                        {/* Remaining Fields */}
                        <div >
                            {/* Category */}


                            {/* Item Weight */}
                            <div>
                                <label htmlFor="item-weight" className="block text-base gap-6 mt-6 font-medium text-gray-700 mb-1">
                                    Item Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    name="item-weight"
                                    id="item-weight"
                                    placeholder="12"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div >
                                <label htmlFor="longDescription" className="block  font-medium gap-6 mt-6 text-gray-700 mb-1">
                                    long   Description
                                </label>
                                <textarea
                                    id="longDescription"
                                    name="longDescription"
                                    rows="5"
                                    placeholder="Your longDescription here"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                ></textarea>
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label htmlFor="sortDescription" className="block text-base font-medium gap-6 mt-3 text-gray-700 mb-1">
                                    short Description
                                </label>
                                <textarea
                                    id="sortDescription"
                                    name="sortDescription"
                                    rows="3"
                                    placeholder="Your sortDescription here"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                ></textarea>
                            </div>
                        </div>



                        <div>
                            <label htmlFor="thumbnail" className="block mt-3 text-base font-medium text-gray-700 mb-1">
                                Image
                            </label>
                            <input
                                type="file"
                                name="thumbnail"
                                id="thumbnail"
                                placeholder="Product thumbnail"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </section>
        </>








    );
}
