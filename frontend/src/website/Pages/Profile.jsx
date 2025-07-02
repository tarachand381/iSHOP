import React, { useState } from "react";
import {
    FaUser, FaHome, FaSignOutAlt, FaIdCard, FaCog,
    FaLock, FaEnvelope, FaBox, FaHeart
} from "react-icons/fa";

export default function WsCubeProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Tarachand Kumawat",
        phone: "9782468792",
        email: "ktarachand381@gmail.com",
        state: "Jaipur, Rajasthan",
        city: "Jobner",

        profilePic: "tara.jpg",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 h-screen bg-[#232c3d] shadow-md p-6 hidden md:block">
                <div className="flex  flex-col items-center gap-3">
                    <img className="h-[100px]  rounded-full w-[100px]" src="data:image/jpeg;base64,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" alt="logo" />

                    <h2 className="text-xl font-bold text-white text-center">Tarachand Kumawat</h2>
                </div>
                <nav className="mt-10  space-y-4">
                    {[{ icon: FaHome, label: "Dashboard" },
                    { icon: FaUser, label: "My Profile" },
                    { icon: FaIdCard, label: "My Documents" },
                    { icon: FaCog, label: "Settings" },
                    { icon: FaLock, label: "Privacy" },
                    { icon: FaEnvelope, label: "Messages" },
                    { icon: FaBox, label: "My Orders" },
                    { icon: FaHeart, label: "Wishlist" }].map((item, i) => (
                        <a href="#" key={i} className="flex items-center text-[#939caa] hover:text-white">
                            <item.icon className="mr-3" /> {item.label}
                        </a>
                    ))}
                    <a href="#" className="flex items-center text-red-500 hover:text-red-700 mt-10">
                        <FaSignOutAlt className="mr-3" /> Logout
                    </a>
                </nav>
            </aside>

            <div className="flex-1 flex  flex-col">
                {/* Topbar */}
                <header className="w-full bg-slate-300 shadow-sm flex items-center justify-between px-6 py-3">
                    <div className="flex items-center  gap-4">

                        <h2 className="text-lg font-semibold text-gray-700">Profile</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src="	https://online.wscubetech.com/images/support.svg" alt="support" className="w-11  h-11" />
                        <span className="relative">
                            <img className="w-12 rounded-full h-12" src="data:image/png;base64,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" alt="" />

                            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                        </span>
                        <div className="flex items-center gap-2">
                            <img src="tara.jpg" className="w-11 h-11 rounded-full border" />
                            <span className="text-md font-medium">Hi Tarachand kumawat</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="border border-blue-500 text-blue-600 font-bold px-4 py-1 rounded hover:bg-blue-100"
                        >
                            ✏️ {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>
                    <div className="bg-gray-100 p-6 rounded h-[350px]  shadow-md">
                        <div className="flex gap-8 items-start">
                            <div className="flex flex-col items-center gap-4">
                                <img src={formData.profilePic} alt="Profile" className="w-32 h-32 object-cover rounded-md shadow-md" />
                                {isEditing && (
                                    <>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="uploadProfilePic" />
                                        <label htmlFor="uploadProfilePic" className="border cursor-pointer border-blue-500 text-blue-500 px-3 py-1 rounded">
                                            Upload New Picture
                                        </label>
                                    </>
                                )}
                            </div>
                            {!isEditing ? (
                                <div className="w-full text-gray-700 space-y-4">
                                    <h3 className="text-2xl font-bold mb-2">{formData.name}</h3>
                                    <div className="grid md:grid-cols-2  gap-10">
                                        <div className="space-y-3">
                                            <div><p className="text-gray-500 py-1 text-sm">📱 Phone:</p><div className="text-blue-600">+91 {formData.phone} ✅</div></div>
                                            <div><p className="text-gray-500 py-1 text-sm">✉ Email:</p><div>{formData.email}</div></div>
                                            <div><p className="text-gray-500 py-1 text-sm">🏠 Address:</p><div>{formData.city}, {formData.state}, India</div></div>
                                        </div>
                                        <div className="space-y-3">
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form className="grid md:grid-cols-2 gap-6 w-full " onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-3 ">
                                        <div><label className="block text-sm font-medium text-gray-700">👤 Name</label><input name="name" value={formData.name} onChange={handleChange} className="w-full border px-4 py-2 rounded" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">📞 Mobile number</label><input name="phone" value={formData.phone} onChange={handleChange} className="w-full border px-4 py-2 rounded" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">📍 State</label><select name="state" value={formData.state} onChange={handleChange} className="w-full border px-4 py-2 rounded"><option>Rajasthan</option><option>Delhi</option><option>Maharashtra</option></select></div>
                                        <div><label className="block text-sm font-medium text-gray-700">🎓 Education</label><select name="education" value={formData.education} onChange={handleChange} className="w-full border px-4 py-2 rounded"><option>BCA</option><option>MSC</option><option>BSC</option></select></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div><label className="block text-sm font-medium text-gray-700">🎂 Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border px-4 py-2 rounded" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">📧 Email</label><input name="email" value={formData.email} onChange={handleChange} className="w-full border px-4 py-2 rounded" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">🏠 City</label><input name="city" value={formData.city} onChange={handleChange} className="w-full border px-4 py-2 rounded" /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">🆔 Enrolment Number</label><input value="WS/18496" readOnly className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-600" /></div>
                                    </div>
                                    <div className="col-span-2">
                                        <button type="submit" onClick={() => setIsEditing(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                                            Update Profile
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
