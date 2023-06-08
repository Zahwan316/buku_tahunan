import React, { useState, useEffect } from 'react';
import axios from "axios";

const ModalNotif = (props) => {
    const[visible,setVisible] = useState(true);
    const[visiblemsg,setvisiblemsg] = useState(false)
    const[responsemsg,setresponsemsg] = useState()
    const[errormsg,seterrormsg] = useState()

    const handleDeleteBook = () => {
        axios.delete(`http://127.0.0.1:8000/api/buku/delete/${props.kode}`)
        .then(response => {
            console.log(response);
            setvisiblemsg(true);
            setVisible(false)
            setresponsemsg(response.data.message)
        })
        .catch(error =>{
             console.log(error);
             seterrormsg(error.response.data.message)
            })
    }

    const handleDeleteContent = () => {
        axios.delete(`http://127.0.0.1:8000/api/buku_content/delete/${props.kode}`)
        .then(response => {
            console.log(response);
            setvisiblemsg(true);
            setVisible(false)
            setresponsemsg(response.data.message)
        })
        .catch(error =>{
             console.log(error);
             seterrormsg(error.response.data.message)
            })
    }

    const handleVisiblemsg = () => {
        setvisiblemsg(false)
        window.location.reload()
    }

    return(     
            <div className="modal" tabIndex="-1" style={{display:"block"}}>
                {
                visible &&
                <div className="modal-dialog text-white">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title">Peringatan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                       
                        <div className="modal-body">
                               <p className="h5">Apakah Anda Yakin Ingin Menghapus Buku Ini? kode: {props.kode}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.closenotifdelete} >Tidak</button>
                            <button type="submit" className="btn  btn-danger" onClick={props.page === "content"?handleDeleteContent : handleDeleteBook } >Hapus</button>
                        </div>
                        
                    </div>
                </div>
                }
                {
                    visiblemsg &&
                    <div className='modal-dialog text-white'>
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h4>Alert</h4>
                            </div>
                            <div className='modal-body d-flex justify-content-center flex-column align-items-center'>
                                {
                                    responsemsg == 'Data gagal dihapus' ?
                                    <i className="fa-regular fa-circle-xmark h1 text-danger"></i>
                                    :
                                    <i className="fa-regular fa-circle-check h1 text-success"></i>
                                }
                               
                                <p>{responsemsg}{errormsg}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleVisiblemsg}>Close</button>
                            </div>
                        </div>
            </div>
                }
             </div>
    )
} 

export default ModalNotif;