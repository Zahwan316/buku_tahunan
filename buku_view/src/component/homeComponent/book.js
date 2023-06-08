import React, { useState, useEffect,Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import modalNotif from './notifmodal';
import EditBookModalComponent from './editbookmodal';

const BookComponent = (props) => {
    const navigate = useNavigate();
    const [kodebuku,setkodebuku] = useState(props.kode_buku);
  

    const handleDelete = (e) => {
      /*  let attr = e.target.getAttribute("action");
       attr === "delete" ?
        navigate("/book")
        :
        navigate("") */


        axios.get(`http://127.0.0.1:8000/api/buku/delete/${props.slug}`)
        .then(response => response.data)
        .catch(error => console.log(error))


    }

    const handleOpenBook = () => {
        props.page === 'search'?
        window.location.href = `../buku/${props.slug}`
        :
        navigate(`buku/${props.slug}`)
    }

    const klikdatabuku = () => {
        props.getkodebuku(kodebuku)
    }


    return(
        <Fragment>
        <div className="book bg-dark card hover shadow position-relative" style={{height:"48vh"}}>
            <div className="img-container"  onClick={handleOpenBook}>
                <img src={props.img} />
            </div>
            <h3 className="text-center lead position-absolute bottom-0 font-weight-bold" style={{bottom:0,textAlign:"center"}}>{props.text}</h3>
            {
                props.userpage === "admin" &&
                <div className="position-absolute d-flex justify-content-center align-items-center" style={{top:"-5vh"}}>               
                     <i className="fa-regular fa-trash-can h3 mr-2" onClick={() => {props.notifdelete();klikdatabuku()}} action="delete"></i>                  
                     <i className="fa-solid fa-pen-to-square h3" action="edit" onClick={() => {props.editmodal();klikdatabuku()}}></i>
                     {/* <EditBookModalComponent editmodal={props.editmodal}/>  */}
                </div>
            }
        </div>
        </Fragment>
    )
}

export default BookComponent;