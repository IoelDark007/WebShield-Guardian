import React, { useEffect, useState } from 'react';

const CautionPage: React.FC = () => {
    const [countdown, setCountdown] = useState(10);
    const targetURL = new URLSearchParams(window.location.search).get('url');

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (targetURL) window.location.href = targetURL;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetURL]);

    const handleProceed = () => {
        if (targetURL) window.location.href = targetURL;
    };

    const handleGoBack = () => {
        chrome.tabs.update({ url: 'https://google.com' });
    };

    return (
        <div className="fixed inset-0 bg-amber-500 overflow-hidden flex flex-col items-center justify-center p-6">
            {/* Caution symbol with subtle pulse */}
            <div className="mb-8 animate-[pulse_2s_ease-in-out_infinite]">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-24 w-24 text-black" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                </svg>
            </div>

            {/* Main content box */}
            <div className="w-full max-w-2xl bg-yellow-500 rounded-lg p-8 shadow-sm border border-yellow-200">
                <h1 className="text-3xl font-bold mb-6 text-center text-black">
                    Suspicious Website Detected
                </h1>
                
                <div className="space-y-4 text-lg mb-8 text-gray-800">
                    <div className="flex items-start">
                        <span className="text-yellow-600 mr-3 mt-0.5">•</span>
                        <div>
                            <h3 className="font-semibold text-black">Potential Security Risk</h3>
                            <p>This site may contain security risks or deceptive content.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-yellow-600 mr-3 mt-0.5">•</span>
                        <div>
                            <h3 className="font-semibold text-black">Exercise Caution</h3>
                            <p>Proceeding could expose you to phishing or malware.</p>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <button 
                        onClick={handleGoBack}
                        className="w-full py-3 bg-black hover:bg-gray-50 text-yellow-500 hover:text-yellow-400 font-medium rounded-md transition-all 
                                border border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Go to Safe Site
                    </button>
                    <button 
                        onClick={handleProceed}
                        className="w-full py-3 bg-black hover:bg-gray-50 text-yellow-500 hover:text-yellow-400 font-medium rounded-md transition-all 
                                flex items-center justify-center gap-2 relative"
                    >
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                            {countdown}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                        Proceed Anyway
                    </button>
                </div>
            </div>

            {/* Minimal footer */}
            <footer className="mt-4 text-center text-sm text-gray-800">
                <div className="flex flex-col md:flex-row justify-center items-center gap-1">
                    <span>James Nii Kotei-Sass & Ioel Nii Amu Darkoh</span>
                    <span className="hidden md:block">•</span>
                    <span>© {new Date().getFullYear()}</span>
                </div>
            </footer>
        </div>
    );
};

export default CautionPage;