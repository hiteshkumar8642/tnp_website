const StudentCard = ({ student, onClick, isActive }) => {
  const { user, current_cgpa, backlogs } = student;
  return (
    <div
      onClick={() => onClick(student)}
      className={`p-4 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform cursor-pointer mb-4 ${
        isActive ? "border-2 border-blue-500" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <img
          src={`http://localhost:8000${student.photo}`}
          alt="icon"
          className="w-10 h-10"
        />
      </div>
      <h2 className="text-lg font-semibold mt-2">{`${user.first_name} ${user.last_name}`}</h2>
      <p className="text-gray-600">{student.location}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          CGPA : {current_cgpa}
        </span>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          Backlog : {backlogs}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Roll : {user.username}
        </span>
      </div>
    </div>
  );
};

export default StudentCard;
