import axios from "axios";
import { RegisterUser } from "@/models/Register";
import { Login } from "@/models/Login";
import ApiRoutes from "@/app/api/apiRoutes";

export const API = axios.create({
    baseURL: ApiRoutes.BASE_URL_API_DEV,
    headers: {
        'Content-Type': 'application/json',
        
    },
});

async function getUserHeaders() {
  return {
    'Content-Type': 'application/json',
  }
}


export async function RegisterCustomer(formData: RegisterUser): Promise<any> {
  const headers = await getUserHeaders()
  const resp = await API.post(ApiRoutes.REGISTER_USER, formData, { headers })
  console.log("Response from API CreateContact:", resp.data)
  return resp.data
}

export async function LoginUser(formData: Login): Promise<any> {
    const headers = await getUserHeaders()
  const resp = await API.post(ApiRoutes.LOGIN, formData, { headers })
  console.log("Response from API CreateContact:", resp.data)
  return resp.data
}