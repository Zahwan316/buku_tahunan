import React, { useState, useEffect } from "react";
import BookComponent from "./book";
import AddBookComponent from "./add_edit_book";
import axios from "axios";
import EditBookModalComponent from "./editbookmodal";
import { useLocation } from "react-router-dom";

const Bookshelf = (props) => {
  const [dataBuku, setData] = useState([]);
  const [kodebuku, setkodebuku] = useState();
  const [judul, setJudul] = useState(props.judul);
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/buku/");
        console.log(response.data);
        setData(response.data.data_buku);
      } catch (error) {
        console.log(error);
      }
    };

    const getDataSearch = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/buku/search/${judul}`
        );
        console.log(response.data);
        setData(response.data.data_buku);
      } catch (error) {
        console.log(error);
      }
    };
    props.page == "search" ? getDataSearch() : getData();
  }, [judul]);

  const handlegetkodebuku = (kode) => {
    setkodebuku(kode);
  };

  const sendtohome = () => {
    props.getkode(kodebuku);
  };
  useEffect(() => {
    sendtohome();
  });

  return (
    <div>
      <div className="d-flex flex-wrap" style={{ gap: "48px" }}>
        {dataBuku.map((item, index) => (
          <BookComponent
            key={index}
            img={item.img}
            text={item.judul}
            userpage={props.userpage}
            slug={item.slug}
            notifdelete={props.notifdelete}
            editmodal={props.editmodal}
            kode_buku={item.kode_buku}
            getkodebuku={handlegetkodebuku}
            page={props.page}
          />
        ))}

        {
          props.userpage == "admin" && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: "10vw", height: "40vh" }}
            >
              <i
                className="fa-solid fa-circle-plus h1 text-white"
                style={{ cursor: "pointer" }}
                onClick={props.addmodal}
              ></i>
            </div>
          )
          /*  <AddBookComponent userpage={props.userpage} /> */
        }
      </div>
    </div>
  );
};

export default Bookshelf;
