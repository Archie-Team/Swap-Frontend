import "./Dashboard.css";
import React from "react";
import Positions from "../components/dashboard//Positions";
import MainCard from "../components/layout/MainCard";

const Home = () => {
  return (
    <MainCard className="dashboard-container">
      <Positions />
    </MainCard>
  );
};

export default Home;
