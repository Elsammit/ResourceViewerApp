import "./styles.css";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";
import axios from "axios";

class WriteGraph extends React.Component {
  constructor(props) {
    super(props);
    this.Alert = this.props.OverFlow;
    this.state = {
      now: new Date(),
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      cpuUsage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      memUsage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    setInterval(() => {
      this.getResourceUsage(`https://httpbin.org/ip`);
      let { labels } = this.state;

      labels.shift();
      const date = new Date();
      const dateStr = `${date.getMonth()}/${date.getDate()} 
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      labels.push(dateStr);

      let { cpuUsage, memUsage } = this.state;
      const cpuNum = Math.random() * 100;
      cpuUsage.shift();
      cpuUsage.push(cpuNum);

      const memNum = Math.random() * 100;
      memUsage.shift();
      memUsage.push(memNum);
      this.setState({
        now: new Date(),
        labels: labels,
        cpuUsage: cpuUsage,
        memUsage: memUsage
      });
      if (cpuNum > 80 || memNum > 80) {
        this.Alert(1);
      } else if (cpuNum > 70 || memNum > 70) {
        this.Alert(2);
      }
    }, 3000);
  }

  getOptions = () => {
    const options = {
      animation: false,
      scales: {
        width: 300,
        height: 200,
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
        },
        y: {
          title: {
            display: true,
            text: "使用率[%]",
            font: {
              size: 20
            }
          },
          ticks: {
            font: {
              size: 16
            },
            max: 100,
            min: 0
          },
          display: true
        }
      }
    };
    return options;
  };

  render() {
    return (
      <div>
        {this.state.now.toString()}
        <Line
          height={100}
          width={200}
          data={this.getData()}
          options={this.getOptions()}
        />
      </div>
    );
  }
}
Chart.register(...registerables);

export default WriteGraph;
