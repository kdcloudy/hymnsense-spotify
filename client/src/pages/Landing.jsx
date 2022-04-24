import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Button, Row, Col } from "antd";
import { Redirect } from "react-router-dom";
import bg from "../img/cover.png";
import "../css/landing.css";
import { useHistory, useLocation } from "react-router-dom";

const Landing = () => {
  let history = useHistory();
  let locattion = useLocation();

  const [authToken, setAuthToken] = useState("");
  const PROD_URI = "http://api.hymnsense.com/login";
  const LOCAL_URI = "http://localhost:8888/login";

  useEffect(() => {
    var str = queryString.parse(window.location.search).access_token;
    console.log(str);
    setAuthToken(str);
    localStorage.setItem("token_spotify", authToken);
  });

  if (authToken) {
    return <Redirect to={{ pathname: "/topSongs" }}></Redirect>;
  }

  const authenticate = () => {
    window.location.href = LOCAL_URI;
  };

  return (
    <div
      className="Container-Landing"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Row>
        <div className="hero">
          <h1>For the lovers of music.</h1>
        </div>
      </Row>
      <Row>
        <Button className="signInSpotify" shape="round" onClick={authenticate}>
          <div
            style={{
              position: "absolute",
              marginLeft: "10px",
              marginTop: "3px",
            }}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1094 0C5.42481 0 0 5.42481 0 12.1094C0 18.7939 5.42481 24.2188 12.1094 24.2188C18.7939 24.2188 24.2188 18.7939 24.2188 12.1094C24.2188 5.42481 18.7939 0 12.1094 0ZM17.0264 17.8174C16.8213 17.8174 16.6943 17.7539 16.5039 17.6416C13.457 15.8057 9.91211 15.7275 6.41113 16.4453C6.2207 16.4941 5.97168 16.5723 5.83008 16.5723C5.35645 16.5723 5.05859 16.1963 5.05859 15.8008C5.05859 15.2979 5.35645 15.0586 5.72266 14.9805C9.72168 14.0967 13.8086 14.1748 17.2949 16.2598C17.5928 16.4502 17.7686 16.6211 17.7686 17.0654C17.7686 17.5098 17.4219 17.8174 17.0264 17.8174ZM18.3398 14.6143C18.0859 14.6143 17.915 14.502 17.7393 14.4092C14.6875 12.6025 10.1367 11.875 6.08887 12.9736C5.85449 13.0371 5.72754 13.1006 5.50781 13.1006C4.98535 13.1006 4.56055 12.6758 4.56055 12.1533C4.56055 11.6309 4.81445 11.2842 5.31738 11.1426C6.6748 10.7617 8.06152 10.4785 10.0928 10.4785C13.2617 10.4785 16.3232 11.2646 18.7354 12.7002C19.1309 12.9346 19.2871 13.2373 19.2871 13.6621C19.2822 14.1895 18.8721 14.6143 18.3398 14.6143ZM19.8535 10.8936C19.5996 10.8936 19.4434 10.8301 19.2236 10.7031C15.7471 8.62793 9.53125 8.12988 5.50781 9.25293C5.33203 9.30176 5.1123 9.37988 4.87793 9.37988C4.2334 9.37988 3.74023 8.87695 3.74023 8.22754C3.74023 7.56348 4.15039 7.1875 4.58984 7.06055C6.30859 6.55762 8.23242 6.31836 10.3271 6.31836C13.8916 6.31836 17.627 7.06055 20.3564 8.65234C20.7373 8.87207 20.9863 9.1748 20.9863 9.75586C20.9863 10.4199 20.4492 10.8936 19.8535 10.8936Z"
                fill="white"
              />
            </svg>
          </div>
          <span style={{ marginLeft: "35px" }}>Continue with Spotify</span>
        </Button>
      </Row>
    </div>
  );
};

export default Landing;
