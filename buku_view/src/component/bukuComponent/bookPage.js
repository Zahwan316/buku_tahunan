import React, { useState, useEffect, useRef, Fragment } from "react";
import "../style/book.css";
import CommentPage from "./commentPage";
import AddContent from "./addcontent";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteContentComponent from "../bukucontentComponent/deletecontent";
import ModalEdit from "../bukucontentComponent/editcontent";
import HomeButtonComponent from "../bukucontentComponent/exithome";

const BookPage = (props) => {
  const [bookContent, setBookContent] = useState([{}]);

  const [pageindex, setpageindex] = useState(0);

  const [pageindexright, setpageindexright] = useState(1);

  const [isActivePageRight, SetIsActivePageRight] = useState(false);

  const [isVisibleRight, setIsVisibleRight] = useState(true);

  const [isVisibleLeft, setIsVisibleLeft] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const [displaynone, setdisplaynone] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [anmbook, setanmbook] = useState("");

  const [reversebook, setreversebook] = useState("");

  const [editmodal, seteditmodal] = useState(false);

  const [commentdata, setcommentdata] = useState("");

  const { slug } = useParams();

  //const[codeContent,setCodeContent] = useState(bookContent.length >0 ? bookContent[pageindex].code_content : null)

  useEffect(() => {
    const getdata = async () => {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/buku_content/${slug}`
      );
      console.log(response.data);
      setBookContent(response.data.data_buku);
    };
    getdata();
  }, []);

  useEffect(() => {
    console.log("current index = " + pageindex);
    console.log("current index right = " + pageindexright);

    if (pageindex >= bookContent.length - 2) {
      //setIsVisibleRight(false)
      setIsVisibleLeft(true);
    } else if (pageindex <= 0) {
      setIsVisibleLeft(false);
      setIsVisibleRight(true);
    } else {
      setIsVisibleLeft(true);
      setIsVisibleRight(true);
    }
    //

    if (pageindex >= bookContent.length) {
      setpageindex(bookContent.length);
    }
    if (pageindexright >= bookContent.length) {
      setpageindexright(bookContent.length);
    }

    //
    if (pageindex > 0) {
      SetIsActivePageRight(true);
    } else {
      SetIsActivePageRight(false);
    }

    if (pageindexright > bookContent.length - 1) {
      SetIsActivePageRight(false);
    }
  });

  const handleChangePage = (e) => {
    const key_btn = e.target.getAttribute("btn_key");
    if (key_btn == "left") {
      if (pageindex > 1) {
        setpageindex(pageindex - 2);
        setpageindexright(pageindexright - 2);
      } else {
        setpageindex(pageindex - 1);
        setpageindexright(pageindexright - 1);
      }

      if (pageindex == bookContent.length) {
        if (bookContent.length == 1) {
          setpageindex(pageindex - 1);
        } else {
          if (bookContent.length < 3) {
            setpageindex(pageindex - 1);
          } else {
            setpageindex(pageindex - 2);
          }
        }
      }

      setIsOpen(!isOpen);
      if (pageindexright == bookContent.length) {
        setpageindexright(pageindexright - 1);
      }
    } else {
      if (pageindex >= 1) {
        setpageindex(pageindex + 2);
        setpageindexright(pageindexright + 2);
      } else {
        setpageindex(pageindex + 1);
        setpageindexright(pageindexright + 1);
      }
      setIsOpen(!isOpen);
    }

    setanmbook("anmbook");
    setTimeout(() => {
      setanmbook("");
    }, 1200);

    setreversebook("reversebook");
    setTimeout(() => {
      setreversebook("");
    }, 1200);
  };

  const handleOpenModal = (e) => {
    const typebtn = e.target.getAttribute("typebtn");

    if (typebtn === "edit") {
      seteditmodal(true);
    } else {
      setModalIsOpen(true);
    }
  };

  const handleCloseModal = (e) => {
    seteditmodal(false);
    setModalIsOpen(false);
  };

  const handleChildComment = (comment) => {
    setcommentdata(comment);
  };

  return (
    <div
      className="w-100 bg-dark d-flex justify-content-center align-items-center position-relative"
      style={{ height: "100vh" }}
    >
      <span
        className={`position-absolute text-white h2`}
        style={{ bottom: 0 }}
      >{`${
        pageindex > 0 && pageindex < bookContent.length
          ? pageindex + "-" + pageindexright
          : pageindex == bookContent.length
          ? pageindex
          : pageindex
      }/${bookContent.length}`}</span>
      <HomeButtonComponent top="0" left="0" userpage={props.userpage} />
      <i
        className={`fa-regular fa-circle-left h2 position-absolute text-white ${
          isVisibleLeft ? "d-flex" : " d-none"
        }`}
        style={{ left: 0, cursor: "pointer" }}
        btn_key="left"
        onClick={handleChangePage}
      ></i>

      {/* Kertas Bagian Kanan */}
      <div
        className={`book-main card  position-relative ${anmbook} ${
          pageindex == bookContent.length ? "d-none" : ""
        }`}
        style={{ height: "80vh", width: "30vw", zIndex: "3" }}
      >
        <img
          src={
            pageindex >= bookContent.length ? "" : bookContent[pageindex].img
          }
          className="rounded w-100 h-100"
        />
      </div>

      {/*Kertas bagian Kiri  */}
      {isActivePageRight ? (
        <Fragment>
          <div
            className={`book-main card position-relative ${reversebook}`}
            style={{ height: "80vh", width: "30vw" }}
          >
            <img
              src={
                pageindexright >= bookContent.length
                  ? ""
                  : bookContent[pageindexright].img
              }
              className="rounded w-100 h-100"
            />
          </div>
        </Fragment>
      ) : (
        ""
      )}

      {/* Button tambah */}
      {props.userpage === "admin" && pageindex == bookContent.length ? (
        <i
          className="fa-solid fa-circle-plus position-absolute h2 text-white mx-2"
          typebtn="add"
          onClick={handleOpenModal}
          style={{ cursor: "pointer" }}
        ></i>
      ) : (
        ""
      )}

      {/* Button Delete and Edit Logic */}
      {props.userpage == "admin" &&
      pageindex > 0 &&
      pageindex <= bookContent.length ? (
        <Fragment>
          {bookContent.map((items, index) => (
            /* Button Delete */
            <Fragment>
              {index === pageindex && (
                <DeleteContentComponent
                  top="0"
                  left="30vw"
                  code={items.code_content}
                  pos="absolute"
                />
              )}
              {index === pageindexright && (
                <DeleteContentComponent
                  top="0"
                  left="70vw"
                  code={items.code_content}
                  pos="absolute"
                />
              )}

              {/* Button Edit */}
              {index === pageindex && (
                <ModalEdit code={items.code_content} slug={slug} left="35vw" />
              )}
              {index === pageindexright && (
                <ModalEdit code={items.code_content} slug={slug} left="65vw" />
              )}
            </Fragment>
          ))}
        </Fragment>
      ) : props.userpage == "admin" && pageindex == 0 ? (
        <Fragment>
          <div
            className="d-flex justify-content-center align-items-center position-absolute"
            style={{ width: "100%", top: 0 }}
          >
            {bookContent.map(
              (items, index) =>
                index == pageindex && (
                  <Fragment>
                    <DeleteContentComponent top="0" code={items.code_content} />
                    <ModalEdit code={items.code_content} slug={slug} />
                  </Fragment>
                )
            )}
          </div>
        </Fragment>
      ) : (
        ""
      )}

      {/* modal edit */}
      {editmodal ? (
        <AddContent type="edit" closemodal={handleCloseModal} />
      ) : (
        ""
      )}

      {/* Modal Tambah */}
      {modalIsOpen ? (
        <AddContent type="add" closemodal={handleCloseModal} slug={slug} />
      ) : (
        ""
      )}

      {/*   pageindex >= bookContent.length - 1 && bookContent.length > 1?
              <Fragment>
                <CommentPage page="1" handlechangedata={handleChildComment} /> 
                {
                    commentdata.length >= 4?
                    <CommentPage page="1" handlechangedata={handleChildComment} />
                    :
                    ""
                }
                
              
              </Fragment>
                :
                ""  */}

      <i
        className={`fa-solid fa-circle-right h2 position-absolute text-white ${
          isVisibleRight ? "d-flex" : " d-none"
        }`}
        style={{ right: 0, cursor: "pointer" }}
        btn_key="right"
        onClick={handleChangePage}
      ></i>
    </div>
  );
};

export default BookPage;
