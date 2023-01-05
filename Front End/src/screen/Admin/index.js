import styles from "./style.module.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import ModalForm from "../ModalForm";
import { ToastContainer, toast } from "react-toastify";
import NITUKLogo from "../../assets/logo_NIT_UK.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/index";
import backgroundImage from "../../assets/background.png";

const Admin = () => {
  const navigate = useNavigate();
  const [employdata, setemploydata] = useState([]);
  const [show, setshow] = useState(false);
  const [editdata, seteditdata] = useState([]);
  const [mode, setmode] = useState("Add");
  const [type, settype] = useState("Employee");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "none",
      height: "605px",
    },
  };

  const handleEmployee = () => {
    setshow(true);
    setmode("Add");
    settype("Employee");
  };
  const handleRole = () => {
    setshow(true);
    setmode("Add");
    settype("Role");
  };
  const handleDeapartment = () => {
    setshow(true);
    setmode("Add");
    settype("Department");
  };

  const fetchEmploymentData = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    const res = await fetch("http://localhost:8080/", requestOptions);
    const data = await res.json();
    setemploydata(data);
    console.log("data", data);
  };

  const handleEdit = (email) => {
    const filterData = employdata.filter((item) => {
      if (item.email === email) {
        return item;
      }
    });
    seteditdata(filterData);
    setshow(true);
    setmode("Edit");
    console.log("filterData", filterData);
  };

  const handledelete = async (email) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      headers: headers,
      body: `${email}`,
      redirect: "follow",
    };
    const res = await fetch(
      "http://localhost:8080/admin/remove/employee",
      requestOptions
    );
    if (res.status === 200) {
        window.location.reload();
    } 
  };

  useEffect(() => {
    fetchEmploymentData();
  }, []);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        padding: "2rem",
      }}
    >
      <div>
        <div>
          <div className={""}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginRight: "auto",
                }}
              >
                <button
                  onClick={() => handleEmployee()}
                  className="button-style"
                >
                  Add Employee
                </button>
                <button onClick={() => handleRole()} className="button-style">
                  Add Role
                </button>
                <button
                  onClick={() => handleDeapartment()}
                  className="button-style"
                >
                  Add Department
                </button>
              </div>

              <img
                onClick={() => navigate("/")}
                src={NITUKLogo}
                alt="NIT UK Logo"
                className="logo"
              />
            </div>
          </div>
          <div className="outergridbox">
            {employdata.map((item) => {
              return (
                <div className={styles.cardouter}>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {item.firstName} {item.lastName}
                  </div>
                  <div style={{ fontSize: "1.4rem", marginTop: "1rem" }}>
                    {item.department} | {item.role}
                  </div>
                  <div style={{ fontSize: "1.4rem", marginTop: "1rem" }}>
                    {item.phone}
                  </div>
                  <div style={{ fontSize: "1.4rem", marginTop: "1rem" }}>
                    {item.email}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "2rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      style={{ margin: "0rem 0.1rem" }}
                      onClick={() => handleEdit(item.email)}
                      className="button-style"
                    >
                      Edit
                    </button>
                    <button
                      style={{ margin: "0rem 0.1rem" }}
                      onClick={() => handledelete(item.email)}
                      className="button-style"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Footer />
        </div>
        <Modal
          isOpen={show}
          onAfterOpen={() => setshow(true)}
          onRequestClose={() => setshow(false)}
          style={customStyles}
          // className={styles.modal}
          contentLabel="Example Modal"
        >
          <ModalForm
            setshow={setshow}
            type={type}
            editdata={editdata}
            mode={mode}
          ></ModalForm>
        </Modal>
      </div>
    </div>
  );
};
export default Admin;
