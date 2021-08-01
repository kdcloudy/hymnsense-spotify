import React from "react";
import "../css/topsongs.css";
import gradientsvg from "../img/gradient.svg";

const UserCard = (props) => {
  return (
    <div className="userCard" style={{ backgroundImage: `url(${props.url})` }}>
      <h1
        style={{
          paddingTop: "90px",
          fontSize: "60px",
          lineHeight: "0.9",
          fontWeight: "600",
          maxWidth: "280px",
          color: "white",
          position: "absolute",
        }}
      >
        {props.name}'s Top Songs
      </h1>
      <img
        src={gradientsvg}
        alt={"sdsd"}
        width="500px"
        height="300px"
        style={{
          marginTop: "-20px",
          marginLeft: "-20px",
          borderRadius: "20px",
        }}
      />
    </div>
  );
};

export default UserCard;
