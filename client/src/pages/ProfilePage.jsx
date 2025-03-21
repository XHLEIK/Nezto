import React from 'react';
import NavBar from '../component/block/NavBar';
import Footer from '../component/block/Footer';
import { Pen } from 'lucide-react';
import MenuItem from '../component/ui/cards/MenuItems';
import { CircleHelp, History, Bell, MapPin,User } from 'lucide-react'

const ProfilePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 max-w-[680px] mx-auto">
            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="flex-1 p-4 my-20 flex flex-col gap-4">
                {/* User Profile */}
                <div className="bg-teal-100 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-500 p-2 rounded-full">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-teal-700 font-bold text-xl">User Name</h2>
                            <p className="text-teal-600 text-sm">email@gmail.com</p>
                            <p className="text-teal-600 text-sm">+91 8915556785</p>
                        </div>
                        <div>
                            <button className='cursor-pointer'>
                                <Pen className="h-5 w-5 text-teal-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Options */}
                <div className="flex flex-col">
                    <MenuItem title="Address" subtitle="Share, Edit & Addresses" icon={<MapPin className="h-5 w-5" />} />
                    <MenuItem title="Notifications" subtitle="Get All the Updates Here" icon={<Bell className="h-5 w-5" />} />
                    <MenuItem title="Order History" subtitle="Check Your Past Orders" icon={<History className="h-5 w-5" />} />
                    <MenuItem title="Support & FAQs" subtitle="Get Help 24/7" icon={<CircleHelp className="h-5 w-5" />} />
                </div>

                {/* Logout Button */}
                <div className="flex justify-center mt-4">
                    <button className="px-8 py-2 bg-white cursor-pointer text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-full font-medium">
                        Log Out
                    </button>
                </div>
            </main>

            {/* Bottom Navigation */}
            <Footer />
        </div>
    );
};

export default ProfilePage;