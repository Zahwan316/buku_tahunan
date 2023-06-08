import React, { useState, useEffect, Fragment } from "react";
import NavbarComponent from "./nav";
import Bookshelf from "./homeComponent/bookshelf";
import "./style/home.css";
import ModalNotif from "./homeComponent/notifmodal";
import AddBookComponent from "./homeComponent/add_edit_book";
import SearchBookComponent from "./homeComponent/searchbook";
import { useParams, useLocation } from "react-router-dom";

const HomePage = (props) => {
  const [data, setData] = useState();

  const [notifdeletevisible, setnotifdelete] = useState(false);
  const [editmodalvisible, seteditmodalvisible] = useState(false);
  const [openaddmodal, setopenaddmodal] = useState(false);
  const [kodebuku, setkodebuku] = useState();
  const { judul } = useParams();
  const location = useLocation();
  const isadmin = useState(false);
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role")

  const handleNotifDelete = () => {
    setnotifdelete(true);
  };

  const handleCloseNotifDelete = () => {
    setnotifdelete(false);
  };

  const handleditmodal = () => {
    seteditmodalvisible(true);
  };

  const handlecloseditmodal = () => {
    seteditmodalvisible(false);
  };

  const handleopenaddmodal = () => {
    setopenaddmodal(true);
  };

  const handlecloseaddmodal = () => {
    setopenaddmodal(false);
  };

  const getkodebuku = (kode) => {
    setkodebuku(kode);
  };

  useEffect(() => {});

  return (
    
    <Fragment>
      <NavbarComponent userpage={props.userpage} />
      <div
        className="container-fluid w-100 vh-100 text-white p-5"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right,#00000040,black),url('img/bgmain2.jpg')",
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <SearchBookComponent userpage={props.userpage} />

        {/* Notif Delete */}
        {notifdeletevisible && (
          <ModalNotif
            closenotifdelete={handleCloseNotifDelete}
            kode={kodebuku}
          />
        )}
        {/* edit modal */}
        {editmodalvisible && (
          <AddBookComponent
            type="edit"
            close={handlecloseditmodal}
            kode={kodebuku}
          />
        )}

        {/* add modal */}
        {openaddmodal && (
          <AddBookComponent type="add" close={handlecloseaddmodal} />
        )}
        <Bookshelf
          userpage={props.userpage}
          notifdelete={handleNotifDelete}
          editmodal={handleditmodal}
          addmodal={handleopenaddmodal}
          getkode={getkodebuku}
          judul={judul}
          page={props.page}
        />
      </div>
    </Fragment>
  );
};

export default HomePage;
