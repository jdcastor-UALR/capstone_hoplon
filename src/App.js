import React from "react";
import { Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import AssistantPage from "./components/AssistantPage/AssistantPage";
import SetupPage from "./components/SetupPage/SetupPage";
import LoginPage from "./components/LoginPage/LoginPage";
import {styleWrapper} from "./StyleWrapper";
import './App.css'

function App() {
  return (
    <>
      <MainNavbar/>
      <div className={'content'}>
        <Routes>
          <Route path={'/'} element={<AssistantPage />} />
          <Route path={'/setup'} element={<SetupPage />} />
          <Route path={'/login'} element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default styleWrapper(App);
