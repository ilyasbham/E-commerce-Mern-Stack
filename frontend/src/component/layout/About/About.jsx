import React from "react";
import "./aboutSection.css";
// Components
import { Button, Typography, Avatar } from "@mui/material";

// Icons
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";



const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/zkkl994/";
  };

  const visitFacebook = () => {
    window.location = "https://www.facebook.com/buzz2day/";
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dt8zs3klr/image/upload/v1763915422/avatars/uaqe35hshjpn2o0ico54.jpg"
              alt="Founder"
            />
            <Typography>Ilyas Bham</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <Button onClick={visitFacebook} color="primary">
              Visit Facebook
            </Button>
            <span>
              This is a sample website made by @zkkl994. Only with the
              purpose to teach MERN Stack and React concepts.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>

            <a
              href="https://www.youtube.com/@ilyasbham3377"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a
              href="https://www.instagram.com/zkkl994/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="instagramSvgIcon" />
            </a>

            <a
              href="https://www.facebook.com/buzz2day/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="facebookSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
