import { useEffect,useState } from "react";
import axios from "axios";

export default function Applied_Companies(){
    const[Applied_companies,setApplied_companies]=useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
        axios.get("http://localhost:8000/dashboard/api/AppliedCompany/")
        .then(response => setApplied_companies(response.data))
        .catch(error => setError(error));
        console.log(error);
        
    },[])
    function formatDate(date) {
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }
    return(
        <div>
        <h1>Applied_Companies</h1>
        <table className="table table-hover">
            
                
                   
            <thead>
            <tr>
            <th>User Id</th>
            <th>Status</th>
            <th>Applied on</th>
            <th>Updated on</th>
            <th>comment</th>
            </tr>
            </thead>
            <tbody>
            {
        Applied_companies.map(item => 
            <tr key={item.user_id}>
                <td>{item.user_id}</td>
                <td>{item.is_selected}</td>
                <td>{item.created}</td>
                <td>{item.updated}</td>
                <td>{item.comment}</td>
            </tr>
            )
            }
            </tbody>
            
        
   
    </table>
        </div>
    )
}