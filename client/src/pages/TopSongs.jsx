import React, { useEffect, useState } from "react";
import { Button, Row, Col, Image, Spin, Radio, Modal } from "antd";
import "../css/topsongs.css";
import "antd/dist/antd.css";
import "../index.css";
import SongCard from "../components/songCard";
import gradientsvg from "../img/gradient.svg";
import UserCard from "../components/userCard";
import Collage from "./GenerateCard";
import logo from "../img/logo.svg";
import { useHistory, useLocation } from "react-router-dom";


const TopSongs = () => {
  let history = useHistory();
  const [token, setToken] = useState("");
  const [songData, setSongData] = useState([]);
  const [followStatus, setFollowStatus] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState("all");
  const [mediumSongs, setMediumSongs] = useState([]);
  const [longSongs, setLongSongs] = useState([]);
  const [shortSongs, setShortSongs] = useState([]);
  const [mainstreamScore, setMainstream] = useState(0);
  const [cardModal, setCardModal] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token_spotify"));
  });

  useEffect(() => {
    if (token) {
      getSpotifyData();
      getSongData();
      followMe();
      calculateMainstream();
    }
  }, [token]);

  useEffect(() => {
    const loader = setTimeout(() => {
      if (userData == undefined && longSongs) {
        setLoading(true);
        setSongData(longSongs);
      } else {
        setLoading(false);
      }
    }, 2000);
    return () => setLoading(false);
  }, []);

  useEffect(() => {
    if (duration == "all") {
      setSongData(longSongs);
      calculateMainstream();
    } else if (duration == "six") {
      setSongData(mediumSongs);
      calculateMainstream();
    } else {
      setSongData(shortSongs);
      calculateMainstream();
    }
  });

  const handleModal = () => {
    setCardModal(true);
  };

  const handleCancelModal = () => {
    setCardModal(false);
  };

  const durationHandler = (e) => {
    setDuration(e.target.value);
    e.preventDefault();
  };

  const calculateMainstream = () => {
    let songScore = 0;
    let total = 0;
    songData.map((item, index) => {
      songScore += item.popularity / (index + 1);
      total += 100 / (index + 1);
      // console.log(songScore / total);
    });
    setMainstream(((songScore / total) * 100).toFixed(2));
  };

  const getSpotifyData = () => {
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  };

  const getSongData = () => {
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
      .then((response) => response.json())
      .then((data) => setLongSongs(data.items));

    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50",
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
      .then((response) => response.json())
      .then((data) => setMediumSongs(data.items));
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
      .then((response) => response.json())
      .then((data) => setShortSongs(data.items));
  };

  // const linkBack = (item) => {
  //   history.push()
  // }

  const followMe = () => {
    fetch(
      "https://api.spotify.com/v1/me/following?type=user&ids=21356mis3ijm26hoywsriopgy",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then((data) => setFollowStatus(data));
  };

  return (
    <div>
      <div className="logo">
        <img src={logo} width="250px"></img>
      </div>
      <div className="Container">
        {loading ? (
          <>
            <div className="Spin">
              <Spin spinning={loading} size="large"></Spin>
            </div>
          </>
        ) : (
          <>
            <UserCard
              name={userData.display_name}
              url={userData.images[0].url}
              mainstreamScore={mainstreamScore}
            ></UserCard>
            <div className="monthControls">
              <Radio.Group
                defaultValue="all"
                buttonStyle="solid"
                size="large"
                style={{ borderRadius: "20px", marginLeft: "-30px" }}
                onChange={durationHandler}
                value={duration}
              >
                <Radio.Button value="one">1 MONTH</Radio.Button>
                <Radio.Button value="six">6 MONTHS</Radio.Button>
                <Radio.Button value="all">ALL TIME</Radio.Button>
              </Radio.Group>
              <Button onClick={handleModal}>GENERATE CARD</Button>
            </div>
            <div style={{ paddingBottom: "50px" }}>
              {songData.map((item, index) => {
                return (
                  <SongCard
                    index={index}
                    title={item.name}
                    artist={item.artists[0].name}
                    album={item.album.name}
                    albumart={item.album.images[0].url}
                    linkback={item.external_urls.spotify}
                  ></SongCard>
                );
              })}
            </div>
            <div style={{ paddingBottom: "50px", paddingLeft: "170px" }}>
              <h3 style={{ color: "white" }}>Built by @kdcloudy</h3>
            </div>
          </>
        )}
        <Modal visible={cardModal} footer={null} onCancel={handleCancelModal}>
          <Collage
            songList={songData}
            userData={userData}
            visible={cardModal}
          ></Collage>
        </Modal>
      </div>
    </div>
  );
};

export default TopSongs;
