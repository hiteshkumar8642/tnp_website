const CompanyCard = ({ comingCompany, onClick, isActive }) => {
  const { company_id, position, is_spp, is_sip } = comingCompany || {};
  const companyName = company_id?.name || "Unknown Company";

  return (
    <div
      onClick={() => onClick(comingCompany)}
      className={`p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform cursor-pointer mb-4 ${
        isActive ? "border-2 border-blue-500" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mt-2">{companyName}</h2>
      <p className="text-gray-600">{position}</p>
      <div className="flex justify-between items-center mt-2">
        {is_spp && (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            SPP
          </span>
        )}
        {is_sip && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            SIP
          </span>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
