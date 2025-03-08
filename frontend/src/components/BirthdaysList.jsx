import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";
import { FiGift, FiPlus, FiHeart } from "react-icons/fi";
import birthdayPlaceholder from '../assets/birthday.jpeg';

const BirthdaysList = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBirthdays = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/birthday");
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Failed to fetch birthdays");
                setBirthdays(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBirthdays();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <Spinner size="xl" className="mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading celebrations...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert color="failure" className="mx-auto max-w-2xl">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">Error:</span> {error}
                    </div>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-4">
                        Birthday Celebrations
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mb-6">
                        Join in the celebrations and share your wishes with friends and family
                    </p>
                </div>

                {birthdays.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-xl bg-gray-50 dark:bg-[#000000]">
                        <FiGift className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No celebrations yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Be the first to create a birthday celebration!
                        </p>
                        <Link
                            to="/create"
                            className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                        >
                            <FiPlus className="mr-2" />
                            Create Celebration
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {birthdays.map((bday) => (
                            <Link to={`/birthday/${bday._id}`}>
                                <div
                                    key={bday._id}
                                    className="group bg-white dark:bg-[#000000] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={bday.imageUrl || birthdayPlaceholder}
                                            alt={bday.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="capitalize text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                            {bday.name}
                                        </h3>

                                        <div className="flex items-center justify-between">
                                            <Link

                                                className="inline-flex items-center text-pink-600 dark:text-pink-500 hover:text-pink-700 dark:hover:text-pink-300 font-medium transition-colors"
                                            >
                                                <FiHeart className="mr-2" />
                                                View Wishes
                                            </Link>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {bday.wishCount} wishes
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                )}

                {birthdays.length > 0 && (
                    <div className="text-center mt-12">
                        <Link
                            to="/create"
                            className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                        >
                            <FiPlus className="mr-2" />
                            Create New Celebration
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BirthdaysList;
