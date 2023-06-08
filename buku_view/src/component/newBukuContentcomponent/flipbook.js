import React, { useState, useEffect,useRef, Fragment } from 'react';
import HTMLFlipBook from 'react-pageflip';
import PageBook from './pageComponent';
import { useParams } from 'react-router-dom';
import axios from "axios";
import PageCover from './pagecover';

const FlipBookComponent = (props) => {
    const[bookContent,setBookContent] = useState([])
    const[bookCover,setBookCover] = useState([{}]);
    const{slug} = useParams();
    const[page,setPage] = useState();
    const book = useRef()

    useEffect(() => {
        const getdata = async() => {
            let response = await axios.get(`http://127.0.0.1:8000/api/buku_content/${slug}`);
            let response2 = await axios.get(`http://127.0.0.1:8000/api/buku/getcover/${slug}`)
            console.log(response.data)
            console.log(response2.data)
            setBookContent(response.data.data_buku);
            setBookCover(response2.data.data_buku);
        }
        getdata(); 
    },[])

    const onFlip = (data) => {
        setPage(data);
        console.log(page);
        const audio = new Audio();
        if(props.userpage == "admin"){
            audio.src = "../../audio/page.mp3";
        }
        else{
            audio.src = "../audio/page.mp3";
        }
        
        audio.play();
    }

    return(
        <Fragment>    
            <HTMLFlipBook 
            width={props.userpage == "admin" ? 500 : 600} 
            height={props.userpage == "admin" ? 560 : 600} 
            maxShadowOpacity={0.6}
            mobileScrollSupport={true}
            style={{ boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"}}
            className="bg-white"
            showCover = "true"
            ref={book}
            
            onFlip={(e) => onFlip(e.data)}
            >
                <PageCover img={bookCover[0].img}>{bookCover[0].judul}</PageCover>
                <p>{page}</p>
                {
                    bookContent.map((items,index) => 
                    <PageBook img={items.img} userpage={props.userpage} page={page} slug={slug} code={items.code_content}/>
                    )
                } 
               
            </HTMLFlipBook>
        </Fragment>
    )
}

export default FlipBookComponent;