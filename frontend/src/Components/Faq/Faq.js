import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Data Structure?",
      answer: "Data structure is a fundamental concept of any programming language, essential for algorithmic design."
    },
    {
      question: "Benefits of Learning Data Structures",
      answer: "Understanding data structures helps in improving the efficiency and scalability of software solutions."
    },
    {
      question: "What is an array?",
      answer: "An array is a data structure consisting of a collection of elements, each identified by array indices."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-full w-10/12 mx-auto bg-[#f3f6fd] py-10">
      <div className="  bg-blue-50 shadow-md rounded-md">
        <div className="text-center">
          <h1 className='font-bold text-3xl'>FAQ</h1>
        </div>
        <div className="p-6">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center bg-gray-200 p-4 cursor-pointer rounded-md"
                onClick={() => toggleFaq(index)}
              >
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                <span className="text-2xl">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="bg-white p-4 mt-2 rounded-md shadow-inner">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
