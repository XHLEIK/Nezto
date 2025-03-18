import React from 'react';
import { NavBar, Footer } from "../component/init"
import ServiceCard from '../component/ui/cards/ServiceCard';



const ServicesPage = () => {
    const services = [
        {
            id: 1,
            name: 'Dry Cleaning',
            description: 'Quick and professional cleaning',
            price: '₹200',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
        },
        {
            id: 2,
            name: 'Laundry Wash',
            description: 'Quick and professional cleaning',
            price: '₹200',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            ),
        },
        {
            id: 3,
            name: 'Ironing Service',
            description: 'Quick and professional cleaning',
            price: '₹200',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                </svg>
            ),
        },
        {
            id: 4,
            name: 'Shoe Cleaning',
            description: 'Quick and professional cleaning',
            price: '₹200',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            id: 5,
            name: 'Carpet Cleaning',
            description: 'Quick and professional cleaning',
            price: '₹200',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            id: 6,
            name: 'Stain Removal',
            description: 'Quick and professional cleaning',
            price: '₹200',
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