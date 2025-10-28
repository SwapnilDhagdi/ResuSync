import axios from "axios";

const instance=axios.create({

    baseURL:"https://resusync-backend.onrender.com",
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
});

export default instance;