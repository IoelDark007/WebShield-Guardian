import { useEffect } from 'react';

const WarningPage = () => {
    useEffect(() => {
        const handleGoBack = () => {
            chrome.tabs.update({ url: 'https://google.com' }); // More reliable than goBack
        };

        const handleLearnMore = () => {
            chrome.tabs.create({ url: chrome.runtime.getURL('education.html') });
        };

        document.getElementById('goBack')?.addEventListener('click', handleGoBack);
        document.getElementById('learn')?.addEventListener('click', handleLearnMore);

        return () => {
            document.getElementById('goBack')?.removeEventListener('click', handleGoBack);
            document.getElementById('learn')?.removeEventListener('click', handleLearnMore);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-red-800 to-red-900 text-white overflow-auto">
            {/* Full-screen warning center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {/* Animated danger symbol */}
                <div className="relative mb-2 animate-bounce">
                    <div className="absolute inset-0 rounded-full bg-red-600 opacity-20 animate-ping"></div>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-32 w-32 text-yellow-400 drop-shadow-lg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                    </svg>
                </div>

                {/* Threat details box */}
                <div className="w-full max-w-3xl bg-black/40 backdrop-blur-md border-4 border-red-600 rounded-2xl p-6 shadow-[0_0_30px_10px_rgba(220,38,38,0.3)]">
                    <h1 className="text-lg md:text-5xl font-extrabold mb-3 text-center tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
                            MALICIOUS WEBSITE BLOCKED
                        </span>
                    </h1>
                    
                    <div className="space-y-5 text-xl mb-4">
                        <div className="flex items-start">
                            <span className="text-yellow-400 mr-3 mt-1">⚠</span>
                            <div>
                                <h3 className="font-bold text-white">Phishing Attempt Detected</h3>
                                <p className="text-red-100">This site mimics legitimate websites to steal credentials</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <span className="text-yellow-400 mr-3 mt-1">🔒</span>
                            <div>
                                <h3 className="font-bold text-white">Your Security is at Risk</h3>
                                <p className="text-red-100">Proceeding may compromise passwords, credit cards, or personal data</p>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                        <button 
                            id="learn" 
                            className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all 
                                    transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            Learn About Phishing
                        </button>
                        <button 
                            id="goBack" 
                            className="w-full py-4 bg-white hover:bg-gray-100 text-red-900 font-bold rounded-xl transition-all 
                                    transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Go to Safe Site
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-width footer */}
            <footer className="absolute bottom-0 left-0 right-0 py-2 bg-black/50 text-center text-sm text-gray-300 border-t border-red-900/50">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <strong>WebShield</strong> Protection Active
                    </span>
                    <span className="hidden md:block">•</span>
                    <span>© {new Date().getFullYear()} James Nii Kotei-Sass & Ioel Nii Amu Darkoh</span>
                </div>
            </footer>
        </div>
    );
};

export default WarningPage;