import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_188m5gz",   // Replace with your EmailJS Service ID
        "template_vcs5b38",  // Replace with your EmailJS Template ID
        form.current,
        "k5dFBrUUaxfxTavUR"    // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Message sent:", result.text);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("Error:", error.text);
          alert("Failed to send message, please try again.");
        }
      );
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="first_name" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="last_name" required />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="user_email" required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" required />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" rows="5" required />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
