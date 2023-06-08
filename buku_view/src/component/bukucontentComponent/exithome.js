import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const HomeButtonComponent = (props) => {
    const navigate = useNavigate();
    
    const handlelink = () => {
        props.userpage === "admin" ?
        navigate('../../admin')
        :
        navigate("../")

    }

    return(
        <i className="fa-solid fa-right-from-bracket h2 text-white position-absolute" style={{top:props.top,left:props.left,right:props.right,cursor:"pointer",zIndex:'3'}} onClick={handlelink}></i>
    )
}

export default HomeButtonComponent;