import React from 'react';
import NavBar from '../component/block/NavBar';
import Footer from '../component/block/Footer';
import {Shirt, Anvil, WashingMachine} from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex max-w-[680px] mx-auto overflow-none flex-col min-h-screen bg-gray-100 w-full">
            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="flex-1 py-20 p-2 flex flex-col gap-6">
                {/* Service Categories */}
                <div className="morfit rounded-lg p-4 flex justify-between">
                    <div className="flex flex-col items-center">
                        <div className="bg-primary bg-opacity-30 p-2 rounded-lg mb-2">
                            <Shirt className='text-white'/>
                        </div>
                        <span className="font-bold text-sm">Dry Clean</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-primary bg-opacity-30 p-2 rounded-lg mb-2">
                            <WashingMachine className='text-white'/>
                        </div>
                        <span className="font-bold  text-sm">Laundry</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-primary bg-opacity-30 p-2 rounded-lg mb-2">
                            <Anvil className="text-white"/>
                        </div>
                        <span className="font-bold  text-sm">Iron</span>
                    </div>
                </div>

                {/* Brand Marketing Slider */}
                <div className="bg-teal-100 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                    <h3 className="text-primary font-medium text-xl mb-4">Brand Marketing</h3>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>

                {/* Top Features */}
                <div>
                    <div className="bg-teal-100 rounded-lg p-2 w-40 text-center mx-auto mb-3">
                        <h2 className="text-teal-600 font-bold text-lg">Top Features</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <div className="bg-primary rounded-lg p-3 flex flex-col items-center justify-center">
                            <h3 className="text-white font-bold text-xl">Quality</h3>
                            <p className="text-white text-sm">Cleaning</p>
                        </div>

                        <div className="bg-primary rounded-lg p-3 flex flex-col items-center justify-center">
                            <h3 className="text-white font-bold text-xl">24-36Hrs</h3>
                            <p className="text-white text-sm">Delivery</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-primary rounded-lg p-3 flex flex-col items-center justify-center">
                            <h3 className="text-white font-bold text-xl">Flexible</h3>
                            <p className="text-white text-sm">Timing</p>
                        </div>
                    </div>
                </div>

                {/* One More Slider */}
                <div className="bg-teal-100 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                    <h3 className="text-primary font-medium text-xl mb-4">One More Slider</h3>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <Footer />
        </div>
    );
};

export default HomePage;