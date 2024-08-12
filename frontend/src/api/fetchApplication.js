
import apiClient from "../services/api";

export async function fetchApplication(){
    try {
        const response = await apiClient.get('apis/application/');
        return response.data
    }
    catch(error){
        console.error('Failed to fetch Application');
        throw error;
    }
}
