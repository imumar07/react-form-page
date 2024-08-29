import React from "react";
import "./BuildForm.css";
import { DiGoogleCloudPlatform } from "react-icons/di";
import { DiNginx } from "react-icons/di";
import { FaReact,FaNode } from "react-icons/fa";
import logo from "../../assets/college_logo.svg";
import vite from "../../assets/react.svg";

const BuildForm = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="college-logo-div" style={{ alignSelf: "center" }}>
        <img src={logo} alt="logo" className="college-logo" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div className="custom-form-container custom">
          <p>Name: Syed Umar</p>
          <p>Branch: CAI</p>
          <p>Roll no: 21A81A43565</p>
        </div>
        <div className="custom-form-container custom">
          <p>Name: Pilli Suresh</p>
          <p>Branch: CAI</p>
          <p>Roll no: 21A81A43549</p>
        </div>
        <div className="custom-form-container custom">
          <p>Name: Kodamanchili Varun</p>
          <p>Branch: CAI</p>
          <p>Roll no: 21A81A43523</p>
        </div>
        <div className="custom-form-container custom">
          <p>Name: Siva Teja Cherukupalli</p>
          <p>Branch: CAI</p>
          <p>Roll no: 21A81A43511</p>
        </div>
      </div>
      <h1 style={{ color: "white", marginTop: "1rem", marginBottom: "1rem" }}>
        Technologies Used
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div className="custom-form-container custom">
        <div className=" size">
            <FaReact className="logo" />
            <p>React</p>
          </div>
        </div>
        <div className="custom-form-container custom">
          <div className=" size">
            <DiGoogleCloudPlatform className="logo" />
            <p>Google Cloud</p>
          </div>
        </div>
        <div className="custom-form-container custom">
        <div className=" size">
            <FaNode className="logo" />
            <p>Node js</p>
          </div>
        </div>
        <div className="custom-form-container custom">
        <div className=" size">
            <DiNginx className="logo" />
            <p>Nginx</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildForm;
