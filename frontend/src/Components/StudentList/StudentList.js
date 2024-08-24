import React, { useState, useEffect } from "react";
import { fetchAllStudents } from "../../api/studentList";
import StudentCard from "./StudentCard";
import StudentDetails from "./StudentDetails";
import ShimmerStudentCard from "./ShimmerStudentCard"; // Import ShimmerStudentCard
import { FaSearch } from "react-icons/fa";

function StudentList() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getAllStudents() {
      setIsLoading(true);
      try {
        const storedAllStudents = localStorage.getItem("allStudents");
        if (storedAllStudents) {
          console.log("Using stored students data");
          setStudents(JSON.parse(storedAllStudents));
        } else {
          console.log("Fetching students data");
          const data = await fetchAllStudents();
          console.log("Fetched students data:", data);
          setStudents(data);
          localStorage.setItem("allStudents", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load All Students");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getAllStudents();
  }, []);

  const handleBack = () => {
    setSelectedStudent(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student &&
    student.user &&
    (student.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  console.log("Filtered students:", filteredStudents);

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Students</p>
      </div>
      <div className="projects-section-line">
        <div className="view-actions flex justify-between items-center w-full">
          <div className="flex items-center ml-auto">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded-l px-2 py-1 w-64"
            />
            <button 
              className="bg-black text-white px-3.5 py-2.5 rounded-r"
              onClick={() => handleSearch({ target: { value: searchTerm } })}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="project-box-wrapper grid lg:grid-flow-col grid-flow-row gap-9">
          {[...Array(8)].map((_, index) => (
            <ShimmerStudentCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="project-boxes jsGridView">
        {selectedStudent ? (
          <div className="w-full">
            <StudentDetails student={selectedStudent} onBack={handleBack} />
          </div>
        ) : (
          <div className="project-box-wrapper grid md:grid-flow-col grid-flow-row gap-8">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onClick={setSelectedStudent}
                isActive={selectedStudent && selectedStudent.id === student.id}
              />
            ))}
          </div>
        )}
      </div>
      )}
      
    </div>
  );
}

export default StudentList;
