import React, { useState, useEffect } from 'react';
import HomePage from '../home';

const AdminPage = (props) => {
    const role = localStorage.getItem("role");

    return(
        <div>
        {
            role === "admin" && props.userpage === "admin" ?
            <HomePage userpage={props.userpage} />
            :
            <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
                <h2>Anda Bukan Admin</h2>
            </div>
        }
        </div>
    )
}

export default AdminPage;