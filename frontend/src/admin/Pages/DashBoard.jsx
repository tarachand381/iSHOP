import React from "react";
import {
    FaChartBar,
    FaCube,
    FaClipboardList,
    FaHome,
    FaEnvelope,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";

export default function SalesDashboard() {
    return (
        <div className="min-h-screen bg-[#f5f7fb]  flex flex-col mt-6 font-sans">

            {/* Top Bar */}
            <main className="flex-1 p-6">
                <div className="flex justify-between  items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search anything here..."
                        className="px-4 py-2 rounded-sm border border-gray-300 w-full"
                    />



                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 rounded-sm  gap-4 mt-6 ">
                    {[
                        { label: "Total Sales", value: "$32,499.93" },
                        { label: "Total Order", value: "32,499" },
                        { label: "Visitors", value: "32,499" },
                        { label: "Refunded", value: "2,499" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-4 border border-gray-300 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <h2 className="text-xl font-semibold">{stat.value}</h2>
                            <span className="text-green-500 text-xs">
                                +15% Compared to last month
                            </span>
                        </div>
                    ))}
                </div>

                <TopSection />
                <MiddleSection />
                <BottomSection />
            </main>
        </div>
    );
}

function TopSection() {
    return (
        <div className="mt-6 text-white">
            <img
                src="https://cdn.pixabay.com/photo/2016/05/27/08/51/mobile-phone-1419275_1280.jpg"
                alt="Dashboard Banner"
                className="min-w-full h-[390px] object-cover rounded-b-md shadow"
            />
        </div>
    );
}

function MiddleSection() {
    return (
        <div className="bg-[#eae9f0] mt-3 text-white flex flex-col">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-5 px-6">
                {[
                    { title: "Sum of Amount", value: "₹438K", color: "bg-gray-700" },
                    { title: "Sum of Profit", value: "₹37K", color: "bg-gray-700" },
                    { title: "Quantity Sold", value: "5615", color: "bg-gray-700" },
                    { title: "Avg Orders", value: "121", color: "bg-gray-700" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className={`bg-gradient-to-br ${item.color} p-5 rounded shadow text-center`}
                    >
                        <h2 className="text-2xl font-bold">{item.value}</h2>
                        <p className="text-sm mt-1">{item.title}</p>
                    </div>
                ))}
            </div>

            {/* Data Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 mt-5">
                <DataCard
                    title="Top 6 Amounts by State"
                    items={[
                        "Maharashtra: ₹0.1M",
                        "MP: ₹0.08M",
                        "UP: ₹0.04M",
                        "Delhi: ₹0.02M",
                        "Rajasthan: ₹0.018M",
                        "Gujarat: ₹0.017M",
                    ]}
                />
                <DataCard
                    title="Quantity by Category"
                    items={[
                        "Technology: 62.6%",
                        "Home Decor: 20.5%",
                        "Accessories: 16.9%",
                    ]}
                />
                <DataCard
                    title="Profit By Month"
                    items={[
                        "Jan - ₹5K",
                        "Feb - ₹6K",
                        "Jul - ₹7K",
                        "Aug - ₹2K",
                        "Dec - ₹-1K",
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 mt-5 mb-9">
                <DataCard
                    title="Top 5 Profits by Sub-Category"
                    items={[
                        "Printers: ₹9.8K",
                        "Bookcases: ₹7.2K",
                        "Sarees: ₹4.1K",
                        "Accessories: ₹3.8K",
                        "Tables: ₹3.4K",
                    ]}
                />
                <DataCard
                    title="Payment Mode Split"
                    items={[
                        "UPI - 43.7%",
                        "Cash - 20.6%",
                        "Card - 13.2%",
                        "Net Banking - 11.9%",
                    ]}
                />
                <DataCard
                    title="Top 4 Customers"
                    items={[
                        "Harivansh - ₹10K",
                        "Madhav - ₹9.5K",
                        "Madan Mohan - ₹7.3K",
                        "Shiva - ₹6.4K",
                    ]}
                />
            </div>
        </div>
    );
}

function DataCard({ title, items }) {
    return (
        <div className="bg-[#cacacc] text-gray-900 p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">{title}</h3>
            <ul className="space-y-1 text-sm">
                {items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

function BottomSection() {
    return (
        <footer className="bg-[#afafb1] mt-3 rounded-sm w-full h-[300px] ">
            <div className="grid grid-cols-1  md:grid-cols-4 gap-10 px-6 py-16 place-items-center text-center">
                <div>
                    <h4 className="font-bold text-[22px] mb-2">About</h4>
                    <ul className="text-sm space-y-1">
                        <li>Company Info</li>
                        <li>Careers</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Use</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-[22px] mb-2">Services</h4>
                    <ul className="text-sm space-y-1">
                        <li>Dashboard Analytics</li>
                        <li>Reports</li>
                        <li>Integrations</li>
                        <li>Support</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-[22px]  mb-2">Contact</h4>
                    <ul className="text-sm space-y-1">
                        <li><FaPhone className="inline mr-2" /> +91-9876543210</li>
                        <li><FaEnvelope className="inline mr-2" /> help@ishop.com</li>
                        <li><FaMapMarkerAlt className="inline mr-2" /> Jaipur, India</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-[22px] mb-2">Follow Us</h4>
                    <div className="flex justify-center space-x-4 text-xl mt-2">
                        <FaFacebook className="hover:text-white cursor-pointer" />
                        <FaTwitter className="hover:text-white cursor-pointer" />
                        <FaInstagram className="hover:text-white cursor-pointer" />
                        <FaLinkedin className="hover:text-white cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>


    );


}
