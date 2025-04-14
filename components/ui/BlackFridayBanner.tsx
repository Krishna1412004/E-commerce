"use client"

import { useState } from 'react'

const BlackFridayBanner = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText('BF2023');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full bg-gradient-to-r from-red-600 via-red-500 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/sparkles.png')] opacity-20 animate-pulse mix-blend-overlay"></div>
            <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Black Friday Sale! 🎉
                        </h2>
                        <p className="text-2xl md:text-3xl text-white/90">
                            Exclusive Deals Up To <span className="font-bold text-yellow-300">20% OFF</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-4 md:ml-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <p className="text-xl text-white">
                                Use Code: <span className="font-bold text-yellow-300">BF2023</span>
                            </p>
                            <p className="text-sm text-white/75 mt-1">Limited Time Offer!</p>
                        </div>
                        <button 
                            onClick={handleCopyCode}
                            className="group relative inline-flex items-center justify-center bg-white hover:bg-yellow-300 text-black px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <span className="mr-2">{copied ? 'Copied!' : 'BF2023'}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlackFridayBanner;