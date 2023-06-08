import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ModalNotif from '../homeComponent/notifmodal';

const DeleteContentComponent = (props) => {
    const[deletemodal,setdeletemodal] = useState(false)

    const handleClick = () => {
        axios.delete(`http://127.0.0.1:8000/api/buku_content/delete/${props.code}`)
        .then(response => console.log(response))
        .catch(error => console.log(error))

        alert(`content dengan kode ${props.code} berhasil dihapus`)
    }

    const handleopenmodal = () => {
        setdeletemodal(true);
    }

    const handleclosemodal = () => {
        setdeletemodal(false);
    }

    return(
        <Fragment>
        <div>
            <i className={`fa-regular fa-trash-can text-danger mx-2 h2 ${props.pos === 'absolute' && "position-absolute"}`} onClick={handleopenmodal} style={{top:props.top,left:props.left,right:props.right,cursor:"pointer"}} ></i>
        </div>
        {
            deletemodal &&
            <ModalNotif
             kode={props.code}
             closenotifdelete={handleclosemodal}
             page="content"
             />
        }
        </Fragment>
    )
}

export default DeleteContentComponent