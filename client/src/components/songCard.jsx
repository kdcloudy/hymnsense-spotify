import React from "react";
import { Row, Col, Image, Space } from "antd";
import "../css/topsongs.css";

const SongCard = (props) => {

  const linkback = () => {
    window.location.href = props.linkback
  }

  return (
    <div className="card" onClick={linkback}>
      <Col span={2}>
        <h2 style={{ paddingTop: "50px" }}>{props.index + 1}</h2>
      </Col>
      <Col span={6}>
        <Image
          src={props.albumart}
          style={{ borderRadius: "10px" }}
          preview="false"
        ></Image>
      </Col>

      <Col>
        <div className="cardInfo">
          <h1>{props.title}</h1>
          <h2>{props.artist}</h2>
          <h3 style={{ marginTop: "-10px" }}>{props.album}</h3>
        </div>
      </Col>
    </div>
  );
};

export default SongCard;
