import "./styles.css";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";
import axios from "axios";
const ReactDOM = require("react-dom");

class WriteGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      cpuUsage: new Array(),
      memUsage: new Array()
    };
  }

  getData = () => {
    let data = {
      labels: this.state.labels,
      datasets: [
        {
          label: "CPU使用率",
          data: this.state.cpuUsage,
          borderColor: "rgba(60, 190, 20, 1)",
          backgroundColor: "rgba(0,0,0,0)"
        },
        {
          label: "メモリ使用率",
          data: this.state.memUsage,
          borderColor: "rgba(190, 60, 20, 1)",
          backgroundColor: "rgba(0,0,0,0)"
        }
      ]
    };
    return data;
  };

  getResourceUsage = (url) => {
    axios
      .get(url)
      .then((res) => {
        const items = JSON.parse(JSON.stringify(res.data));
        console.log(items);
        this.setState({
          now: new Date()
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentWillMount() {
    this.setState({
      cpuUsage: [60, 2, 3, 5, 6, 7, 8, 9, 10, 30, 100, 200, 300],
      memUsage: [10, 20, 30, 15, 6, 98, 81, 92, 100, 30, 10, 2, 3]
    });

    setInterval(() => {
      this.getResourceUsage(`https://httpbin.org/ip`);
      console.log("count");
      let { labels } = this.state;
      // for (let i = 0; i < labels.length; i++) {
      //   labels[i] += 1;
      // }
      labels.shift();
      const date = new Date();
      const dateStr = `${date.getMonth()}/${date.getDate()} 
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      labels.push(dateStr);

      let UsageBuf = this.state.cpuUsage;
      UsageBuf.shift();
      UsageBuf.push(Math.floor(Math.random() * 100) + 10);
      this.setState({
        now: new Date(),
        labels: labels,
        cpuUsage: UsageBuf
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        {this.state.now.toString()}
        <Line
          height={100}
          width={200}
          data={this.getData()}
          options={options}
        />
      </div>
    );
  }
}

const options = {
  animation: false,
  scales: {
    x: {
      // type: "timeseries",
      title: {
        display: true,
        text: "時間",
        font: {
          size: 20
        }
      },
      ticks: {
        font: {
          size: 16
        }
      },
      display: true
    }
  }
};

Chart.register(...registerables);

// setInterval(chglabel, 1000);

export default function App() {
  console.log("BBBBB");
  return (
    <div className="App">
      <h1>定常監視サイト</h1>
      <h2>
        サーバーのリソースを表示します。
        <br />
        もし異常状態であれば通知も行います？
      </h2>
      <div>
        <p>[CPU使用率]</p>
        {/* <Line height={100} width={200} data={dates} options={options} /> */}
        <div>
          <WriteGraph />
        </div>
      </div>
    </div>
  );
}
