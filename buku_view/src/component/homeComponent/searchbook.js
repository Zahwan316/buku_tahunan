import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


const SearchBookComponent = (props) => {
    const[databook,setdatabook] = useState();
    const[formsearch,setformsearch] = useState();
    const navigate = useNavigate();
   
    const handleform = (e) => {
        setformsearch(e.target.value)
        console.log(formsearch)
    }

    const submitform = (e) => {
        e.preventDefault();

        props.userpage == "admin" ?
        window.location.href = `/admin/search/${formsearch}`
        :
        window.location.href = `/search/${formsearch}`
    }

    return(
        <div className='mb-5' style={{height:"20vh"}}>
            <form onSubmit={submitform}>
                <h2>Cari Buku</h2>
                <input type='text' name="search" onChange={handleform} value={formsearch} className='form-control mb-2 w-100' />
                <button type="submit" className='btn btn-primary'>Cari</button>
            </form>
        </div>
    )
}

export default SearchBookComponent;