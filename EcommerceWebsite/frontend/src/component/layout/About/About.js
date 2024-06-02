import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  const visitInstagram = () => {
    window.location = "";
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
              src="/id-dump.png"
              alt="Founder"
            />
          
            <Typography>Sonal Salunkhe<br/>Post:-Software Developer<br/> Experience:-2 years <br/> Company-Tech Mahindra Pvt. Ltd. <br/> Date:- Aug-2021 to Aug-2023</Typography>
           
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
