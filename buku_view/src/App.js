import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect,useRef } from 'react';
import HomePage from './component/home';
import { BrowserRouter,BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import LoginPage from './component/login';
import RegisPage from './component/regis';
import TestComponent from './component/test';
import BukuMainComponent from './component/buku_main';
import CommentPage from './component/bukuComponent/commentPage';
import FlipBookComponent from './component/newBukuContentcomponent/flipbook';
import BookFlipComponent from './component/newBukuContentcomponent/bookmain';
import AdminPage from './component/admin/admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* user route  */}
          <Route path="/" userpage="user" element={<HomePage userpage="user" page="home" />} />
          <Route path="/search/:judul" userpage="user" element={<HomePage userpage="user" page="search" />} />
          <Route path="/login" userpage="user" element={<LoginPage />} />
          <Route path="/register" userpage="user" element={<RegisPage />} />
          <Route path="/test" userpage="user" element={<TestComponent />} />
          <Route path="/buku/:slug" element={<BookFlipComponent userpage="user" />} />
          <Route path="/buku/:slug/comment" userpage="user" element={<CommentPage />} />
          {/* admin route */}
          {/* <Route path="/admin/buku/:slug" element={<BukuMainComponent userpage="admin" />} /> */}
          <Route path="/admin/buku/:slug" element={<BookFlipComponent userpage="admin" />} />
          <Route path="/admin/" element={<AdminPage userpage="admin" />} />
          <Route path="/admin/search/:judul" userpage="admin" element={<HomePage userpage="admin" page="search" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
