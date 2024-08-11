import React, { useState,useEffect } from "react";


const JobCard = ({ job, onClick, isActive }) => {
  return (
    <div
      onClick={() => onClick(job)}
      className={`p-4 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform cursor-pointer mb-4 ${
        isActive ? "border-2 border-blue-500" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <img src={job.icon} alt="icon" className="w-10 h-10" />
      </div>
      <h2 className="text-lg font-semibold mt-2">{job.title}</h2>
      <p className="text-gray-600">{job.location}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          {job.type}
        </span>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          {job.level}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          New
        </span>
      </div>
    </div>
  );
};

const JobDetails = ({ job,onBack}) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={onBack}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Back
      </button>
      <div className="flex items-center">
        <img src={job.icon} alt="icon" className="w-16 h-16 mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-blue-500">{job.company}</p>
          <p className="text-gray-500">{job.location}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Experience: {job.experience}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Work Level: {job.level}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Employee Type: {job.type}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Offer Salary: {job.salary}
        </span>
      </div>
      <p className="mt-4 text-gray-600">{job.description}</p>
      <p className="mt-2 text-gray-600">Posted {job.posted} ago</p>
    </div>
  );
};

const JobList = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      icon: "https://example.com/uiux.png",
      title: "UI / UX Designer",
      location: "2972 Westheimer Rd. Santa Ana.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/product.png",
      title: "Sr. Product Designer",
      location: "1901 Thornridge Cir. Shiloh, Hawaii.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/ux.png",
      title: "User Experience Designer",
      location: "414 Parker Rd. Allentown, New york",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/product.png",
      title: "Product Designer",
      location: "4517 Washington Ave. Syracuse.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/uiux.png",
      title: "UI / UX Designer",
      location: "2972 Westheimer Rd. Santa Ana.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/uiux.png",
      title: "UI / UX Designer",
      location: "2972 Westheimer Rd. Santa Ana.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/uiux.png",
      title: "UI / UX Designer",
      location: "2972 Westheimer Rd. Santa Ana.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/uiux.png",
      title: "UI / UX Designer",
      location: "2972 Westheimer Rd. Santa Ana.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
    {
      icon: "https://example.com/uiux.png",
      title: "UI / UX Designer",
      location: "2972 Westheimer Rd. Santa Ana.",
      type: "Full Time",
      experience: "Minimum 1 Year",
      level: "Senior Level",
      company: "Patreon",
      salary: "$2150.0 / Month",
      description:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      posted: "8 days",
    },
  ];

  const handleBack = () => {
    setSelectedJob(null);
  };

  return (
    <div className="flex">
      <div
        className={`${
          selectedJob ? "w-1/3 hidden sm:block" : "w-fit"
        } transition-all duration-300 bg-gray-100 p-4 h-screen overflow-y-auto`}
      >
        <div
          className={`grid ${
            selectedJob ? "grid-cols-1" : "lg:grid-cols-5 h-fit md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
          } gap-x-4`}
        >
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              onClick={setSelectedJob}
              isActive={selectedJob && selectedJob.title === job.title}
            />
          ))}
        </div>
      </div>
      {selectedJob && (
        <div className="sm:w-2/3 bg-gray-50 p-6 transition-all duration-300 w-full">
          <JobDetails job={selectedJob} onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default JobList;
