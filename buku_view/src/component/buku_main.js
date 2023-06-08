import React, { useState, useEffect } from 'react';
import BookPage from './bukuComponent/bookPage';

const BukuMainComponent = (props) => {
    return(
        <div>
            <BookPage userpage={props.userpage} />

        </div>
    )
}

export default BukuMainComponent;