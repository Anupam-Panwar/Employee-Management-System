const Footer = () => {
  return (
    <div style={{ marginTop: "10px", marginBottom : "10px"}}>
      Made with{" "}
      <img
        src="https://s.w.org/images/core/emoji/13.1.0/svg/2764.svg"
        alt="heart"
        style={{ height: "20px" }}
      />{" "}
      by{" "}
      <a
        href="https://www.linkedin.com/in/anupam-panwar/"
        style={{ textDecoration: "none", color: "#5b586f" }}
      >
        Anupam Panwar
      </a>{" "}
      &{"  "}
      <a
        href="https://www.linkedin.com/in/purvi-goyal/"
        style={{ textDecoration: "none", color: "#5b586f" }}
      >
        Purvi Goyal
      </a>
    </div>
  );
};

export default Footer;
