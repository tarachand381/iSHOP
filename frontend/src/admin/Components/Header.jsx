import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
export default function Header() {

    const admin = useSelector((state) => state.admin.data);


    return (
        <div className='bg-white justify-between px-6 shadow-md mb-2 flex py-4'>
            <div>
                <div className='items-center flex gap-4'>
                    <h1 className='font-bold text-[23px] ' >Welcome  {admin?.name}</h1>
                    <img className='w-[25px] ' src="https://media.tenor.com/Yj4grvIBitkAAAAM/jake-is.gif" alt="" />
                </div>
                <p className='text-gray-700'>Here's what's happening with your store today.</p>
            </div>
            <div className=' flex gap-2'>
                <img className='w-[50px] h-[50px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_g_7YVzERozXI_mfnbSPkggiXqlljwtCQXw&s" alt="" />
                <div className='text-[#5b6e94]'>
                    <h3 className='font-bold'>{admin?.name}</h3>
                    <div className=' font-extralight mt-[-3px]'>Admin</div>
                </div>
                <IoSettingsOutline className='text-xl animate-spin duration-1000' />

            </div>

        </div>
    )
}
