import React, { useEffect, useState } from "react";
import { Button, Row, Col, Image, Spin, Radio } from "antd";
import "../css/topsongs.css";
import SongCard from "../components/songCard";
import gradientsvg from "../img/gradient.svg";
import UserCard from "../components/userCard";
import logo from "../img/logo.svg";

const TopSongs = () => {
  const [token, setToken] = useState("");
  const [songData, setSongData] = useState([]);
  const [followStatus, setFollowStatus] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState("all");
  const [mediumSongs, setMediumSongs] = useState([]);
  const [longSongs, setLongSongs] = useState([]);
  const [shortSongs, setShortSongs] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token_spotify"));
  });

  useEffect(() => {
    if (token) {
      getSpotifyData();
      getSongData();
      followMe();
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
    } else if (duration == "six") {
      setSongData(mediumSongs);
    } else {
      setSongData(shortSongs);
    }
  });

  const durationHandler = (e) => {
    setDuration(e.target.value);
    e.preventDefault();
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
      <div
        className="logo"
        style={{ paddingLeft: "150px", paddingTop: "100px" }}
      >
        <img src={logo} width="250px"></img>
      </div>
      <div className="Container">
        {loading ? (
          <>
            <Spin spinning={loading}></Spin>
          </>
        ) : (
          <>
            <UserCard
              name={userData.display_name}
              url={userData.images[0].url}
            ></UserCard>
            <div
              style={{
                paddingBottom: "20px",
                marginLeft: "100px",
                width: "100%",
              }}
            >
              <Radio.Group
                defaultValue="all"
                buttonStyle="solid"
                size="large"
                style={{ borderRadius: "20px" }}
                onChange={durationHandler}
                value={duration}
              >
                <Radio.Button value="one">1 MONTH</Radio.Button>
                <Radio.Button value="six">6 MONTHS</Radio.Button>
                <Radio.Button value="all">ALL TIME</Radio.Button>
              </Radio.Group>
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
                  ></SongCard>
                );
              })}
            </div>
            <div style={{ paddingBottom: "50px", paddingLeft: "170px" }}>
              <h3 style={{ color: "white" }}>Built by @kdcloudy</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopSongs;
