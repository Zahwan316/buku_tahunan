import React, { useState, useEffect } from 'react';
import axios from "axios";



const CommentPage = (props) => {
    const[data,setData] = useState([]);
    const[commentform,addCommment] = useState("");
    let[currpage,setcurrpage] = useState(1);
    const[formvisible,setformvisible] = useState(true)

    const handleComment = (e) => {
        addCommment(e.target.value)
        console.log(commentform)
    }

    useEffect(() =>{
        const fetchData = async() => {
            let response = await axios.get("http://127.0.0.1:8000/api/comment/")
            console.log(response.data)
            setData(response.data.data_komen)
        }
        fetchData();
    },[])

    const submitComment = (e) => {
        e.preventDefault();

        let datacomment = {
            id:4,
            text:commentform,
            username:"guess",
            page:currpage,
        }

        if(data.length % 9 == 0){
            setcurrpage(prevpage => prevpage+1)
            datacomment = {
                id:4,
                text:commentform,
                username:"guess",
                page:currpage,
            }
            setformvisible(false)
        }

        setData([...data,datacomment])

        props.handlechangedata(data)

        console.log(currpage)
        console.log(data)
    }

    return(
        <div>
              <div className={`book-main card  position-relative p-2 `} style={{height:"80vh",width:"30vw",zIndex:"3"}}  >
             <h2>Motivation Quote</h2>
                 {
                    data.map((item,index) =>                      
                        <div className="comment">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src={item.img} alt="Avatar" className="img-fluid rounded-circle" />
                                </div>
                                <div className="col-md-10">
                                    <h4>{item.username}</h4>
                                    <p className="comment-text">{item.isi}</p>
                                </div>
                            </div>
                        </div>              
                    )
                } 

                
                {
                    formvisible ?
                    <div className="comment">
                        <div className="row">
                            <div className="col-md-2">
                                <img src="../img/bgmain.jpg" alt="Avatar" className="img-fluid rounded-circle" />
                            </div>
                            <div className="col-md-10">
                                <form onSubmit={submitComment}>
                                    <textarea name="comment" className='form-control mb-2' value={commentform} onChange={handleComment} style={{resize:"none",height:"10vh"}}></textarea>
                                    <button type="submit" className='btn btn-primary'>Kirim</button>
                                </form>
                            </div>
                        </div>
                     </div>
                    :
                    ""
                }
               
                </div>      
        </div>
    )

}

export default CommentPage;