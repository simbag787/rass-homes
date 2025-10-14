import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm({ showAddress = false }) {
  const form = useRef();
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formData = new FormData(form.current);
    const newErrors = {};

    if (!formData.get("first_name")?.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.get("last_name")?.trim()) {
      newErrors.last_name = "Last name is required";
    }

    const email = formData.get("user_email");
    if (!email) {
      newErrors.user_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.user_email = "Please enter a valid email address";
    }

    const phone = formData.get("phone");
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
      newErrors.phone = "Phone number must be in format 123-456-7890";
    }

    if (showAddress) {
      if (!formData.get("street")?.trim()) newErrors.street = "Street is required";
      if (!formData.get("city")?.trim()) newErrors.city = "City is required";
      if (!formData.get("state")?.trim()) newErrors.state = "State is required";
    }

    if (!formData.get("message")?.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warn("Please fix the errors before submitting.");
      return;
    }

    if (!captchaToken) {
      toast.warn("Please complete the captcha.");
      return;
    }

    emailjs
      .sendForm(
        "service_188m5gz",
        "template_vcs5b38",
        form.current,
        "k5dFBrUUaxfxTavUR"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!");
          form.current.reset();
          setCaptchaToken(null);
          setErrors({});
        },
        (error) => {
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
            <input type="text" name="first_name" />
            {errors.first_name && <span className="error-text">{errors.first_name}</span>}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="last_name" />
            {errors.last_name && <span className="error-text">{errors.last_name}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="user_email" />
          {errors.user_email && <span className="error-text">{errors.user_email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="123-456-7890" />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        {showAddress && (
          <>
            <div className="form-group">
              <label>Street</label>
              <input type="text" name="street" />
              {errors.street && <span className="error-text">{errors.street}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>
            </div>
          </>
        )}

        <div className="form-group">
          <label>Message</label>
          <textarea name="message" rows="5" />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <div className="form-group">
          <ReCAPTCHA
            sitekey="6LeCMrsrAAAAAEhdWi74b1WpTBAyNghfpLq5W2v6"
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>

        <button type="submit">Send</button>
      </form>

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
