import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Select from "react-select";
import { HiHome, HiChevronRight } from "react-icons/hi";
import { MainContext } from "../../../Context";

export default function ProductEdit() {
    const { productId } = useParams();
    const { API_BASE_URL, PRODUCT_URL, CATEGORY, COLOR_URL, notify } = useContext(MainContext);

    const productName = useRef();
    const productSlug = useRef();
    const originalPrice = useRef();
    const discountPrice = useRef();
    const finalPrice = useRef();
    const shortDesc = useRef();
    const longDesc = useRef();

    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [product, setProduct] = useState(null);

    function generateSlug() {
        let slug = productName.current.value;
        slug = slug.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
        productSlug.current.value = slug;
    }

    const handlePriceCalculation = () => {
        const oPrice = parseFloat(originalPrice.current.value) || 0;
        const discount = parseFloat(discountPrice.current.value) || 0;
        const fPrice = oPrice - (discount / 100) * oPrice;
        finalPrice.current.value = fPrice.toFixed(2);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCategory || selectedColors.length === 0) {
            notify("Please select category and at least one color", 0);
            return;
        }

        try {
            const form = new FormData();
            form.append("name", productName.current.value);
            form.append("slug", productSlug.current.value);
            form.append("originalPrice", originalPrice.current.value);
            form.append("discountPercentage", discountPrice.current.value);
            form.append("finalPrice", finalPrice.current.value);
            form.append("categoryId", selectedCategory.value);
            form.append("shortDescription", shortDesc.current.value);
            form.append("longDescription", longDesc.current.value);
            if (e.target.thumbnail.files[0]) {
                form.append("thumbnail", e.target.thumbnail.files[0]);
            }
            form.append("colors", JSON.stringify(selectedColors.map(c => c.value)));

            const res = await fetch(`${API_BASE_URL}${PRODUCT_URL}/update/${productId}`, {
                method: "PUT",
                body: form
            });

            const data = await res.json();
            notify(data.msg, data.status);
        } catch (err) {
            console.error(err);
            notify("Internal Server Error", 0);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const [catRes, colorRes, productRes] = await Promise.all([
                fetch(API_BASE_URL + CATEGORY).then(res => res.json()),
                fetch(API_BASE_URL + COLOR_URL).then(res => res.json()),
                fetch(`${API_BASE_URL}${PRODUCT_URL}/${productId}`).then(res => res.json()),
            ]);

            if (catRes.status === 1) setCategories(catRes.category);
            if (colorRes.status === 1) setColors(colorRes.color);
            if (productRes.status === 1) {
                const prod = productRes.product;
                setProduct(prod);

                productName.current.value = prod.name;
                productSlug.current.value = prod.slug;
                originalPrice.current.value = prod.originalPrice;
                discountPrice.current.value = prod.discountPercentage;
                finalPrice.current.value = prod.finalPrice;
                shortDesc.current.value = prod.shortDescription;
                longDesc.current.value = prod.longDescription;

                setSelectedCategory({ value: prod.categoryId?._id, label: prod.categoryId?.name });
                setSelectedColors(prod.colors.map(c => ({ value: c._id, label: c.name })));
                setThumbnailPreview(API_BASE_URL + "/product/" + prod.thumbnail);
            } else {
                notify("Product not found", 0);
            }
        };

        fetchData();
    }, [productId]);

    return (
        <>
            <nav className="flex mt-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to="/admin" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-800">
                            <HiHome className="w-4 h-4 me-2.5" />
                            DashBoard
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <HiChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                            <Link to="/admin/product" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-800 md:ms-2">
                                Product
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <HiChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                Edit
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="max-w-4xl text-[17px] mx-auto mt-10 bg-white p-8 rounded shadow">
                <h2 className="text-3xl bg-slate-200 font-bold mb-6 text-center">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Product Name:</label>
                        <input onChange={generateSlug} ref={productName} type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Slug:</label>
                        <input ref={productSlug} readOnly type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Original Price:</label>
                            <input ref={originalPrice} onChange={handlePriceCalculation} type="number" className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Discount %:</label>
                            <input ref={discountPrice} onChange={handlePriceCalculation} type="number" className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Final Price:</label>
                            <input ref={finalPrice} readOnly type="number" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100" />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Category:</label>
                        <Select options={categories.map(c => ({ value: c._id, label: c.name }))} value={selectedCategory} onChange={setSelectedCategory} />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Colors:</label>
                        <Select isMulti options={colors.map(c => ({ value: c._id, label: c.name }))} value={selectedColors} onChange={setSelectedColors} />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Short Description:</label>
                        <textarea ref={shortDesc} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Long Description:</label>
                        <textarea ref={longDesc} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Thumbnail:</label>
                        <input type="file" name="thumbnail" onChange={handleThumbnailChange} className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-24 mt-4 rounded" />}
                    </div>
                    <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition">
                        Update Product
                    </button>
                </form>
            </div>
        </>
    );
}
