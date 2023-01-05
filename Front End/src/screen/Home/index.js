import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NITUKLogo from "../../assets/logo_NIT_UK.png";
import Footer from "../../Components/Footer/index";
import backgroundImage from "../../assets/background.png";

const Home = () => {
  toast.configure();

  const options = {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Flip,
    toastClassName: "toast",
    closeButton: false,
  };
  const [employdata, setemploydata] = useState([]);
  const navigate = useNavigate();

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
    console.log("data", data);
    setemploydata(data);
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
      <div style={{ display: "flex", flexDirection: "column", margin: "0rem" }}>
        <div className="header">
          <button onClick={() => navigate("/login")} className="button-style">
            Admin Login
          </button>
          <img
            onClick={() => navigate("/")}
            src={NITUKLogo}
            alt="NIT UK Logo"
            className="logo"
          />
        </div>
        <div className="outergridbox">
          {employdata.map((item) => {
            return (
              <div className="cardouter">
                <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  {item.firstName} {item.lastName}
                </div>
                <div style={{ fontSize: "1.4rem", marginTop: "1rem" }}>
                  {item.department} | {item.role}
                </div>
                <div style={{ fontSize: "1.4rem", marginTop: "1rem" }}>
                  {item.email}
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
