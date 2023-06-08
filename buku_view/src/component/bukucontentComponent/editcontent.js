import React, { useState, useEffect, Fragment } from 'react';
import AddContent from '../bukuComponent/addcontent';

const ModalEdit = (props) => {
    const[openmodal,setopenmodal] = useState(false);

    const handleOpenModal = () => {
        setopenmodal(true)
    }

    const handleCloseModal =() => {
        setopenmodal(false)
    }

    return(
        <Fragment>

        <div>
            <i className={`fa-solid fa-pen-to-square text-secondary h2 mx-2`} onClick={handleOpenModal} typebtn="edit" style={{top:0,left:props.left,cursor:"pointer"}}></i>
        </div>
        {
            openmodal && 
            <AddContent 
            type="edit"
            closemodal={handleCloseModal}
            code={props.code}
            slug={props.slug}
             />
        }
        </Fragment>
    )
}

export default ModalEdit