// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentPass.css";
import { FaGraduationCap } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Confetti from "react-confetti";
import { storage } from "../../firebase";
import Api from "../../data/ApiData";
import college_logo from "../../assets/college_logo.svg";

const StudentPass = () => {
  const [guestData, setGuestData] = useState([]);

  const storeToFirebase = async (pdfBlob) => {
    try {
      const storageRef = ref(storage, `passes/Graduation-Pass-${sessionStorage.getItem("roll_no")}.pdf`);
      const uploadTask = uploadBytesResumable(storageRef, pdfBlob);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          axios.post(`${Api}/insert_pass_url`, {
            roll_no: sessionStorage.getItem("roll_no"),
            pass_url: downloadURL,
          });
        }
      );
    } catch (error) {
      console.error("Error storing PDF to Firebase:", error);
    }
  };

  const handleSave = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");

    const capture = document.querySelector(".printer");
    const confi = document.getElementById("confetti");
    const button = document.querySelector("button");
    const passContainers = document.querySelectorAll(".generate-pass-sub-container");
    const isSingleContainer = passContainers.length === 1;

    // Apply temporary styles for PDF generation
    capture.style.backgroundColor = "white";
    confi.style.display = "none";
    capture.style.display = "flex";
    capture.style.flexDirection = "row";
    capture.style.justifyContent = "center";
    capture.style.alignItems = "center";
    button.style.display = "none";
    capture.style.width = isSingleContainer ? "300%" : "180%";
    capture.style.paddingTop = "5rem";

    passContainers.forEach((container) => {
      container.style.width = isSingleContainer ? "10%" : "45%";
      container.style.height = "auto";
    });

    // Capture the content and generate the PDF
    const canvas = await html2canvas(capture);
    const imgData = canvas.toDataURL("image/jpeg", 0.5);
    const doc = new jsPDF(isSingleContainer ? "p" : "l", "mm", "a4");

    const imgWidth = doc.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

    const pdfBlob = doc.output("blob");

    // Store the generated PDF to Firebase
    await storeToFirebase(pdfBlob);

    // Restore original styles after generating the PDF
    button.style.display = "block";
    capture.style.width = "";
    capture.style.backgroundColor = "";
    capture.style.display = "";
    capture.style.flexDirection = "";
    capture.style.justifyContent = "";
    capture.style.alignItems = "";
    capture.style.paddingTop = "";
    confi.style.display = "block";

    passContainers.forEach((container) => {
      container.style.width = "";
      container.style.height = "";
    });
  };

  const handlePrint = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");

    const capture = document.querySelector(".printer");
    const passContainers = document.querySelectorAll(".generate-pass-sub-container");
    const isSingleContainer = passContainers.length === 1;

    // Apply temporary styles for PDF generation
    capture.style.backgroundColor = "white";
    capture.style.display = "flex";
    capture.style.flexDirection = "row";
    capture.style.justifyContent = "center";
    capture.style.alignItems = "center";
    capture.style.width = isSingleContainer ? "300%" : "180%";
    capture.style.paddingTop = "5rem";

    passContainers.forEach((container) => {
      container.style.width = isSingleContainer ? "10%" : "45%";
      container.style.height = "auto";
    });

    // Capture the content and generate the PDF
    const canvas = await html2canvas(capture);
    const imgData = canvas.toDataURL("image/jpeg", 0.5);
    const doc = new jsPDF(isSingleContainer ? "p" : "l", "mm", "a4");

    const imgWidth = doc.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

    doc.save(`Graduation-Pass-${sessionStorage.getItem("roll_no")}.pdf`);

    // Restore original styles after generating the PDF
    capture.style.width = "";
    capture.style.backgroundColor = "";
    capture.style.display = "";
    capture.style.flexDirection = "";
    capture.style.justifyContent = "";
    capture.style.alignItems = "";
    capture.style.paddingTop = "";

    passContainers.forEach((container) => {
      container.style.width = "";
      container.style.height = "";
    });
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${Api}/get_attendees`, {
          params: {
            roll_no: sessionStorage.getItem("roll_no"),
          },
        });
        console.log(response.data);
        setGuestData(response.data);
      } catch (error) {
        console.error("Error in GET request:", error);
        setGuestData([]);
      } finally {
        await handleSave();
        await handlePrint();
      }
    };

    fetchData();

  }, []);

  return (
    <>
      <div className="printer">
        <Confetti tweenDuration={10000} recycle={false} numberOfPieces={1000} id="confetti" />
        <div className="generate-pass-main-container">
          <div className="generate-pass-sub-container">
            <div className="generate-pass-inner-cont">
              <div
                className="generate-pass-college-logo"
                style={{
                  backgroundImage: `url(${college_logo})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="generate-pass-icon">
                <FaGraduationCap style={{ width: "100px", height: "100px" }} className="cap" />
                <h1 style={{ fontSize: "1.3rem" }}>Happy Graduation</h1>
              </div>
              <div className="generate-pass-title">
                <h4>STUDENT ENTRY PASS</h4>
              </div>
              <div className="generate-pass-details">
                <span>Name : {sessionStorage.name}</span>
                <span>Regd No : {sessionStorage.roll_no}</span>
                <span>Branch : {sessionStorage.branch}</span>
              </div>
              <div className="generate-pass-note">
                <p>* Please carry pass for entry *</p>
              </div>
            </div>
          </div>
        </div>

        {guestData.map((guest, index) => (
          <div key={index} className="generate-pass-main-container">
            <div className="generate-pass-sub-container">
              <div className="generate-pass-inner-cont">
                <div
                  className="generate-pass-college-logo"
                  style={{
                    backgroundImage: `url(${college_logo})`,
                    backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="generate-pass-icon">
                  <HiUserGroup style={{ width: "100px", height: "100px" }} className="cap" />
                </div>
                <div className="generate-pass-title">
                  <h4>GUEST ENTRY PASS</h4>
                </div>
                <div className="generate-pass-details">
                  <span>Student Name : {sessionStorage.name}</span>
                  <span>Guest Name : {guest.guest_name}</span>
                  <span>Relation : {guest.relation}</span>
                  <span>Student Regd No : {sessionStorage.roll_no}</span>
                  <span>Phone No : {guest.phone_no}</span>
                </div>
                <div className="generate-pass-note">
                  <p>* Please carry pass for enrty *</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <button id="printPDFButton" onClick={handlePrint}>Download Pass</button>
      </div>
    </>
  );
};

export default StudentPass;
