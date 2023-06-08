import React, { useState, useEffect } from 'react';

const TestComponent = () => {
    const[data,setData] = useState({
        username:"",
        password:""
    });

    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
        console.log(data)
    }

    return(
        <div>
            <input type="text" className="form-control" name="username" onChange={handleChange}/>
            <input type="password" className="form-control" name="password" onChange={handleChange}/>
        </div>
    )

}

export default TestComponent