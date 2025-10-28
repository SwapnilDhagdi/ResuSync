import axios from "axios";
import { useState } from "react";
import List from './List'
import instance from "../instance";
function GetUser(){
    const [data,setData]=useState([0]);
    const handleClick=()=>{
        
        instance.get("/api/getUser")
        .then(function(response){
            console.log(response)
            setData(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
        .finally(function (){
              console.log()
        })
          
    }
    return (
        <div>
            <button onClick={handleClick}>
                    Click to get user data
            </button>
            <ul>
                <List result={data} ></List>
            </ul>
        </div>
    );
}
export default GetUser