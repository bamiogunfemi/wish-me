import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { FiGift, FiCalendar, FiHeart } from 'react-icons/fi';
import birthdayHero from '../assets/birthday-cake.jpg';

const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden">
                {/* Hero Image with Overlay */}
                <div className="relative h-full w-full">
                    {/* Darker gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60 z-10" />

                    <img
                        src={birthdayHero || "/placeholder.svg"}
                        alt="Birthday Celebration"
                        className="h-full w-full object-cover"
                    />

                    {/* Centered Content */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className={`max-w-4xl w-full px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-center text-white">
                                Make Every Birthday
                                <span className="block text-pink-300">Unforgettable</span>
                            </h1>

                            <p className="text-lg md:text-xl text-white mb-8 mx-auto text-center max-w-3xl">
                                Create beautiful birthday celebrations that bring together friends and family from anywhere in the world.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/create">
                                    <Button
                                        size="lg"
                                        className="bg-pink-500 hover:bg-pink-600 text-white border-0 px-8 py-3 rounded-lg transform transition hover:scale-105 max-sm:w-full"
                                    >
                                        <FiGift className="mr-2 h-5 w-5" />
                                        Create a Celebration
                                    </Button>
                                </Link>
                                <Link to="/birthdays">
                                    <Button
                                        size="lg"
                                        color="gray"
                                        className="bg-white text-gray-900 border-2 border-white/30 px-8 py-3 rounded-lg max-sm:w-full backdrop-blur-sm transform transition hover:scale-105"
                                    >
                                        <FiCalendar className="mr-2 h-5 w-5" />
                                        View Celebrations
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white dark:bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <FiGift className="h-8 w-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Create Memories</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Design birthday pages with photos and messages
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <FiHeart className="h-8 w-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Share Love</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Invite friends and family to add their birthday wishes
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <FiCalendar className="h-8 w-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Never Forget</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Keep track of upcoming birthdays and celebrations
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
