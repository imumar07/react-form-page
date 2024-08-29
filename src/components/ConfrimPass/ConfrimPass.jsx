// eslint-disable-next-line no-unused-vars
import React from 'react';
import logo from "../../assets/college_logo.svg";
import { useNavigate } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import CircularProgress from "@mui/material/CircularProgress";
import { FaEdit } from "react-icons/fa";
import Api from "../../data/ApiData";
import axios from "axios";


const ConfrimPass = () => {
  const [loder, setLoder] = React.useState(false);
  const navigate = useNavigate();
  // Retrieve the stored attendees data and parse it
  const attendees = JSON.parse(sessionStorage.getItem("attendees")) || [];
  const handleReEnter = () => {
    navigate("/guestForm")
  }
  const handleConfrim = async () => {
    setLoder(true);
    // Determine if the attendees list is empty
    const isEmpty = attendees.length === 0;
    // Prepare the request payload
    const payload = {
      attendees: attendees,   // or just `attendees` if ES6 shorthand is used
      empty: isEmpty,
    };

    const roll_no = sessionStorage.getItem("roll_no");
    const name = sessionStorage.getItem("name");
    const branch = sessionStorage.getItem("branch");
    const program = sessionStorage.getItem("program");
    const batch = sessionStorage.getItem("batch");


    await axios
      .post(`${Api}/insert_attendees`, {
        roll_no: roll_no,
        name: name,
        branch: branch,
        program: program,
        batch: batch,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("success");
        } else {
          console.error("Failed to insert attendee:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error in POST request:", error);
      });

    await axios
      .post(`${Api}/insert_guests`, payload)
      .then((response) => {
        setLoder(false);
        console.log(response.status);
        if (response.status === 201 || response.status === 200) {
          console.log("success");
          navigate("/generatePass");
        } else {
          console.error("Failed to insert guest:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error in POST request:", error);
      });
  };

  return (
    <>
      <div className="college-logo-div">
        <img src={logo} alt="logo" className="college-logo" />
      </div>
      <div className="semi-full-container">
        <div className="main-container">
          <div className="container">
            <div className="column-container" style={{ display: "flex", flexDirection: "column" }}>
              <h1>Student Details</h1>
              <ul style={{ listStyleType: "none" }}>
                <li>Student Name: {sessionStorage.getItem("name")}</li>
                <li>Roll No: {sessionStorage.getItem("roll_no")}</li>
                <li>Branch: {sessionStorage.getItem("branch")}</li>
                <li>Program: {sessionStorage.getItem("program")}</li>
              </ul>
            </div>

            {attendees.length > 0 && (
              <div className="column-container" style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                <h1>Attendees Details</h1>
                {attendees.map((attendee, index) => (
                  <div key={index} style={{ marginBottom: "15px" }}>
                    <ul style={{ listStyleType: "none" }}>
                      <li>Guest Name: {attendee.guest_name}</li>
                      <li>Relation: {attendee.relation}</li>
                      <li>Phone No: {attendee.phone_no}</li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <p style={{ color: '', paddingBottom: "0.3rem" }}>* Pass can't be generated again *</p>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "15px" }}>
              {loder ? (
                <button className="button-proceed-yes" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                  <CircularProgress color="inherit" />
                </button>
              ) :
                (
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "15px" }}>
                    <button className="button-proceed-yes" onClick={handleConfrim} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "6px" }}><GiConfirmed /> Confirm</button>
                    <button className="button-proceed-yes" onClick={handleReEnter} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "6px" }}><FaEdit /> Modify</button>
                  </div>
                )}
            </div>
          </div>
        </div>
        
      </div>
      <a href="/buildForm" style={{ color: "white",textAlign:"center" }}>
        <h3 style={{ color: "white",marginTop:"1rem" }}>Build by DEPT OF CAI</h3>
        </a>
    </>
  );
}
export default ConfrimPass
