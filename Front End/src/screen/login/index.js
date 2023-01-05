import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NITUKLogo from "../../assets/logo_NIT_UK.png";
import Footer from "../../Components/Footer/index";
import backgroundImage from "../../assets/background.png";
import { ToastContainer } from "react-toastify";

const Login = () => {
  toast.configure();

  const options = {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Flip,
    toastClassName: "toast",
    closeButton: false,
  };

  const navigate = useNavigate();
  const [updateobject, setupdateobject] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    if (e.target.name === "email") {
      setupdateobject({ ...updateobject, email: e.target.value });
    } else {
      setupdateobject({ ...updateobject, password: e.target.value });
    }
  };

  console.log("updateobject", updateobject);

  const postLoginData = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      email: updateobject.email,
      password: updateobject.password,
    });
    var requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };
    const res = await fetch(
      "http://localhost:8080/admin/login",
      requestOptions
    );
    if (res.status === 200) {
      navigate("/admin");
      toast.success("Login Successfully", options);
    } else {
      toast.warn("wrong credentials");
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        padding: "2rem",
      }}
    >
      <div className="Header" style={{ margin: "1rem" }}>
        <img
          onClick={() => navigate("/")}
          src={NITUKLogo}
          alt="NIT UK Logo"
          className="logo"
        />
      </div>
      <div className="login">
        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>Login</div>
        <div className="inputouter">
          <div>Email</div>
          <input
            onChange={HandleChange}
            value={updateobject?.email}
            className="inputstyle"
            name="email"
            type="email"
          ></input>
        </div>
        <div className="inputouter">
          <div>Password</div>
          <input
            onChange={HandleChange}
            value={updateobject?.password}
            className="inputstyle"
            name="password"
            type="password"
          ></input>
        </div>
        <button
          disabled={updateobject.email && updateobject.password ? false : true}
          style={{
            marginTop: "1rem",
            opacity: updateobject.email && updateobject.password ? "1" : "0.4",
          }}
          onClick={postLoginData}
          className="button-style"
        >
          Login In
        </button>
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
  );
};
export default Login;
