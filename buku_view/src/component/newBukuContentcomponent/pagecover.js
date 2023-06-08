import React, { useState, useEffect } from 'react';
import '../style/page.css'

const PageCover = React.forwardRef((props,ref) => {
    return(
        <div ref={ref} className='page'>
            <div className='h-100'>
                <img src={props.img} style={{width:"100%",height:"100%"}}></img>
                <h2 className='position-absolute text-white' style={{bottom:0}}>{props.children}</h2>
            </div>
        </div>
    )
})

export default PageCover;