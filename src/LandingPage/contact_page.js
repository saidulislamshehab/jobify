import React from "react";
import "./contact_page.css";

export default function ContactPage() {
  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1 className="contact-title">Contact Us</h1>
        <form className="contact-form">
          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="jane@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={4}
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
