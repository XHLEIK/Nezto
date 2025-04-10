import React from 'react';
import { NavBar, Footer } from "../component/init"
import ServiceCard from '../component/ui/cards/ServiceCard';
import {Shirt, Anvil, WashingMachine, Footprints} from 'lucide-react';
import { CarpetCleaning } from '../assets/icons';

const ServicesPage = () => {
    const services = [
        {
            id: 1,
            name: 'Dry Cleaning',
            description: 'Quick and professional cleaning',
            price: '₹69',
            icon: ( <Shirt className='text-white'/> ),
        },
        {
            id: 2,
            name: 'Laundry Wash',
            description: 'Quick and professional cleaning',
            price: '₹99',
            icon: (<WashingMachine className='text-white'/>),
        },
        {
            id: 3,
            name: 'Ironing Service',
            description: 'Quick and professional cleaning',
            price: '₹84',
            icon: (<Anvil className='text-white'/>),
        },
        {
            id: 5,
            name: 'Carpet Cleaning',
            description: 'Quick and professional cleaning',
            price: '₹100',
            icon: (<CarpetCleaning/>),
        },
        {
            id: 6,
            name: 'Stain Removal',
            description: 'Quick and professional cleaning',
            price: '₹110',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 mx-auto max-w-[680px]">
            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="flex-1 px-2 flex flex-col gap-6 py-20">
                {/* Service Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {services.map((service) => (
                        <ServiceCard key={service.id} icon={service.icon} cardTitle={service.name} cardDescription={service.description} cardPrice={service.price} />
                    ))}
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
            <Footer/>
        </div>
    );
};

export default ServicesPage;