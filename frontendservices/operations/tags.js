import { tagsEndpoints} from '../api'
import { setLoading, setToken } from '@/frontendservices/slices/authSlice'
import { apiConnector } from '../apiconnector'
import { useRouter } from 'next/navigation'

const { GET_TAGS_API } =tagsEndpoints;


export async function getalltags() {
    try{
        const response = await apiConnector('GET',GET_TAGS_API);
        console.log(response.data);
    }
    catch(err){
        console.log(err);
    }
    
  }