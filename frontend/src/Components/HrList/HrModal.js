import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HrModal.css";
import { FaLinkedin } from "react-icons/fa";

const HrModal = ({ hr, onClose, handleStatusChange }) => {
  const [lastContactDate, setLastContactDate] = useState(
    new Date(hr.last_date_of_contact)
  );
  const [nextContactDate, setNextContactDate] = useState(
    new Date(hr.next_date_of_contact)
  );
  const [messages, setMessages] = useState(hr.messages || []);
  const [newMessageDate, setNewMessageDate] = useState(new Date());
  const [newMessage, setNewMessage] = useState("");

  const handleAddMessage = () => {
    const updatedMessages = [
      ...messages,
      { date: newMessageDate, message: newMessage },
    ];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="hrlist-modal-overlay" onClick={onClose}>
      <div
        className="hrlist-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hrlist-modal-header">
          <h2>
            {hr.name}
            <a href={hr.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin style={{ color: "#0e76a8" }} />
            </a>
          </h2>
        </div>
        <div className="hrlist-modal-body">
          <div className="grid-item grid-item-0-0">
            <p>Company: {hr.company_id.name}</p>
            <p>Gender: {hr.gender}</p>
            <div>
              <label>Last Date of Contact:</label>
              <DatePicker
                selected={lastContactDate}
                onChange={(date) => setLastContactDate(date)}
              />
            </div>
            <div>
              <label>Next Date of Contact:</label>
              <DatePicker
                selected={nextContactDate}
                onChange={(date) => setNextContactDate(date)}
              />
            </div>
            <p>Status: {hr.status}</p>
            <button onClick={() => handleStatusChange(hr.id, "Assigned")}>
              Assign me
            </button>
          </div>
          <div className="grid-item grid-item-0-1">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, index) => (
                  <tr key={index}>
                    <td>{new Date(msg.date).toLocaleDateString()}</td>
                    <td>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid-item grid-item-1-1">
            <div>
              <label>Select Date:</label>
              <DatePicker
                selected={newMessageDate}
                onChange={(date) => setNewMessageDate(date)}
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <button onClick={handleAddMessage}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrModal;
