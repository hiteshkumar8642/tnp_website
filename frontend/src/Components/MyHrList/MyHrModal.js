import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyHrModal.css";
import { FaLinkedin } from "react-icons/fa";

const HrModal = ({ hr, onClose, handleStatusChange }) => {
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
    <div className="myhrlist-modal-overlay" onClick={onClose}>
      <div
        className="myhrlist-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="myhrlist-modal-header">
          <h2>
            {hr.name}
            <a href={hr.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin style={{ color: "#0e76a8" }} />
            </a>
          </h2>
        </div>
        <div className="myhrlist-modal-body">
          <div className="grid-item grid-item-0-0">
            <div className="info-row">
              <label>Gender:</label>
              <span className="data">{hr.gender}</span>
            </div>
            <div className="info-row">
              <label>Last Date of Contact:</label>
              <div className="data">{hr.last_date_of_contact}</div>
            </div>
            <div className="info-row">
              <label>Next Date of Contact:</label>
              <div className="data">
                <DatePicker
                  selected={nextContactDate}
                  onChange={(date) => setNextContactDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div className="info-row">
              <label>Status:</label>
              <span className="data">{hr.status}</span>
            </div>
            <button onClick={() => handleStatusChange(hr.id, "Assigned")}>
              Reassign
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
          <div className="grid-item grid-item-1-0">
            <h3>Company Information</h3>
            <p>Company: {hr.company_id.name}</p>
            <p>General CTC: {hr.company_id.general_ctc}</p>
            <p>College CTC: {hr.company_id.college_ctc}</p>
            <p>
              Time of Visit:{" "}
              {new Date(hr.company_id.time_of_visit).toLocaleDateString()}
            </p>
            <h4>Allowed Courses:</h4>
            <ul>
              {hr.company_id.allowed_courses.map((course, index) => (
                <li key={index}>
                  {course.degree} in {course.specialization} (
                  {course.course_duration} years)
                </li>
              ))}
            </ul>
            <h4>Point of Contact:</h4>
            <p>College: {hr.company_id.poc.college.name}</p>
            <p>
              Course: {hr.company_id.poc.course.degree} in{" "}
              {hr.company_id.poc.course.specialization}
            </p>
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
