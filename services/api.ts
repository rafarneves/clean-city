import axios from "axios";

const api = axios.create({
    baseURL: "https://clean-city-059c7f60732d.herokuapp.com/clean-city/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
    
})

export default api