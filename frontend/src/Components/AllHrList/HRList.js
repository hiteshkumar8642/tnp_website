import { useEffect,useState } from "react";
import axios from "axios";
export default function Companies(){
    const[HRList,setHRLists]=useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
    // 
    axios.get('http://localhost:8000/dashboard/api/HRContact/')
      .then(response => setHRLists(response.data))
      .catch(error => setError(error));
      console.log(error);
      
  }, []);
      return (
        <div>
        <h1> companies</h1>
        <table className="table table-hover">
        
            
               
                <thead>
                <tr>
                
                <th>Name</th>
                <th>Linked_in profile</th>
                <th>Mobile no</th>
                <th>EMail id</th>
                <th>Gender</th>
                <th>Date_of conatct</th>
                <th>Comapany Id</th>
                </tr>
                </thead>
                <tbody>
                {
             HRList.map(item => 
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.linkedin}</td>
                    <td> 
                    <ul>
                    {
                     item.mobile_numbers.map(nun =>
                    <li>{nun}</li>
                    )
                    }
                    </ul>
                    </td>
                    <td>{item.mail_id}</td>
                    <td>{item.gender}</td>
                    <td>{item.date_of_contact}</td>
                    <td>{item.company_id}</td>
                </tr>
                )
                }
                </tbody>
                
            
       
        </table>
    </div>
            )
            }
        