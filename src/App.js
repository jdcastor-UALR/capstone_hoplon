import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import AssistantPage from "./components/AssistantPage/AssistantPage";
import SetupPage from "./components/SetupPage/SetupPage";
import LoginPage from "./components/LoginPage/LoginPage";
import {styleWrapper} from "./StyleWrapper";
import './App.css'
import EditSolution from "./components/AssistantPage/EditSolution/EditSolution";
import {getToken} from "./auth";

function App() {
  return (
    <>
      <MainNavbar/>
      <div className={'content'}>
        <Routes>
          <Route path={'/'} element={getToken() ? <AssistantPage /> : <Navigate to={"/login"} />} />
          <Route path={'/edit/:solution_id'} element={getToken() ? <EditSolution /> : <Navigate to={"/login"} />} />
          <Route path={'/setup'} element={getToken() ? <SetupPage /> : <Navigate to={"/login"} />} />
          <Route path={'/login'} element={!getToken() ? <LoginPage /> : <Navigate to={"/"} />} />
        </Routes>
      </div>
    </>
  );
}

export default styleWrapper(App);
