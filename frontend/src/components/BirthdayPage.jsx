import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Label,
    TextInput,
    Textarea,
    Alert,
    Spinner
} from "flowbite-react";
import {
    FiX,
    FiHeart,
    FiSend,
    FiMessageCircle,
    FiMail
} from "react-icons/fi";
import { toast } from "sonner";
import birthdayPlaceholder from '../assets/birthday.jpeg';

const BirthdayPage = () => {
    const { birthdayId } = useParams();
    const [birthday, setBirthday] = useState(null);
    const [wishes, setWishes] = useState([]);
    const [error, setError] = useState(null);
    const MAX_WISH_LENGTH = 300; // Maximum character count for wishes

    // Drawer for adding wishes
    const [isWishDrawerOpen, setIsWishDrawerOpen] = useState(false);
    const [wishName, setWishName] = useState("");
    const [wishMessage, setWishMessage] = useState("");
    const [wishLoading, setWishLoading] = useState(false);
    const [wishError, setWishError] = useState(null);

    // Drawer for sharing via email
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareEmails, setShareEmails] = useState("");
    const [shareLoading, setShareLoading] = useState(false);
    const [shareError, setShareError] = useState(null);
    const [shareSuccess, setShareSuccess] = useState(null);

    // ----------------------------
    // Lifecycle / Data Fetching
    // ----------------------------
    useEffect(() => {
        if (!birthdayId) {
            setError("Invalid birthday ID");
            return;
        }
        fetchBirthday();
        fetchAllWishes();
    }, [birthdayId]);

    const fetchBirthday = async () => {
        try {
            const res = await fetch(`http://localhost:5500/api/birthday/${birthdayId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch birthday");
            setBirthday(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchAllWishes = async () => {
        try {
            const res = await fetch(`http://localhost:5500/api/wish/${birthdayId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch wishes");
            setWishes(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // ----------------------------
    // "Add Wish" Drawer Handlers
    // ----------------------------
    const openWishDrawer = () => {
        setIsWishDrawerOpen(true);
        setWishError(null);
        setWishName("");
        setWishMessage("");
    };

    const closeWishDrawer = () => setIsWishDrawerOpen(false);

    const handleWishSubmit = async (e) => {
        e.preventDefault();
        toast.success("Wish submitted successfully!");
        setWishLoading(true);
        setWishError(null);

        try {
            const res = await fetch("http://localhost:5500/api/wish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    birthdayId,
                    name: wishName,
                    message: wishMessage
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create wish");

            // Optimistically update local list
            setWishes((prev) => [data, ...prev]);
            closeWishDrawer();
        } catch (err) {
            setWishError(err.message);
        } finally {
            setWishLoading(false);
        }
    };

    // ----------------------------
    // "Share By Email" Drawer Handlers
    // ----------------------------
    const openShareDrawer = () => {
        setIsShareOpen(true);
        setShareError(null);
        setShareSuccess(null);
        setShareEmails("");
    };

    const closeShareDrawer = () => setIsShareOpen(false);
    // Message input handler with character limit
    const handleMessageChange = (e) => {
        // Limit to MAX_WISH_LENGTH characters
        setWishMessage(e.target.value.slice(0, MAX_WISH_LENGTH));
    };
    const handleShareSubmit = async () => {
        setShareLoading(true);
        setShareError(null);
        setShareSuccess(null);

        try {
            const emailsArray = shareEmails.split(",").map((e) => e.trim());

            const res = await fetch("http://localhost:5500/api/share", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    birthdayId,
                    emails: emailsArray
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send emails");
            setShareSuccess(data.message);
        } catch (err) {
            setShareError(err.message);
        } finally {
            setShareLoading(false);
        }
    };

    // ----------------------------
    // Loading & Error States
    // ----------------------------
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert color="failure" className="max-w-lg mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">Error:</span> {error}
                    </div>
                </Alert>
            </div>
        );
    }

    if (!birthday) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <Spinner size="xl" className="mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Loading celebration...
                    </p>
                </div>
            </div>
        );
    }

    // ----------------------------
    // Main Render
    // ----------------------------
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-[#000000] rounded-xl shadow-lg overflow-hidden">
                        {/* Hero Section */}
                        <div className="relative">


                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <img
                                src={birthday.imageUrl || birthdayPlaceholder}
                                alt=""
                                className="w-full h-72 object-cover"
                            />


                            <div
                                className={`p-6 `}
                            >
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                    {birthday.name}'s Birthday 🎉
                                </h1>
                                <p className="text-lg opacity-90">
                                    Share your wishes and celebrate together!
                                </p>
                            </div>
                        </div>

                        {/* Wishes Section */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FiMessageCircle className="h-6 w-6" />
                                    Birthday Wishes
                                </h2>
                                {/* Example of custom classes for the button to ensure a border */}
                                <Button
                                    onClick={openWishDrawer}
                                    className="
                    flex items-center gap-2
                    border border-pink-700
                    dark:border-pink-600
                    dark:hover:bg-pink-700
                    hover:bg-pink-800
                  "
                                >
                                    <FiHeart className="h-4 w-4 mr-2 " />
                                    Add Wish
                                </Button>
                            </div>

                            {wishes.length ? (
                                <div className="space-y-4">
                                    {wishes.map((wish) => (
                                        <div
                                            key={wish._id}
                                            className="bg-gray-50 dark:bg-[#111111] p-4 rounded-lg"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                                        <FiHeart className="h-5 w-5 text-pink-500" />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                                                        {wish.name}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        {wish.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FiHeart className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        No wishes yet. Be the first to send your wishes!
                                    </p>
                                    <Button

                                        onClick={openWishDrawer}
                                        className="
                      flex items-center gap-2 mx-auto
                      border border-pink-700
                      dark:border-pink-600
                      dark:hover:bg-pink-700
                      hover:bg-pink-800
                    "
                                    >
                                        <FiHeart className="h-4 w-4 mr-2 mt-0.5" />
                                        Send Wishes
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Button: Share By Email */}
                        <Button

                            onClick={openShareDrawer}
                            className="
                flex items-center gap-2 m-6
                border border-pink-700
                dark:border-pink-600
                dark:hover:bg-pink-700
                hover:bg-pink-800
              "
                        >
                            <FiMail className="h-4 w-4 mr-2 mt-0.5" />
                            Share By Email
                        </Button>
                    </div>
                </div>
            </div>

            {/* SHARE DRAWER */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white dark:bg-[#000000] shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isShareOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold dark:text-white">Share this Birthday</h2>
                        <button
                            onClick={closeShareDrawer}
                            className="
                p-2 rounded-lg
                text-gray-500 hover:text-gray-700
                dark:text-gray-400 dark:hover:text-gray-200
              "
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto">
                        {shareError && (
                            <Alert color="failure" className="mb-3">
                                {shareError}
                            </Alert>
                        )}
                        {shareSuccess && (
                            <Alert color="success" className="mb-3">
                                {shareSuccess}
                            </Alert>
                        )}
                        <div className="mb-4">
                            <Label htmlFor="emails" value="Recipient Emails" className="dark:text-white" />
                            <TextInput
                                id="emails"
                                placeholder="e.g. friend1@example.com, friend2@example.com"
                                value={shareEmails}
                                onChange={(e) => setShareEmails(e.target.value)}
                                className="dark:bg-[#111111] dark:border-gray-600 dark:text-gray-100"
                            />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Separate multiple emails with commas.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-3">
                        {/* "Cancel" -> Outline button example */}
                        <Button
                            color="white"
                            onClick={closeShareDrawer}
                            className="
                border border-gray-400
                text-gray-700 dark:text-gray-200
                dark:border-gray-500
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
                        >
                            Cancel
                        </Button>
                        <Button

                            onClick={handleShareSubmit}
                            disabled={shareLoading}
                            className="
                flex items-center gap-2
                border border-pink-700
                dark:border-pink-600
                dark:hover:bg-pink-700
                hover:bg-pink-800
              "
                        >
                            {shareLoading ? (
                                <>
                                    <Spinner size="sm" className="mr-2" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FiSend className="h-4 w-4 mr-1" />
                                    Send Email
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
            {isShareOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={closeShareDrawer}
                    aria-hidden="true"
                />
            )}

            {/* ADD WISH DRAWER */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white dark:bg-[#000000] shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isWishDrawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Send Birthday Wishes
                        </h2>
                        <button
                            onClick={closeWishDrawer}
                            className="
                p-2 text-gray-500 hover:text-gray-700
                dark:text-gray-400 dark:hover:text-gray-200
                rounded-lg
              "
                            aria-label="Close drawer"
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {wishError && (
                            <Alert color="failure" className="mb-4">
                                {wishError}
                            </Alert>
                        )}
                        <form onSubmit={handleWishSubmit} className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="wishName"
                                    className="text-gray-900 dark:text-white mb-2"
                                >
                                    Your Name
                                </Label>
                                <TextInput
                                    id="wishName"
                                    placeholder="Enter your name"
                                    value={wishName}
                                    onChange={(e) => setWishName(e.target.value)}
                                    required
                                    className="dark:bg-[#111111] dark:border-gray-600 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="wishMessage"
                                    className="text-gray-900 dark:text-white mb-2"
                                >
                                    Your Message
                                </Label>
                                <div className="relative">
                                    <Textarea
                                        id="wishMessage"
                                        placeholder="Write your birthday wishes..."
                                        rows={5}
                                        value={wishMessage}
                                        onChange={handleMessageChange}
                                        required
                                        maxLength={MAX_WISH_LENGTH}
                                        className="dark:bg-[#111111] dark:border-gray-600 dark:text-gray-100"
                                    />
                                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                                        {wishMessage.length}/{MAX_WISH_LENGTH}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Drawer Footer */}
                    <div className="border-t dark:border-gray-700 p-4">
                        <div className="flex justify-end gap-3">
                            {/* Outline "Cancel" button */}
                            <Button
                                color="white"
                                onClick={closeWishDrawer}
                                type="button"
                                className="
                  border border-gray-400
                  text-gray-700 dark:text-gray-200
                  dark:border-gray-500
                  hover:bg-gray-100 dark:hover:bg-gray-700
                "
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleWishSubmit}
                                disabled={wishLoading}
                                className="
                  flex items-center gap-2
                  border border-pink-700
                  dark:border-pink-600
                  dark:hover:bg-pink-700
                  hover:bg-pink-800
                "
                            >
                                {wishLoading ? (
                                    <>
                                        <Spinner size="sm" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="h-4 w-4" />
                                        Send Wishes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {isWishDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={closeWishDrawer}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export default BirthdayPage;
