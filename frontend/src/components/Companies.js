import { useEffect,useState } from "react";
import axios from "axios";
export default function Companies(){
    const[companies,setCompanies]=useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
    // 
    axios.get('http://localhost:8000/dashboard/api/Company/')
      .then(response => setCompanies(response.data))
      .catch(error => setError(error));
      console.log(error);
      
  }, []);
    return(
        <div>
            <h1> companies</h1>
            <table className="table table-hover">
            
                
                   
                    <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>General_CTC</th>
                    <th>College_CTC</th>
                    <th>TIME of Visit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                 companies.map(item => 
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.general_ctc}</td>
                        <td>{item.college_ctc}</td>
                        <td>{item.time_of_visit}</td>
                    </tr>
                    )
                    }
                    </tbody>
                    
                
           
            </table>
        </div>
    )
}