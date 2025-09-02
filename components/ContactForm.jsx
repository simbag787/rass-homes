import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const form = useRef();
  const [captchaToken, setCaptchaToken] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.warn("Please complete the captcha.");
      return;
    }

    emailjs
      .sendForm(
        "service_188m5gz", // EmailJS Service ID
        "template_vcs5b38", // EmailJS Template ID
        form.current,
        "k5dFBrUUaxfxTavUR" // EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Message sent:", result.text);
          toast.success("Message sent successfully!");
          form.current.reset();
          setCaptchaToken(null);
        },
        (error) => {
          console.error("Error:", error.text);
          toast.error("Failed to send message. Please try again.");
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

        {/* reCAPTCHA */}
        <div className="form-group">
          <ReCAPTCHA
            sitekey="6LeCMrsrAAAAAEhdWi74b1WpTBAyNghfpLq5W2v6"
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>

        <button type="submit">Send</button>
      </form>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="custom-toast"
      />
    </div>
  );
}
