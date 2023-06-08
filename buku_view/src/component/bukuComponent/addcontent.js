import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddContent = (props) => {
    const[data,setData] = useState({
        img:"",
        slug:props.slug
    });
    const[showimg,setshowimg] = useState(false);
    const[previewimg,setpreviewimg] = useState();
    const[shownotif,setshownotif] = useState(false);
    const navigate = useNavigate();
    const[datamodalisopen,setdatamodalisopen] = useState(true) ;
    const[errormsg,setError] = useState();
    const[responsemsg,setresponsemsg] = useState();
    const[oldimgdata,setoldimgdata] = useState();
    const[oldImgPreview,setOldImgPreview] = useState(true);

    /* Get Old Data IMG */
    useEffect(() => {
        const getDataImg = async() => {
            let response = await axios.get(`http://127.0.0.1:8000/api/buku_content/getimg/${props.code}`);
            setoldimgdata(response.data.data_buku[0].img)
        }
        props.type == "edit" &&
        getDataImg()
    },[]);

    /* Add Submit */
    const handleAddSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData();

        formdata.append('img',data.img)
        formdata.append('slug',data.slug)

        /* Api main */
        axios.post(`http://127.0.0.1:8000/api/buku_content/tambah`,formdata,{
            "Content-Type" : "multipart/form-data"
        })
        .then(response => {
            console.log(response);
            setresponsemsg(response.data.message)

        })
        .catch(error =>{ 
            console.log(error);
            setError(error.response.data.message)
        });

        if(!errormsg){
            setTimeout(() => {
                handleOpenNotif();
                setdatamodalisopen(false)

            },500)

        }
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData();      
        formdata.append('img',data.img)
        formdata.append('slug',data.slug)


        axios.post(`http://127.0.0.1:8000/api/buku_content/edit/${props.code}`,formdata,{
            "Content-Type" : "multipart/form-data",
            
        })
        .then(response => {
            console.log(response);
            setresponsemsg(response.data.message)
        })
        .catch(error =>{
            console.log(error);
            setError(error.response.data.message)
        })

        if(!errormsg){
            setTimeout(() => {
                handleOpenNotif();
                setdatamodalisopen(false)

            },500)

        }

    }

    /* If user Add Image  */
    const handleImg = (e) => {
        setData({...data,img:e.target.files[0]})
        setpreviewimg(URL.createObjectURL(e.target.files[0]))
        setshowimg(true)
        setOldImgPreview(false)
        
    }

    const handleOpenNotif = () => {
        setshownotif(true)
    }

    const handleclosenotif = () => {
        window.location.reload()
    }

    useState(() => {
       
    })

    return(
        <div>
            {/* Main Modal */}
            {
                datamodalisopen &&
                <div className="modal" tabIndex="-1" style={{display:"block"}}>
                <div className="modal-dialog text-white">
                    <div className="modal-content bg-dark">
                        <form onSubmit={props.type == "add"?handleAddSubmit : handleEditSubmit}>

                        <div className="modal-header">
                            <h5 className="modal-title">{props.type === "edit" ? `Edit Content  ${props.code}` : "Tambah Content"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                       
                                <ul>
                                    <li className="d-flex flex-column">
                                        <label>Gambar</label>
                                        <input type="file" name="img" onChange={handleImg} className="btn btn-primary" />
                                        {
                                            showimg && 
                                            <img src={previewimg} className="mt-3" style={{width:"30vw",height:"30vh"}} />
                                        }
                                        {
                                            oldImgPreview && props.type === "edit" ?
                                            <img src={oldimgdata} className="mt-3" style={{width:"30vw",height:"30vh"}} />
                                            :
                                            ""
                                        }
                                    </li>
                                </ul>
                        
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.closemodal}>Close</button>
                            <button type="submit" className="btn btn-primary">{props.type == "edit" ? "Edit" : "Add"}</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            }
           
           {/* notif after btn clicked */}
            {
                shownotif &&
                <div className="modal" tabIndex="-1" style={{display:"block"}}>

                <div className="modal-dialog text-white">
                <div className="modal-content bg-dark">
                   

                    <div className="modal-header">
                        <h5 className="modal-title">Peringatan</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{responsemsg}{errormsg}</p>
                    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleclosenotif} >Close</button>
                    </div>
                   
                </div>
                </div>
            </div>
            }

        </div>

        
    )
}

export default AddContent;