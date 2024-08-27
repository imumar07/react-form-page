// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
// import { RxCross2 } from "react-icons/rx";
import axios from "axios";
// import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../assets/college_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import Api from "../../data/ApiData";
// import { Button, Modal, Box, Typography } from "@mui/material";

// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import "./UserForm.css";
// import userimage from "../../assets/user-image.png";

const UserForm = () => {
  const navigate = useNavigate();
  const [yesLoading, setYesLoading] = useState(false);
  const rollNo = localStorage.getItem("roll_no");
  const aadhar = localStorage.getItem("aadhar");


  const hasMounted = React.useRef(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [isNoChecked, setIsNoChecked] = useState(false);
  // const [isSubFormYesChecked, setIsSubFormYesChecked] = useState(false);
  // const [isSubFormNoChecked, setIsSubFormNoChecked] = useState(false);
  // const [attendees, setAttendees] = useState([
  //   { name: "", relation: "", file: null },
  // ]);
  useEffect(() => {
    if (!rollNo || !aadhar) {
      navigate("/");
    }

    if (!hasMounted.current) {
      handleAlreadyRegisterd();
      hasMounted.current = true;
    }
  }, []);

  const handleYesChange = () => {
    // const roll_no = localStorage.getItem("roll_no");
    // const name = localStorage.getItem("name");
    // const branch = localStorage.getItem("branch");
    // const program = localStorage.getItem("program");
    // const batch = localStorage.getItem("batch");

    // // Log the retrieved values for debugging purposes
    // console.log("Roll No:", roll_no, "Name:", name, "Branch:", branch, "Program:", program, "Batch:", batch);
    navigate("/guestForm");
  };

  const handleAlreadyRegisterd = () => {
    const roll_no = localStorage.getItem("roll_no");
    const name = localStorage.getItem("name");
    const branch = localStorage.getItem("branch");

    // Log the retrieved values for debugging purposes
    console.log("Roll No:", roll_no, "Name:", name, "Branch:", branch);

    setYesLoading(true);

    axios
      .post(`${Api}/check_attendees`, {
        roll_no: roll_no,
        branch: branch,
      })
      .then((response) => {
        setYesLoading(false);
        if (response.status === 200) {
          notify("Your response is already stored please download the pass 😇");
          setTimeout(() => {
            navigate("/alreadyRegisteredCard");
          }, 2500)
          console.error("Already registered:");
        } else {
          console.error("Failed to check", response.data.message);
        }
      })
      .catch((error) => {
        setYesLoading(false);
        console.error("Error in POST request:", error);
      });
  };


  const handleNoChange = () => {
    // setModalOpen(true);
    notify("Response Have Been Submitted 🚀");
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 2000)
  };
  const notify = (message) => {
    toast(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // setModalOpen(false);
    // setTimeout(() => {
    //   localStorage.clear();
    //   navigate("/");
    // }, 2000)
  };

  return (
    <div className="full-container">
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
      </>
      <div className="college-logo-div">
        <img src={logo} alt="logo" className="college-logo" />
      </div>
      <div className="semi-full-container">
        <div className="main-container">
          <div className="container">
            <div>
              <div className="column-container">
                <FontAwesomeIcon size="5x" icon={faUserGraduate} />
              </div>
              <div className="column-container">
                <h2>{localStorage.getItem("name")}</h2>
              </div>
              <div className="column-container">
                <p style={{ fontWeight: "bold" }}>
                  {localStorage.getItem("roll_no")}
                </p>
              </div>
              <div className="column-container">
                <p style={{ fontWeight: "bold" }}>
                  {localStorage.getItem("program") === "MBA" ? localStorage.getItem("branch") :
                    localStorage.getItem("program") + "/" + localStorage.getItem("branch")}
                </p>
              </div>
              <div className="descp">
                <p>Are you willing to attend?</p>
              </div>
            </div>
            <div className="checkboxes">
              {yesLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <>
                  <button
                    className="button-proceed-yes"
                    onClick={handleYesChange}
                  >
                    Yes
                  </button>
                  <button
                    className="button-proceed-no"
                    onClick={handleNoChange}
                  >
                    No
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default UserForm;
