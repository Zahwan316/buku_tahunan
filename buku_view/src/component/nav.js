import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarComponent = (props) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const handleLink = () => {
    navigate("/login");
  };

  const homeLink = () => {
    props.userpage == "admin"
      ? //navigate("/admin/")
        (window.location.href = "/admin/")
      : //navigate("/")
        (window.location.href = "/");
  };

  const handleLogout = () => {
    axios
      .post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.clear();
      })
      .catch((error) => console.log(error.response));

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    /*   <nav className="bg-dark navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">Buku Tahunan</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active text-primary" onClick={homeLink} aria-current="page" style={{cursor:'pointer'}}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="text-white d-flex align-items-center justify-content-center"> 
                        <button className='btn btn-primary' onClick={handleLink}>Login</button> 
                    </li>
                    </ul>
                
                </div>
            </div>
      </nav>
 */
    <nav className="navbar navbar-expand-xl navbar-light bg-light px-5">
      <a href="#" className="navbar-brand">
        Buku <b>T</b>ahunan
      </a>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarCollapse"
        className="collapse navbar-collapse justify-content-start"
      >
        <div className="navbar-nav">
          <a href="/" className="nav-item nav-link active">
            Home
          </a>
        </div>
        <div className="navbar-nav ml-auto">
          {username ? (
            <div className="nav-item dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle user-action"
              >
                <img
                  src="img/guess.png"
                  className="avatar"
                  alt="Avatar"
                  style={{ width: "36px", height: "30px", borderRadius: "50%" }}
                />{" "}
                {username} <b className="caret"></b>
              </a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  <i className="fa fa-user-o"></i> Profile
                </a>
                <div className="dropdown-divider"></div>
                <a
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                >
                  <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </a>
              </div>
            </div>
          ) : (
            <div>
              <button className="btn btn-primary" onClick={handleLink}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
