import React from "react";
import { Row, Col, Image, Space } from "antd";
import "../css/topsongs.css";

const SongCard = (props) => {
  return (
    <div className="card">
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
        <div
          style={{
            maxWidth: "280px",
            marginLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <h1>{props.title}</h1>
          <h2>{props.artist}</h2>
          <h3>{props.album}</h3>
        </div>
      </Col>
    </div>
  );
};

export default SongCard;
