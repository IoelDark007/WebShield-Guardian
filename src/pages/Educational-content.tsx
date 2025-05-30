import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";

const EduPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const chatSections = [
    {
      title: "How Does Phishing Work?",
      content: (
        <>
          <p>Phishers use social engineering techniques to create messages that seem urgent or legitimate. Here's a quick breakdown of the process:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Disguise:</strong> Scammers craft emails or websites that mimic those of trusted companies, often using familiar logos, language, and even email addresses that look similar to the real ones.</li>
            <li><strong>Urgency:</strong> They create a sense of urgency by claiming there's a problem with your account or a limited-time offer, pushing you to act quickly.</li>
            <li><strong>Request for Information:</strong> The message will prompt you to click on a link or download an attachment, leading to a fake login page or malware installation, which then harvests your personal data.</li>
          </ul>
        </>
      )
    },
    {
      title: "Common Phishing Tactics",
      content: (
        <>
          <p>Understanding the tactics used by phishers can help you spot potential threats:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Email Spoofing:</strong> Fake emails that appear to come from reputable sources.</li>
            <li><strong>Clone Phishing:</strong> Duplicated legitimate messages with malicious links.</li>
            <li><strong>Spear Phishing:</strong> Highly targeted attacks aimed at specific individuals or organizations.</li>
            <li><strong>Smishing and Vishing:</strong> Phishing attempts via SMS (text messages) or voice calls.</li>
          </ul>
        </>
      )
    },
    {
      title: "Protecting Yourself Against Phishing",
      content: (
        <>
          <p>Here are some simple, practical tips to help you stay safe:</p>
          <ol className="list-decimal pl-5 space-y-2 mt-3">
            <li><strong>Verify the Source:</strong> Always check the sender's email address or phone number carefully. Look out for slight misspellings or unusual domain names.</li>
            <li><strong>Be Wary of Urgency:</strong> If an email or message pressures you to act quickly, pause and take a closer look. Legitimate companies rarely demand immediate action.</li>
            <li><strong>Hover Over Links:</strong> Before clicking, hover over any links to see the real URL. If it looks suspicious or doesn't match the supposed sender's website, don't click.</li>
            <li><strong>Keep Software Updated:</strong> Regularly update your browser, antivirus, and other security software to protect against the latest threats.</li>
            <li><strong>Educate Yourself:</strong> Stay informed about the latest phishing scams by following trusted security news sources and training programs.</li>
          </ol>
        </>
      )
    },
    {
      title: "What To Do If You Suspect Phishing",
      content: (
        <>
          <p>If you ever suspect that an email or website is a phishing attempt:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Do Not Click or Download:</strong> Avoid interacting with any links or attachments.</li>
            <li><strong>Report It:</strong> Use the reporting feature in your browser extension or contact your IT/security team.</li>
            <li><strong>Verify Independently:</strong> If the message claims to be from a familiar company, visit their official website directly (without clicking the link) or call their customer service number to confirm its legitimacy.</li>
          </ul>
        </>
      )
    },
    {
      title: "Why User Education Matters",
      content: (
        <p>Phishing scams continue to evolve, and attackers often exploit our natural tendency to trust. By understanding how phishing works and recognizing the warning signs, you empower yourself and contribute to a safer online community. Remember, your vigilance is the first line of defense against cyber threats.</p>
      )
    },
    {
      title: "Exclusive Content for Subscribers",
      content: (
        <>
          <p>As a subscriber, you'll receive:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Regular Updates:</strong> Stay informed with the latest phishing trends and security tips.</li>
            <li><strong>Deep-Dive Articles:</strong> Learn about advanced tactics and how to safeguard your digital life.</li>
            <li><strong>Interactive Training Modules:</strong> Engage with quizzes and real-life scenarios to test your knowledge.</li>
            <li><strong>Expert Webinars:</strong> Join live sessions with cybersecurity professionals for in-depth discussions and Q&A.</li>
          </ul>
        </>
      )
    }
  ];

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      
      if (delta > 0 && currentIndex < chatSections.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (delta < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (deltaY > 50 && currentIndex < chatSections.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (deltaY < -50 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < chatSections.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleScroll, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, chatSections.length]); // Only these dependencies are needed now

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-800 to-blue-900 text-white p-0 m-0 overflow-x-hidden">
      {/* First Section */}
      <div className="relative flex w-full h-[700px] rounded-2xl justify-center mb-4">
        <div className="relative flex flex-col bg-gradient-to-r from-blue-500 to-black max-w-3xl p-6 rounded-2xl rounded-r-none rounded-bl-none justify-center items-center w-full">
          <h1 className="text-sm font-semibold p-4">Understanding Phishing: Stay Safe Online</h1>
          <p className="text-lg font-normal p-4">
            Phishing is a type of cyberattack where scammers try to trick you into revealing 
            sensitive information—like passwords, credit card numbers, or personal details—by 
            pretending to be a trusted entity. These attacks can come in many forms, such as 
            deceptive emails, misleading websites, or even text messages. The goal? To lure you 
            into a trap that could compromise your privacy and security.
          </p>
        </div>
        <img src="/images/phisher.jpg" alt="Phishing Example" className="rounded-2xl rounded-l-none rounded-br-none w-full" />
      </div>

      {/* Second Section (chat scroller) */}
      <div className="relative flex w-full rounded-2xl justify-center mb-8">
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-blue-200 text-gray-800 p-6 w-full">
          <div 
            ref={scrollContainerRef}
            className="w-full max-w-3xl overflow-x-hidden relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative bg-blue-50 rounded-xl p-4 shadow-md mb-6 w-full max-w-full box-border flex flex-col before:content-[''] before:absolute before:right-18 before:w-0 before:h-0 before:border-t-[18px] before:border-t-blue-50 before:border-r-[18px] before:border-r-transparent before:border-b-0 before:border-l-0"
                style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
              >
                <h1 className="text-2xl font-bold text-blue-700 mb-4">{chatSections[currentIndex].title}</h1>
                <div className="text-gray-800 space-y-3">
                  {chatSections[currentIndex].content}
                </div>
                <div className="text-center text-gray-500 italic mt-6">
                  {currentIndex < chatSections.length - 1 ? 'Scroll down to continue' : 'End of content'}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <img src="/images/info.jpg" alt="How does Phishing work?" className="w-[500px] h-[500px]" />
      </div>

      {/* Quiz Section */}
      <div className="relative flex w-full rounded-2xl justify-center mb-8">
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-blue-200 text-gray-800 p-6 w-full">
          <div className="w-full max-w-3xl flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Wanna test your knowledge in cyber security? Only takes 5 mins!
            </h2>
            <a
              href="/game.html"
              className="mt-4 bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 px-8 rounded-full shadow transition"
            >
              Take Quiz
            </a>
          </div>
        </div>
        <img src="/images/subscribe.jpg" alt="Cybersecurity Quiz" className="w-[500px] h-[500px] rounded-2xl rounded-l-none rounded-br-none" />
      </div>

      {/* Subscription Section */}
      <section className="w-full flex justify-center py-12 bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
            Exclusive Subscriber Content: Stay One Step Ahead of Cyber Threats
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Benefits */}
            <div className="flex-1 bg-blue-50 rounded-xl p-6 shadow-md flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Why Subscribe?</h3>
              <p className="text-gray-700">
                Phishing attacks are constantly evolving. Our premium subscription gives you access to in-depth, actionable insights to stay ahead of threats.
              </p>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">With a subscription, you'll unlock:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-800">
                  <li>✅ Advanced Phishing Prevention Guides</li>
                  <li>✅ Real-Life Attack Case Studies</li>
                  <li>✅ Interactive Cybersecurity Quizzes</li>
                  <li>✅ Early Warning Alerts on New Scams</li>
                  <li>✅ Expert Webinars &amp; Live Q&amp;A Sessions</li>
                </ul>
              </div>
            </div>
            {/* Plans */}
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Become a VIP Subscriber</h3>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Basic */}
                <div className="flex-1 bg-gray-50 rounded-lg p-4 shadow border border-gray-200">
                  <h4 className="font-bold text-blue-600 mb-2">Basic Plan - Free</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>✔️ General phishing awareness articles</li>
                    <li>✔️ Community discussions</li>
                  </ul>
                </div>
                {/* Premium */}
                <div className="flex-1 bg-blue-100 rounded-lg p-4 shadow border border-blue-200">
                  <h4 className="font-bold text-blue-700 mb-2">Premium Plan - $5/month</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>✔️ Deep-dive cybersecurity articles</li>
                    <li>✔️ Early warning alerts</li>
                    <li>✔️ Phishing simulation quizzes</li>
                  </ul>
                </div>
                {/* Pro */}
                <div className="flex-1 bg-blue-200 rounded-lg p-4 shadow border border-blue-300">
                  <h4 className="font-bold text-blue-800 mb-2">Pro Plan - $10/month</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>✔️ Everything in Premium</li>
                    <li>✔️ Live expert webinars</li>
                    <li>✔️ Real-life scam case studies</li>
                    <li>✔️ Monthly training modules</li>
                  </ul>
                </div>
              </div>
              <button className="mt-4 w-full md:w-auto self-center bg-white hover:bg-blue-800 text-blue-500 hover:text-white font-semibold py-2 px-6 rounded-full shadow transition">
                Subscribe Now
              </button>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center text-blue-800 font-medium shadow">
            Cyber threats evolve daily, but so can your knowledge. Subscribe today and become a cybersecurity expert—because knowing is the first step to protecting yourself.
          </div>
        </div>
      </section>
    </div>
  );
};

export default EduPage;