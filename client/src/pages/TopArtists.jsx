import React, { useEffect, useState } from "react";

const TopArtists = () => {
  const [token, setToken] = useState("");
  const [artistData, setArtistData] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token_spotify"));
  });
  //   useEffect(() => {
  //     if (token) {
  //       getSpotifyData();
  //       getSongData();
  //       calculateMainstream();
  //     }
  //   }, [token]);

  //   const getSongData = () => {
  //     fetch("https://api.spotify.com/v1/me/top/artists", {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setLongSongs(data.items));
  //   };

  return <div>TopArtists</div>;
};

export default TopArtists;
