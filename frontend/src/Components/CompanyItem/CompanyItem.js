import { Link } from "react-router-dom";
function CompanyItem({ company }) {
  return (
    <Link>
      <div className="project-box" style={{ backgroundColor: "#fee4cb" }}>
        <div className="project-box-header">
          <span>{company.last_date} </span>
          <div className="more-wrapper">{company.is_spp ? "SPP" : ""}</div>
          <div className="more-wrapper">{company.is_sip ? "SIP" : ""}</div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{company.company_id.name}</p>
          <p className="box-content-subheader">{company.position}</p>
          <p className="box-content-subheader">
            {company.is_fte ? "Full Time" : ""} {company.is_ppo ? "PPO" : ""}{" "}
            {company.is_intern ? "Intern" : ""}
          </p>
        </div>

        <div className="project-box-footer">
          <div className="participants">{company.company_id.general_ctc}</div>
          <div className="days-left" style={{ color: "#ff942e" }}>
            10 Days
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CompanyItem;
