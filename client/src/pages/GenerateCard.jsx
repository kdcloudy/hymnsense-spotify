import React, { useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Button, Row } from "antd";
import logoDark from "../img/logo-dark.svg";
import { stringify } from "querystring";
const GenerateCard = (props) => {
  useEffect(() => {
    props.songList.pop();
  }, []);

  const saveAs = (blob, fileName) => {
    setTimeout(() => {
      var elem = window.document.createElement("a");
      elem.href = blob;
      elem.download = fileName;
      elem.style = "display:none;";
      (document.body || document.documentElement).appendChild(elem);
      if (typeof elem.click === "function") {
        elem.click();
      } else {
        elem.target = "_blank";
        elem.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
        );
      }
      URL.revokeObjectURL(elem.href);
      elem.remove();
    });
  };

  const onCapture = (counter) => {
    // if (counter === 0) {
    //   htmlToImage
    //     .toJpeg(document.getElementById("Collage"))
    //     .then(function (dataUrl) {
    //       saveAs(dataUrl, props.userData.display_name + "Hymnsense");
    //       console.log(dataUrl)
    //     });
    //   onCapture(1);

    // } else if (counter === 1) {
    //   htmlToImage
    //     .toJpeg(document.getElementById("Collage"))
    //     .then(function (dataUrl) {
    //       saveAs(dataUrl, props.userData.display_name + "Hymnsense");
    //     });
    // };



  }
  return (
    <div>
      <div
        id="Collage"
        style={{
          color: "black",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Row>
          <h1>{props.userData.display_name}'s Top Songs</h1>
        </Row>

        {props.songList.map((item, index) => {
          return <img src={item.album.images[0].url} width={"60px"}></img>;
        })}

        <Row>
          <div>
            <p style={{ fontSize: "17px", marginTop: "20px" }}>
              Created with <img src={logoDark} width="100px"></img>
            </p>
          </div>
        </Row>
      </div>
      <Button onClick={onCapture(0)}>DOWNLOAD</Button>
    </div>
  );
};

export default GenerateCard;
