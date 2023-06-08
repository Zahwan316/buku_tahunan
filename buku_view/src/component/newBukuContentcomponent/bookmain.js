import React, { useState, useEffect } from 'react';
import FlipBookComponent from './flipbook';
import { useParams } from 'react-router-dom';
import AddContent from '../bukuComponent/addcontent';
import HomeButtonComponent from '../bukucontentComponent/exithome';

const BookFlipComponent = (props) => {
    const{slug} = useParams();
    const[visibleModal,setVisibleModal] = useState(false);

    const handleOpenModal = () => {
        setVisibleModal(true)
    }

    const handleCloseModal = () => {
        setVisibleModal(false)
    }

    return(
        <div className='bg-dark w-100 d-flex justify-content-center align-items-center flex-column' style={{height:"100vh",width:"100vw"}}>
           <HomeButtonComponent left='0' top='0' userpage={props.userpage} />
           
            <FlipBookComponent userpage={props.userpage}/>
            <div className='mt-4 d-flex align-items-center'>
               {/*  <button className='btn btn-primary mx-2'>prev</button>
                <button className='btn btn-primary'>next</button> */}
            {
                props.userpage == "admin" &&
                <i className="fa-solid fa-circle-plus h1 text-white " onClick={handleOpenModal} style={{cursor:"pointer"}}></i>
            }
            </div>

            {
                visibleModal &&
                <AddContent type="add" slug={slug} closemodal={handleCloseModal} />
            }
        </div>
    )

}

export default BookFlipComponent;