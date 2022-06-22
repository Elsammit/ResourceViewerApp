import "./styles.css";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";
import axios from "axios";
import MainWindow from "./MainWindow";

export default function App() {
  return (
    <div className="App">
      <MainWindow />
    </div>
  );
}
