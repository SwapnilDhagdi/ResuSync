import axios from "axios";

const instance=axios.create({

    baseURL:"https://resusync-backend.onrender.com",
    timeout:15000,
    withCredentials:true
});

export default instance;