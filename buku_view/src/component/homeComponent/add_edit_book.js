import React, { useState, useEffect,Fragment } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddBookComponent = (props) => {
    const[data,setData] = useState({
        judul:"",
        img:"",
        slug:""
    })
    const[previewimg,setpreviewimg] = useState();
    const[showAddMenu,setShowAddMenu] = useState(true);
    const[imgshow,setimgshow] = useState(false);
    const[responsemsg,setresponsemsg] = useState();
    const[notifmsg,setnotifmsg] = useState(false);
    const[errmsg,seterrmsg] = useState();
    const navigate = useNavigate();
    const[oldimg,setoldimg] = useState();
    const[previewoldimg,setpreviewoldimg] = useState(true);
    const[kode,setkode] = useState(props.kode)
    const[loading,setloading] = useState(true)

    useEffect(() => {
        const getimg = async() => {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/buku/getimg/${props.kode}`);
                //setData({judul:response.data.data_buku[0].judul,slug:response.data.data_buku[0].slug})
                //setoldimg(response.data.data_buku[0].judul)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setloading(false)
            }
        }
        props.type === "edit" &&
        getimg();
    },[])

    const handleForm = (e) => {
        setData({...data,[e.target.name]:e.target.value})
        //setData({slug:data.judul.toUpperCase})
    }

    const handleImg = (e) => {
        setData({...data,img:e.target.files[0]})
        setpreviewimg(URL.createObjectURL(e.target.files[0]))
        setimgshow(true)
        setpreviewoldimg(false);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img",data.img);
        formData.append("judul",data.judul);
        formData.append("slug",data.slug);
        axios.post("http://127.0.0.1:8000/api/buku/tambah",formData,{
            "Content-Type" : "multipart/form-data"
        })
        .then(response => {
            console.log(response);
            setresponsemsg(response.data.message)
            setShowAddMenu(false)
            setnotifmsg(true)
        })
        .catch(error => {
            console.log(error);
            seterrmsg(error.data)
        })

    }
    const handleEditSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData();
        formdata.append("img",data.img);
        formdata.append("judul",data.judul)

        axios.post(`http://127.0.0.1:8000/api/buku/edit/${props.kode}`,formdata)
        .then(response => {
            console.log(response);
            setresponsemsg(response.data.message)
            setShowAddMenu(false)
            setnotifmsg(true)
        })
        .catch(error => {
            console.log(error);
            seterrmsg(error.data)
        })
    }

    useEffect(() => {
         console.log(props.code)
    })

    const handleCloseNotif = () => {
        setnotifmsg(false);
        window.location.reload()
    }

    return(
        <Fragment>
       <div>
       {
        notifmsg && 
            <div className="modal" style={{display:"block"}}>
                <div className='modal-dialog'>
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h4>Alert</h4>
                        </div>
                        <div className='modal-body d-flex justify-content-center flex-column align-items-center'>
                            <i className="fa-regular fa-circle-check h1 text-success"></i>
                            {
                                responsemsg && 
                                <h5>{responsemsg}</h5>
                            }
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleCloseNotif}>Close</button>
                        </div>
                    </div>
                </div>
        </div>
       }

        {/* Main Add Book */}
        {
            showAddMenu &&
            <div className="modal" tabIndex="-1" style={{display:"block"}}>
            <div className="modal-dialog ">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.type === "add" ? "Tambah Buku" : `Edit Buku ${props.kode}`} </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={props.type === "add" ? handleUpload : handleEditSubmit}>
                    <div className="modal-body">
                       {
                        // !loading && 
                        props.type === "edit" ?
                        <Fragment>
                            <ul>
                                <li className="d-flex flex-column mb-3">
                                    <label>Judul Buku</label>
                                    <input type="text" onChange={handleForm} name="judul" value={data.judul} className="form-control" />
                                </li>
                                <li className="d-flex flex-column mb-3">
                                    <label>Slug Buku</label>
                                    <input type="disabled" onChange={handleForm} name="slug" value={data.slug} className="form-control" id="slug" />
                                </li>
                                <li className="d-flex flex-column">
                                    <label>Gambar</label>
                                    <input accept="image/*" type="file" onChange={handleImg} />
                                </li>
                                <li className="d-flex flex-column">
                                    {
                                        imgshow &&
                                        <img src={previewimg} style={{height:"30vh",width:"25vw"}} className="mt-2">
                                        </img>
                                    }
                                   {/*  {
                                        previewoldimg && props.type === "edit" ?
                                        <img src={oldimg} style={{height:"30vh",width:"25vw"}} className="mt-2">
                                        </img>
                                        :
                                        ""
                                    } */}
                                </li>
                            </ul>

                        </Fragment>
                        :
                        ( props.type === "add")?
                        <Fragment>
                        <ul>
                            <li className="d-flex flex-column mb-3">
                                <label>Judul Buku</label>
                                <input type="text" onChange={handleForm} name="judul" value={data.judul} className="form-control" />
                            </li>
                            <li className="d-flex flex-column mb-3">
                                <label>Slug Buku</label>
                                <input type="disabled" onChange={handleForm} name="slug" value={data.slug} className="form-control" id="slug" />
                            </li>
                            <li className="d-flex flex-column">
                                <label>Gambar</label>
                                <input accept="image/*" type="file" onChange={handleImg} />
                            </li>
                            <li className="d-flex flex-column">
                                {
                                    imgshow &&
                                    <img src={previewimg} style={{height:"30vh",width:"25vw"}} className="mt-2">
                                    </img>
                                }
                               {/*  {
                                    previewoldimg && props.type === "edit" ?
                                    <img src={oldimg} style={{height:"30vh",width:"25vw"}} className="mt-2">
                                    </img>
                                    :
                                    ""
                                } */}
                            </li>
                        </ul>

                    </Fragment>
                        :
                        <p>loading</p>
                       }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.close}>Close</button>
                        <button type="submit" className="btn btn-primary">{props.type === "add" ? "Tambah" : "Edit"}</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        }
            
        

       </div>
           
     </Fragment>
    )
    
}

export default AddBookComponent;