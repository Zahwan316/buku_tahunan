import React, { useState, useEffect, Fragment } from 'react';
import AddBookComponent from './add_edit_book';

const EditBookModalComponent = (props) => {
    const[editmodalvisible,seteditmodalvisible] = useState(false);

    const handleopenmodal = () => {
        seteditmodalvisible(true)
    }

    const handleclosemodal = () => {
        seteditmodalvisible(false)
    }

    return(
        <Fragment>
        <div>
             <i className="fa-solid fa-pen-to-square h3" action="edit" onClick={handleopenmodal}></i>
        </div>
        {
            editmodalvisible &&
            <AddBookComponent close={handleclosemodal} />

        }
        </Fragment>
    )
}

export default EditBookModalComponent;