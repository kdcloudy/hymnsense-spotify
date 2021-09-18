import React from "react";
import "../css/topsongs.css";
import gradientsvg from "../img/gradient.svg";

const UserCard = (props) => {
  return (
    <div className="userCard" style={{ backgroundImage: `url(${props.url})` }}>
      <h1
      className="userLabel"
        style={{
          paddingTop: "70px",
          lineHeight: "0.9",
          fontWeight: "600",
          maxWidth: "280px",
          color: "white",
          position: "absolute",
        }}
      >
        {props.name}'s Top Songs
      </h1>
      <p style={{
          paddingTop: "20px",
          // lineHeight: "0.9",
          fontWeight: "600",
          // maxWidth: "280px",
          // color: "white",
          position: "absolute",
        }}>Your taste is {props.mainstreamScore}% mainstream</p>
      <img
      className="imageGrad"
        src={gradientsvg}
        alt={"sdsd"}
       
        style={{
          marginTop: "-20px",
          marginLeft: "-20px",
          borderRadius: "20px",
          objectFit: "contain"
        }}
      />
    </div>
  );
};

export default UserCard;
