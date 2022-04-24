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
  const [artistData, setArtistData] = useState([]);
  const [artistLoad, setArtistLoad] = useState(false);
  const [viewArtist, setViewArtist] = useState(false);
  const [followStatus, setFollowStatus] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState("one");
  const [mediumSongs, setMediumSongs] = useState([]);
  const [longSongs, setLongSongs] = useState([]);
  const [shortSongs, setShortSongs] = useState([]);
  const [mainstreamScore, setMainstream] = useState(0);
  const [cardModal, setCardModal] = useState(false);

  const PROD_URI = "http://api.hymnsense.com/onboard";
  const LOCAL_URI = "http://localhost:8888/onboard";

  useEffect(() => {
    setToken(localStorage.getItem("token_spotify"));
  });

  useEffect(() => {
    if (token) {
      getSpotifyData();
      getSongData();
      getArtistData();
      databaseCall();
      calculateMainstream();
    }
  }, [token]);

  useEffect(() => {
    const loader = setTimeout(() => {
      if (userData == undefined && artistData == undefined) {
        setLoading(true);
        setSongData(longSongs);
      } else {
        setLoading(false);
      }
    }, 2000);
    return () => setLoading(false);
  }, []);

  // useEffect(() => {
  //   databaseCall();
  // }, [artistData]);

  useEffect(() => {
    if (duration == "all") {
      setViewArtist(true);
    } else {
      setViewArtist(false);
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

  const getArtistData = () => {
    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        setArtistData(data.items);
      });
  };

  const databaseCall = () => {
    if (artistData && userData) {
      let sample = [];
      for (let i = 0; i < 5; i++) {
        sample.push(artistData[i].name);
      }
      console.log(sample);
      fetch(LOCAL_URI, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: userData.display_name,
          id: userData.id,
          arr: sample,
        }),
      }).then((response) => response.json());
    } else {
      setTimeout(databaseCall, 2000);
      console.log("timeout");
    }
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
                style={{ borderRadius: "20px", marginLeft: "-50px" }}
                onChange={durationHandler}
                value={duration}
              >
                <Radio.Button value="one">FAVOURITE SONGS</Radio.Button>
                <Radio.Button value="all">FAVOURITE ARTISTS</Radio.Button>
              </Radio.Group>
              <Button onClick={databaseCall}>SOCIAL PROFILE</Button>
              <div>
                <h2 style={{ marginTop: "20px" }}>
                  Tap on a song to open Spotify
                </h2>
              </div>
            </div>
            <div style={{ paddingBottom: "50px" }}></div>
            {viewArtist
              ? artistData.map((item, index) => {
                  return (
                    <SongCard
                      index={index}
                      title={item.name}
                      albumart={item.images[1].url}
                    />
                  );
                })
              : songData.map((item, index) => {
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
