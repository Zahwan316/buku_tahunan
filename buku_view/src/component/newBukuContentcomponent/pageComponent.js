import React, { useState, useEffect,Ref,Fragment } from 'react';
import AddContent from '../bukuComponent/addcontent';
import DeleteContentComponent from '../bukucontentComponent/deletecontent';
import ModalEdit from '../bukucontentComponent/editcontent';
import "../style/page.css"

const PageBook = React.forwardRef((props,ref) => {
    return(
        <div ref={ref} className="border page" style={{ boxShadow: "inset -7px 0 30px 0 rgba(0, 0, 0, 0.5)"}}>
            {/* page main */}
            <div className='bg-white' style={{width:"100%",height:props.userpage == "admin" ? "95%" : "100%"}}>
                <img src={props.img} className='page' style={{width:"100%",height:"100%"}}></img>
            </div>

            {/* Admin Action */}
            <div className='d-flex bg-white'>
                {/* <span>{props.page}</span> */}
            {
                props.userpage == "admin" &&
                <Fragment>
                    <DeleteContentComponent code={props.code}/>
                    <ModalEdit code={props.code}  slug={props.slug} />
                </Fragment>
            
            }
            </div> 
            
            {/* <div>
                <p className='h5'>Page : {props.page}</p>
            </div> */}
        </div>
    )
})

export default PageBook;