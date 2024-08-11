const AppliedCompanyCard = ({ company, onClick, isActive }) => {
  const { company_id, position, is_fte, is_ppo, is_intern } = company || {};
  const companyName = company_id?.name || "Unknown Company";

  return (
    <div
      onClick={() => onClick(company)}
      className={`p-4 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform cursor-pointer mb-4 ${
        isActive ? "border-2 border-blue-500" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mt-2">{companyName}</h2>
      <p className="text-gray-600">{position}</p>
      <div className="flex justify-between items-center mt-2">
        {is_fte && (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            FTE
          </span>
        )}
        {is_ppo && (
          <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            PPO
          </span>
        )}
        {is_intern && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Intern
          </span>
        )}
      </div>
    </div>
  );
};

export default AppliedCompanyCard;
