import React, { useState } from "react";

function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSubjectChange(event) {
    setSubject(event.target.value);
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    // Your code to send the email goes here
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div>
        <label htmlFor="subject"></label>
        <input
          type="text"
          id="subject"
          value={subject}
          placeholder="subject"
          onChange={handleSubjectChange}
        />
      </div>

      <div>
        <label htmlFor="message"></label>
        <textarea
          className="inline-block h-32"
          id="message"
          placeholder="message"
          value={message}
          onChange={handleMessageChange}
          style={{ display: "inline-block" }}
        />
        <button type="submit" className="email-btn inline-block ml-6">
          Send
        </button>
      </div>
    </form>
  );
}

export default Contact;
