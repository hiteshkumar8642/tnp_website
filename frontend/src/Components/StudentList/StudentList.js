import React, { useState, useEffect } from "react";
import { fetchAllStudents } from "../../api/studentList";
import StudentCard from "./StudentCard";
import StudentDetails from "./StudentDetails";
import SearchBar from "../SearchBar/SearchBar";

const StudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAllStudents() {
      try {
        const storedAllStudents = localStorage.getItem("allStudents");
        if (storedAllStudents) {
          setStudents(JSON.parse(storedAllStudents));
        } else {
          const data = await fetchAllStudents();
          setStudents(data);
          localStorage.setItem("allStudents", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load All Students");
        console.error(err);
      }
    }
    getAllStudents();
  }, []);

  const handleBack = () => {
    setSelectedStudent(null);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div className="flex">
        <div
          className={`${
            selectedStudent ? "w-1/3 hidden sm:block" : "w-fit"
          } transition-all duration-300 bg-gray-100 p-4 h-screen overflow-y-auto`}
        >
          <div>
            <SearchBar/>
          </div>
          <div
            className={`grid ${
              selectedStudent
                ? "grid-cols-1"
                : "lg:grid-cols-5 h-fit md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
            } gap-x-4`}
          >
            {students.map((student, index) => (
              <StudentCard
                key={index}
                student={student}
                onClick={setSelectedStudent}
                isActive={selectedStudent && selectedStudent.id === student.id}
              />
            ))}
          </div>
        </div>
        {selectedStudent && (
          <div className="sm:w-2/3 bg-gray-50 p-6 transition-all duration-300 w-full">
            <StudentDetails student={selectedStudent} onBack={handleBack} />
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
