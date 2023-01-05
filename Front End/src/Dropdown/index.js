import React from "react";
import Select from "react-select";
import styled from "styled-components";
import styles from "./style.module.css";

const SingleSelectDropdown = styled(Select)`
  .root_container {
    background: #e1edff;
    font-family: "Roboto", sans-serif;
    margin-left: 144px;
    border-radius: 0.3rem;
    padding-left: 3px;
    padding-right: 6px;
    padding-top: 1px;
    padding-bottom: 1px;
  }
  .css-319lph-ValueContainer {
    margin-top: -0.6rem;
  }
  .css-1d8n9bt {
    margin-top: -0.5rem;
  }
  .css-xb97g8:hover {
    background-color: #e1edff;
    color: black;
    border-radius: 0.3rem;
  }
  .css-1wa3eu0-placeholder {
    top: 41%;
  }
  .css-1uccc91-singleValue {
    top: 42%;
  }
  .css-tlfecz-indicatorContainer {
    padding: 0px !important;
  }
  .css-1gtu0rj-indicatorContainer {
    padding: 0px !important;
  }
  .css-g1d714-ValueContainer {
    font-size: "12px";
  }
`;

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "white",
    fontFamily: "'Roboto', sans-serif;",
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "6px",
    width: "100%",
    height: 25,
    minHeight: 27,
    boxShadow: state.isFocused ? null : null,
    borderColor: "#707070",
    marginTop: "-0.5rem !important",

    // ":hover": {
    //   borderColor:"hsl(0deg 0% 80%)"
    // },
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  ValueContainer: (provided) => ({
    ...provided,
    backgroundColor: "#E1EDFF",
    borderRadius: "1px ",
    padding: "0px 8px !important",
  }),
  menu: (base) => ({
    ...base,

    borderRadius: "7px",
    width: "100%",
    zIndex: 5000,
    paddingTop: "0rem !important",
    position: "relative !important",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    fontSize: "12px",
    fontWeight: "100",
    webkitScrollbar: "5px",
    fontFamily: "'Roboto', sans-serif",
    zIndex: "1000",

    "::-webkit-scrollbar": {
      width: "5px",
    },

    "::-webkit-scrollbar-thumb": {
      background: "black",
      borderRadius: "20px",
    },

    "::-webkit-scrollbar-track ": {
      background: "#f1f1f1",
    },
  }),
};

const Dropdown = ({
  label,
  placeholder,
  onChange,
  option,
  defaultValue,
  value,
  id,
}) => {
  let valueInformat = { label: defaultValue, value: defaultValue };
  const dataInFormat = (data) => {
    if (data === "" || data === undefined || data === null) {
      return "";
    } else {
      return { label: data, value: data };
    }
  };
  const onOptionChange = (option) => {
    if (id) {
      onChange(option, id);
    } else {
      onChange(option);
    }
  };
  return (
    <div className={styles.formbox}>
      {label ? <label className={styles.label}>{label}</label> : ""}
      <SingleSelectDropdown
        menuPortalTarget={document.body}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#EEF0F2",
          },
        })}
        style={{ minHeight: 29 }}
        styles={customStyles}
        defaultValue={valueInformat}
        options={option}
        placeholder={placeholder}
        id={id}
        onChange={onOptionChange}
        value={dataInFormat(value)}
      />
    </div>
  );
};
export default Dropdown;
