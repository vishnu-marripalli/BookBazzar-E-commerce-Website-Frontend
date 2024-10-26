import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API
        console.log('Form data submitted:', formData);
        // Reset the form fields
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 space-y-10">
            {/* Website Info Section */}
            <div className="max-w-2xl text-center space-y-4">
                <h1 className="text-3xl font-bold text-[#937DC2]">Welcome to BookBazaar</h1>
                <p className="text-lg text-gray-700">
                    BookBazaar is a one-stop marketplace for book enthusiasts where you can discover, buy, and sell a wide variety of books. Whether you're into fiction, non-fiction, textbooks, or specialized genres, we’re here to connect readers with a world of knowledge.
                </p>
                <p className="text-md text-gray-700">
                    If you have any questions, want to give feedback, or need help with any features, please feel free to reach out to us. We're here to make your BookBazaar experience as seamless and enjoyable as possible.
                </p>
            </div>

            {/* Contact Form */}
            <div className="w-full max-w-md p-8 space-y-6 bg-[#937DC2] rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded border-none outline-none focus:ring-2 focus:ring-[#FFFFFF] bg-[#F1F1F1]"
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded border-none outline-none focus:ring-2 focus:ring-[#FFFFFF] bg-[#F1F1F1]"
                            placeholder="Your Email"
                            required
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full p-3 rounded border-none outline-none focus:ring-2 focus:ring-[#FFFFFF] bg-[#F1F1F1]"
                            placeholder="Subject"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-1">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 h-32 rounded border-none outline-none resize-none focus:ring-2 focus:ring-[#FFFFFF] bg-[#F1F1F1]"
                            placeholder="Your Message"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-black rounded hover:bg-[#F1F1F1] hover:text-black transition-all duration-300 font-semibold"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
