import React, { useState, useEffect } from 'react';
import LoginComponent from './loginComponent/loginComp';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const RegisPage = () => {
    const[dataForm,setDataForm] = useState({
        username:"",
        password:"",
        confirmPass:"",
        email:""
    })

    const[error,setError] = useState({
        username:"",
        password:"",
        confirmPass:"",
        email:""
    });

    const[serveresponse,setServerResponse] = useState("")

    const[passwordMatch,setPasswordMatch] = useState(true)
    const[connfirmsubmit,setConfirmSubmit] = useState(false)


    const navigate = useNavigate()

    const handleForm = (e) => {
        setDataForm({...dataForm,[e.target.name]:e.target.value})
    }



    useEffect(() => {
        console.log(dataForm)
        
    },[dataForm])

    const handleSubmit = (e) => {
        e.preventDefault()

        let errMsg = {}
    

        if(dataForm.username === ""){
            errMsg.username = "*Username Tidak Boleh Kosong"
        }
        else{
            errMsg.username = ""
        }

        if(dataForm.email === ""){
            errMsg.email = "*Email Tidak Boleh Kosong"
        }
        else{
            errMsg.email = ""
        }

        if(dataForm.password === ""){
            errMsg.password = "*Password Tidak Boleh Kosong"
        }
        else if(dataForm.password.length < 8){
            errMsg.password = "*Password Tidak Boleh Kurang Dari 8 Huruf"
        }
        else{
            errMsg.password = ""
        }

        if(dataForm.confirmPass === ""){
            errMsg.confirmPass = "*Konfirmasi Password Tidak Boleh Kosong"
        }
        else{
            errMsg.confirmPass = ""
        }

        if(dataForm.password === dataForm.confirmPass){
            setPasswordMatch(true)
        }
        else{
            setPasswordMatch(false)
            errMsg.confirmPass = "*Konfirmasi Password Tidak Sama"
        } 

        setError(errMsg)

        let confirmsubmit = false

        for(let errmsg in error){
            if(error[errmsg].length < 1){
                setConfirmSubmit(true)

            }
        }

    

        if(connfirmsubmit){
            axios.post("http://127.0.0.1:8000/api/register",dataForm)
            .then(Response => {
                setServerResponse(Response.data.message);
                setTimeout(() => {
                    navigate("/login")
                },1000);

            })
            .catch(error => console.log(error))

        }

        console.log(error)


    }

    const loginHandle = () => {
        navigate("/login");
    }

    return(
        <LoginComponent 
            page="Register" 
            linkHandle={loginHandle}
            dataform={dataForm}
            handleform={handleForm}
            passwordmatch={passwordMatch}
            submit={handleSubmit}
            errormsg={error}
            serveresponse={serveresponse}
        />
    )
}

export default RegisPage;