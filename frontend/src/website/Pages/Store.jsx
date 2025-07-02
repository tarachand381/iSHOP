import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from "../../Context";
import ProductCard from '../Components/ProductCard';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import TopSelling from '../Components/TopSelling';

export default function Store() {
    const { category, categoryHandler, color, colorHandler, getProduct, product } = useContext(MainContext);
    const [limit, Setlimit] = useState(0);
    const [productColor, SetproductColor] = useState(null);
    const [searchParams, SetsearchParams] = useSearchParams();
    const { categorySlug } = useParams();

    useEffect(() => {
        categoryHandler();
        colorHandler();

        const limitParam = searchParams.get("limit");
        const colorParam = searchParams.get("productColor");

        if (limitParam) Setlimit(Number(limitParam));
        if (colorParam) SetproductColor(colorParam);
    }, []);

    useEffect(() => {
        const query = {};
        if (limit > 0) query["limit"] = limit;
        if (productColor) query["productColor"] = productColor;

        getProduct(null, limit, categorySlug, productColor);
        SetsearchParams(query);
    }, [limit, categorySlug, productColor]);

    return (
        <div className='max-w-full'>
            <div className='w-full text-center my-10 text-[#33A0FF] font-bold bg-[#F6F7F8] py-2'>
                Store / {categorySlug || "All"}
            </div>

            <div className='grid px-2 gap-10 grid-cols-5'>
                {/* Left: Filters */}
                <div>
                    {/* Category Filter */}
                    <div className='w-full'>
                        <ul className='px-2 rounded-md p-4 bg-[#F6F7F8]'>
                            <h1 className='font-bold mb-5 uppercase text-2xl'>Category</h1>
                            <Link to={`/store`}>
                                <li className='mb-2 hover:text-blue-600 cursor-pointer relative'>All</li>
                            </Link>
                            {Array.isArray(category) && category.map((cat, i) => (
                                <Link to={`/store/${cat.slug}`} key={i}>
                                    <li className='mb-2 hover:text-blue-600 cursor-pointer relative'>
                                        {cat.name}
                                        <span className='absolute right-0'>({cat.productCount})</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    {/* Color Filter */}
                    <div className='w-full mt-10'>
                        <div className='bg-[#F6F7F8] px-2 p-4 rounded-md'>
                            <h1 className='font-bold mb-5 uppercase text-2xl'>Colors</h1>
                            <ul className='flex gap-3 flex-wrap'>
                                {Array.isArray(color) && color.map((col, i) => (
                                    <li
                                        onClick={() => SetproductColor(col._id)}
                                        style={{ background: col.colorCode }}
                                        key={i}
                                        className={`w-[20px] h-[20px] rounded-full cursor-pointer border ${productColor === col._id ? 'border-black' : ''}`}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right: Products */}
                <div className='grid grid-cols-3 gap-4 col-span-4'>
                    <TopSelling />
                    <div className="w-full col-span-3 bg-[#F6F7F8] p-4">
                        <select
                            value={limit}
                            onChange={(e) => Setlimit(Number(e.target.value))}
                            className='bg-transparent border-white border-2 p-2'
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    {Array.isArray(product) && product.length > 0 &&
                        product.map((prod, i) => (
                            <ProductCard key={i} product={prod} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
