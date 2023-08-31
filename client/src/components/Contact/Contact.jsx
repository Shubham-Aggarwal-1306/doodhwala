import React, { useState } from "react";
import "./Contact.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendMessage } from "../../Actions/Contact";

const Contact = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const { loading } = useSelector((state) => state.contactReducer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (name && email && message) {
        if (checked) {
          dispatch(
            sendMessage(
              name,
              email,
              message,
            )
          );
        } else {
          toast.error("Please agree to the terms and conditions");
        }
      } else {
        toast.error("Please fill all the fields");
      }
    } else {
      toast.error("Please Login First");
    }
  };
  return (
    <div className="contact">
      <div className="contact__left">
        <div className="contact__left--title">Get in touch with us.</div>
        <div className="contact__left--subtitle">
          We provide a complete service for the sale, purchase.
        </div>
        <div className="contact__left--hr" />
        <div className="contact__left--details">
          <div className="contact__left--details--title">Find us at</div>
          <div className="contact__left--details--subtitle">
            <div className="contact__left--details--subtitle--item">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
                  stroke="#8C959F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z"
                  stroke="#8C959F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="contact__left--details--subtitle--item--text">
                1234 Post Avenue Remington
              </div>
            </div>
          </div>
          <div className="contact__left--details--title">
            Reach out to us at
          </div>
          <div className="contact__left--details--subtitle two">
            <div className="contact__left--details--subtitle--item">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 5.25L12 13.5L3 5.25"
                  stroke="#8C959F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z"
                  stroke="#8C959F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.3635 12L3.23114 18.538"
                  stroke="#8C959F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.7688 18.538L13.6363 11.9999"
                  stroke="#8C959F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="contact__left--details--subtitle--item--text">
                contact@homelun.
              </div>
            </div>
            <div className="contact__left--details--subtitle--item">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66965 11.7014C9.44762 13.2919 10.7369 14.5753 12.3309 15.346C12.4475 15.4013 12.5765 15.4252 12.7052 15.4155C12.8339 15.4058 12.9579 15.3627 13.0648 15.2905L15.4119 13.7254C15.5157 13.6562 15.6352 13.6139 15.7594 13.6025C15.8837 13.5911 16.0088 13.6109 16.1235 13.66L20.5144 15.5419C20.6636 15.6052 20.7881 15.7154 20.8693 15.8556C20.9504 15.9959 20.9838 16.1588 20.9643 16.3197C20.8255 17.4057 20.2956 18.4039 19.4739 19.1273C18.6521 19.8508 17.5948 20.2499 16.5 20.25C13.1185 20.25 9.87548 18.9067 7.48439 16.5156C5.0933 14.1245 3.75 10.8815 3.75 7.49997C3.75006 6.40513 4.14918 5.34786 4.87264 4.5261C5.5961 3.70435 6.59428 3.17448 7.68028 3.03569C7.84117 3.01622 8.00403 3.04956 8.14432 3.1307C8.28461 3.21183 8.39473 3.33636 8.4581 3.48552L10.3416 7.88032C10.3903 7.994 10.4101 8.11796 10.3994 8.24116C10.3886 8.36436 10.3475 8.48299 10.2798 8.58647L8.72011 10.9696C8.64912 11.0768 8.60716 11.2006 8.59831 11.3288C8.58947 11.4571 8.61405 11.5855 8.66965 11.7014V11.7014Z"
                  stroke="#8C959F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="contact__left--details--subtitle--item--text">
                +1 234 567 890
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact__right">
        <div className="contact__right--title">Contact Us</div>

        <div className="contact__right--form">
          <div className="contact__right--form--personal">
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="contact__right--form--message">
            <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="contact__right--form--checkbox">
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            <div className="contact__right--form--checkbox--text">
              I agree to the privacy policy
            </div>
          </div>
          {loading ? <div className="contact__right--form--submit">
            <div className="centerLoader"><div className="loader"></div></div>
          </div> : <button className="contact__right--form--submit" onClick={handleSubmit}>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
