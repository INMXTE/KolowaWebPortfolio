import React, { useState } from 'react';

const ContactSection = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const mailtoLink = `mailto:studio@kolowa.com?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              className="w-full p-2 rounded bg-gray-800 text-white"
              rows={5}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
            disabled={isSent}
          >
            {isSent ? 'Sent' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
