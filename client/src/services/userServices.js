import axios from "axios";
import Cookies from 'js-cookie'
import { useUser } from "../Context/UserContext";

const baseURL = "http://localhost:3000";

export function signup(data) {
    delete data.confirmPassword
    const body = {
        ...data,
        username: generateUsername(data.name),
        avatar: "https://upload.wikimedia.org/wikipedia/pt/8/86/Avatar_Aang.png",
    };
    const response = axios.post(`${baseURL}/user/create`, body);
    return response;
}

export function signin(data) {
    const response = axios.post(`${baseURL}/auth/login`, data);
    return response;
}

export async function userLogged() {
    const response = await axios.get(`${baseURL}/user/findById`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response.data
}

export function editUser(body, id) {
    const response = axios.patch(`${baseURL}/user/update/${id}`, body, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    })
    return response
}

function generateUsername(name) {
    const nameFormatado = name.replace(/\s/g, "").toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${nameFormatado}-${randomNumber}`;
}

