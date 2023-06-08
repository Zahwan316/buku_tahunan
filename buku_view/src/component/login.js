import React, { useState, useEffect,Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from './loginComponent/loginComp';
import axios from "axios"

const LoginPage = () => {
    const[dataForm,setDataForm] = useState({
        email:"",
        password:"",
    })
    const[error,setError] = useState({
        email:"",
        password:""
    })

    const[serveresponse,setserveresponse] = useState();

    const[datalogin,setDatalogin] = useState([])

    const navigate = useNavigate();

    const handleForm = (e) => {
        setDataForm({...dataForm,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        console.log(dataForm)
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        let errmsg = {}

        if(dataForm.email == ""){
            errmsg.email = "*Email Tidak Boleh Kosong"
        }
        else{
            errmsg.email = ""
        }

        if(dataForm.password === ""){
            errmsg.password = "*Password Tidak Boleh Kosong"
        }
        else if(dataForm.password.length < 8){
            errmsg.password = "*Password Tidak Boleh Kurang Dari 8 Huruf"
        }
        else{
            errmsg.password = ""
        }

        setError(errmsg)

        let confirm = true

        for(let err in error){
            if(error[err].length > 0){
                confirm  = false
            }
        }

        if(confirm){
            axios.post("http://127.0.0.1:8000/api/login",dataForm,{
            })
            .then(response => {
                console.log(response);
                setDatalogin(response.data);
                localStorage.setItem("username",response.data.username)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("role",response.data.role)
                setserveresponse(response.data.message);
                if(dataForm.email === "admin316@gmail.com"){
                    setTimeout(() => {
                        navigate("/admin");   

                    },500)
                }
                else{
                    setTimeout(() => {
                        navigate("/");
                    },500)
                }
            })
            .catch(error => {
                console.log(error)
                setserveresponse(error.response.data.errors.message)
            })
           /*  localStorage.setItem(datalogin); */
        }
    }

    const regisHandle = () => {
        navigate("/register");
    }

    return(
        <Fragment>
            <LoginComponent 
            page="Login"
            linkHandle={regisHandle} 
            dataform={dataForm}
            errormsg={error}
            handleform={handleForm}
            submit={handleSubmit}
            serveresponse={serveresponse}
            /> 
        </Fragment>
       
    )
}

export default LoginPage;
