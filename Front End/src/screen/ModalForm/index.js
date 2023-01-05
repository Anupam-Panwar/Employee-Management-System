import style from "./style.module.css";
import Dropdown from "../../Dropdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalForm = ({ mode, editdata, type, setshow }) => {
  toast.configure();
  const options = {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Flip,
    toastClassName: "toast",
    closeButton: false,
  };
  const [updateobject, setupdateobject] = useState(
    mode === "Edit"
      ? editdata[0]
      : {
          email: "",
          firstName: "",
          lastName: "",
          salary: "",
          phone: "",
          department: "",
          role: "",
        }
  );
  const [roledata, setroledata] = useState({
    name: "",
    description: "",
  });

  const [role, setRole] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
        fetchDepartmentData();
  },[]);

  useEffect(() =>{
    fetchRolesData();
  },[]);

  //   const role = [{ label: "Teacher", value: "Teacher" }];
  //   const department = [{label: "CSE", value: "CSE"}]
  const fetchRolesData = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    console.log("Over Roles");
    const res = await fetch("http://localhost:8080/admin/roles/", requestOptions);
    const data = await res.json();
    console.log(data);
    let temp = [];
    data.forEach(item => {
        const roleItem = {label:item["name"], value:item["name"]};
        temp.push(roleItem);
    })
    setRole(temp);
  };

  const fetchDepartmentData = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    console.log("Over Department");
    const res = await fetch("http://localhost:8080/admin/department/", requestOptions);
    const data = await res.json();
    console.log(data);
    let temp = [];
    data.forEach(item => {
        const departmentItem = {label:item["name"], value:item["name"]};
        temp.push(departmentItem);
    })
    setDepartment(temp);
  };

  const postAdd = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      email: updateobject.email,
      firstName: updateobject.firstName,
      lastName: updateobject.lastName,
      salary: updateobject.salary,
      phone: updateobject.phone,
      department: updateobject.department,
      role: updateobject.role,
    });

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };
    let res;
    if(mode === "Edit"){
        res = await fetch(
            "http://localhost:8080/admin/update/employee",
            requestOptions
        );
    } else{
        res = await fetch(
        "http://localhost:8080/admin/add/employee",
        requestOptions
        );
    }
    if (res.status === 200) {
        toast.success("Successfully submited", options);
        window.location.reload();
      }

  };

  const postRole = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      ...roledata,
    });

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };
    const res = await fetch(
      `http://localhost:8080/${
        type === "Role" ? "admin/add/role" : "admin/add/department"
      }`,
      requestOptions
    );
    if (res.status === 200) {
      toast.success("Successfully submited", options);
      setshow(false);
    } else{
        toast.warn("Error while adding the data")
    }
  };

  const handleDeaprtment = (e) => {
    setupdateobject({ ...updateobject, department: e.value });
  };

  const handleroledropdown = (e) => {
    setupdateobject({ ...updateobject, role: e.value });
  };
  const handlerrole = (e) => {
    if (e.target.name === "role") {
      setroledata({ ...roledata, name: e.target.value });
    } else {
      setroledata({ ...roledata, description: e.target.value });
    }
  };

  const HandleChange = (e) => {
    if (e.target.name === "firstname") {
      setupdateobject({ ...updateobject, firstName: e.target.value });
    } else if (e.target.name === "lastname") {
      setupdateobject({ ...updateobject, lastName: e.target.value });
    } else if (e.target.name === "email") {
      setupdateobject({ ...updateobject, email: e.target.value });
    } else if (e.target.name === "phone") {
      setupdateobject({ ...updateobject, phone: e.target.value });
    } else if (e.target.name === "department") {
      setupdateobject({ ...updateobject, department: e.target.value });
    } else if (e.target.name === "salary") {
      setupdateobject({ ...updateobject, salary: e.target.value });
    } else {
      setupdateobject({ ...updateobject, role: e.target.value });
    }
  };

  console.log("roledata", roledata);

  return (
    <div className={style.outerform}>
      <div className={style.modalheader}>
        <div>
          {type === "Employee"
            ? (mode === "Edit")? "Edit Employee":"Add Employee"
            : type === "Role"
            ? "Add Role"
            : "Add Department"}
        </div>
      </div>
      {type === "Employee" ? (
        <div className={style.formouter}>
          <div className={style.inputouter}>
            <div>
              <div style={{ color: "black" }}>First Name</div>
              <input
                style={{ height: "28px", margin: "0rem" }}
                onChange={HandleChange}
                value={updateobject?.firstName}
                className="inputstyle"
                name="firstname"
                type="text"
              ></input>
            </div>
            <div>
              <div style={{ color: "black" }}>Last Name</div>
              <input
                style={{ height: "28px", margin: "0rem" }}
                onChange={HandleChange}
                value={updateobject?.lastName}
                className="inputstyle"
                name="lastname"
                type="text"
              ></input>
            </div>
          </div>
          <div className={style.inputouter}>
            <div>
              <div style={{ color: "black" }}>Email</div>
              <input
                style={{ height: "28px", margin: "0rem" }}
                onChange={HandleChange}
                value={updateobject?.email}
                className="inputstyle"
                name="email"
                type="text"
              ></input>
            </div>
            <div>
              <div style={{ color: "black" }}>Phone Number</div>
              <input
                style={{ height: "28px", margin: "0rem" }}
                onChange={HandleChange}
                value={updateobject?.phone}
                className="inputstyle"
                name="phone"
                type="number"
              ></input>
            </div>
          </div>
          <div className={style.inputouter}>
            <div>
              <Dropdown
                label={"Department"}
                placeholder={"Select Department"}
                option={department}
                value={updateobject.department}
                onChange={handleDeaprtment}
              />
            </div>
            <div>
              <Dropdown
                label={"Role"}
                placeholder={"Select Role"}
                option={role}
                value={updateobject.role}
                onChange={handleroledropdown}
              />
            </div>
            <div>
              <div style={{ color: "black" }}>salary</div>
              <input
                style={{ height: "28px", margin: "0rem" }}
                onChange={HandleChange}
                value={updateobject?.salary}
                className="inputstyle"
                name="salary"
                type="text"
              ></input>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingLeft: "2rem" }} className={style.formouter}>
          <div style={{ width: "100%" }} className={style.inputouter}>
            <div>
              <div style={{ color: "black" }}>
                {type === "Department" ? "Department" : "Role"}
              </div>
              <input
                onChange={handlerrole}
                value={roledata?.name}
                className="inputstyle"
                style={{ height: "28px", margin: "0rem" }}
                name="role"
                type="text"
              ></input>
            </div>
            <div>
              <div style={{ color: "black" }}>Description</div>
              <input
                onChange={handlerrole}
                value={roledata?.description}
                className="inputstyle"
                style={{ height: "28px", margin: "0rem" }}
                name="description"
                type="text"
              ></input>
            </div>
          </div>
        </div>
      )}

      <button
        disabled={
          type === "Employee"
            ? updateobject.email &&
              updateobject.firstName &&
              updateobject.lastName &&
              updateobject.phone &&
              updateobject.department &&
              updateobject.salary &&
              updateobject.role
              ? false
              : true
            : roledata.name && roledata.description
            ? false
            : true
        }
        style={{
          margin: "2rem 5rem",
          opacity:
            type === "Employee"
              ? updateobject.email &&
                updateobject.firstName &&
                updateobject.lastName &&
                updateobject.phone &&
                updateobject.department &&
                updateobject.salary &&
                updateobject.role
                ? false
                : true
              : roledata.name && roledata.description
              ? 1
              : 0.4,
        }}
        onClick={type === "Employee" ? () => postAdd() : () => postRole()}
        className="button-style"
      >
        Submit
      </button>
    </div>
  );
};
export default ModalForm;
