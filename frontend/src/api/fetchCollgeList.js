
import apiClient from "../services/api";

export async function fetchCollegeList(){
    try {
        const response = await apiClient.get('apis/collegelist/');
        return response.data
    }
    catch(error){
        console.error('Failed to fetch College List');
        throw error;
    }
}
