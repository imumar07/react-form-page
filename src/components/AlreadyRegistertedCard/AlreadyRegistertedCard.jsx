// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import logo from "../../assets/college_logo.svg";
import { FaCheckCircle } from "react-icons/fa";
import Api from "../../data/ApiData";
import axios from 'axios';

const AlreadyRegisteredCard = () => {
  const [passUrl, setPassUrl] = useState("");

  useEffect(() => {
    const storedPassUrl = sessionStorage.getItem("pass_url");
    if (storedPassUrl) {
      setPassUrl(storedPassUrl);
    } else {
      console.log("Fetching pass URL from the server");
      axios.get(`${Api}/get_pass_url`, {
        params: {
          roll_no: sessionStorage.getItem("roll_no"),
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setPassUrl(response.data.pass_url);
            sessionStorage.setItem("pass_url", response.data.pass_url);
          }
        })
        .catch((error) => {
          console.error("Error in GET request:", error);
        });
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingBottom: "10rem",
      }}
    >
      <div className="college-logo-div" style={{ alignSelf: "center" }}>
        <img src={logo} alt="logo" className="college-logo" />
      </div>
      <div className="custom-form-container">
        <h1
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.3rem",
            gap: "10px",
          }}
        >
          <FaCheckCircle /> Response Submitted
        </h1>
        <div className="submit-btn">
          <button type="button" >
            <a href={passUrl} target="_blank" rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Download Pass
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlreadyRegisteredCard;
