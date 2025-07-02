import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";

const links = [
    { title: 'Infomation', items: ['1on1 Coaching', 'Company Review', 'Accounts Review', 'HR Consulting', 'SEO Optimisation'] },
    { title: 'Service', items: ['About', 'Meet the Team', 'Accounts Review'] },
    { title: 'Extras', items: ['Contact', 'FAQs', 'Live Chat'] },
    { title: 'My Account', items: ['Accessibility', 'Returns Policy', 'Refund Policy', 'Hiring Statistics'] },
    { title: 'Userful Links', items: ['Accessibility', 'Returns Policy', 'Refund Policy', 'Hiring Statistics'] },
    { title: 'Our Offers', items: ['Accessibility', 'Returns Policy', 'Refund Policy', 'Hiring Statistics'] }
];

const socialLinks = [
    { icon: <FaFacebook className="text-[#4267B2]" />, label: 'Facebook', href: '#' },
    { icon: <FaInstagram className="text-[#E4405F]" />, label: 'Instagram', href: '#' },
    { icon: <FaTwitter className="text-[#1DA1F2]" />, label: 'Twitter', href: '#' },
    { icon: <FaGithub className="text-black" />, label: 'GitHub', href: '#' },
    { icon: <FaDribbble className="text-[#EA4C89]" />, label: 'Dribbble', href: '#' },
];

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 text-center mt-8 shadow-md border-t">
            <div className="max-w-full mx-auto px-4 mt-10 py-2">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="flex flex-col h-full">
                        <h1 className="text-[#6c7074] text-3xl font-bold mb-2">ishop</h1>
                        <p className="text-sm">
                            E-commerce, or electronic commerce, refers to the buying and selling of goods and services, or the transmission E-commerce,  electronic commerce, refers to the buying and selling of goods and services, or  of funds or data, over an electronic network, primarily the internet.
                        </p>
                    </div>
                    <div className="flex flex-col h-full">
                        <h1 className="text-[#63676b] text-2xl font-bold mb-2">Follow us</h1>
                        <p className="text-sm flex-grow">
                            E-commerce typically refers to placeholder text used for testing or design purposes.
                        </p>
                        <div className="flex space-x-4 mt-3 justify-center">
                            {socialLinks.map((link, idx) => (
                                <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="text-2xl">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col h-full">
                        <h1 className="text-[#55595e] text-2xl font-bold mb-2">Contact us</h1>
                        <ul className="text-sm space-y-1">
                            <li>iShop: Gokulpura Jobner (jaipur , rajasthan)</li>
                            <li>Call us now: (+91) 9782468792 </li>
                            <li>Email: ktarachand381@gmail.com</li>
                        </ul>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                    {links.map((section, idx) => (
                        <div key={idx}>
                            <p className="font-semibold text-gray-900 text-sm mb-1">{section.title}</p>
                            <ul className="space-y-[2px] text-sm">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-gray-700 hover:opacity-75">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300 py-4 px-4 flex flex-col md:flex-row justify-between items-center text-center text-sm text-gray-500">
                <ul className="flex gap-4 mb-2 md:mb-0">
                    {socialLinks.map((link, idx) => (
                        <li key={idx}>
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" aria-label={link.label}>
                                {link.icon}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col md:flex-row items-center gap-2">

                    <ul className="flex gap-3">
                        <li><a href="#" className="hover:opacity-75">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:opacity-75">Privacy Policy</a></li>
                        <li><a href="#" className="hover:opacity-75">Cookies</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
