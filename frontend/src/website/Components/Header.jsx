import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaCartArrowDown } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import { emptyCart } from '../../redux/reducers/cartSlice';

const Header = () => {
    const cart = useSelector((state) => state.cart.data);
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    return (
        <>
            {/* Top Header */}
            <header className="bg-white shadow font-[700]">
                <div className="flex items-center justify-between px-6 py-3">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCdatVYOGdV35q-qxdfWCeCaY_jR7OFVaY7A&s"
                            alt="iSHOP Logo"
                            className="w-[120px] h-[50px] object-contain"
                        />
                    </div>

                    {/* Right-side Controls */}
                    <div className="flex items-center gap-6">
                        {user == null ? (
                            <Link to="/login?ref=header" className="hover:text-blue-600 transition">
                                Login
                            </Link>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span className="text-blue-600">Hi {user.name}</span>
                                <span
                                    onClick={() => {
                                        dispatch(logout());
                                        dispatch(emptyCart());
                                    }}
                                    className="cursor-pointer px-3 py-1 rounded-md hover:bg-blue-100 transition"
                                >
                                    Logout
                                </span>
                            </div>
                        )}

                        <Link
                            to="/profile"
                            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-blue-100 transition"
                        >
                            <FaUserAlt />
                            <span>My Profile</span>
                        </Link>

                        <Link
                            to="/cart"
                            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-blue-100 transition"
                        >
                            <FaCartArrowDown />
                            Items ({cart.length})
                        </Link>
                    </div>
                </div>
            </header>

            {/* BELOW HEADER SECTION */}
            <div className="mt-2">
                {/* Title */}
                <h1 className='icons py-2'>
                    iSHOP
                </h1>

                {/* Navigation */}
                <nav>
                    <ul className='flex my-4 justify-center font-[600] gap-10 text-sm text-[#5a5a5a] uppercase'>
                        <li className='hover:text-slate-800'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='hover:text-slate-800'>
                            <Link to="/store">Store</Link>
                        </li>
                        <li className='hover:text-slate-800'>
                            <Link to="/store/iphone">iPhone</Link>
                        </li>
                        <li className='hover:text-slate-800'>
                            <Link to="/store/ipad">iPad</Link>
                        </li>
                        <li className='hover:text-slate-800'>
                            <Link to="/store/macbook">MacBook</Link>
                        </li>
                        <li className='hover:text-slate-800'>
                            <Link to="/store/accessories">Accessories</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;
