import "./styles.css";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";
import axios from "axios";

class WriteGraph extends React.Component {
  constructor(props) {
    super(props);
    this.MemAlert = this.props.MemOverFlow;
    this.CpuAlert = this.props.CpuOverFlow;
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

  SetCpuUsageToGrapth = (respCpu) =>{
    console.log("======================");
    console.log(respCpu.cpuUsage);
    let { labels } = this.state;

    labels.shift();
    const date = new Date();
    const dateStr = `${date.getMonth()}/${date.getDate()} 
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    labels.push(dateStr);

    let { cpuUsage } = this.state;
    const cpuNum = respCpu.cpuUsage;
    cpuUsage.shift();
    cpuUsage.push(cpuNum);

    this.setState({
      now: new Date(),
      labels: labels,
      cpuUsage: cpuUsage,
    });
    if (cpuNum > 80) {
      this.CpuAlert(1);
    } else if (cpuNum > 60) {
      this.CpuAlert(2);
    }
  }

  SetMemoryUsageToGrapth = (respMemory) =>{
    console.log("======================");
    console.log(respMemory.memUsage);
    let { labels } = this.state;

    labels.shift();
    const date = new Date();
    const dateStr = `${date.getMonth()}/${date.getDate()} 
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    labels.push(dateStr);

    let { memUsage } = this.state;

    const memNum = respMemory.memUsage;
    memUsage.shift();
    memUsage.push(memNum);
    this.setState({
      now: new Date(),
      labels: labels,
      memUsage: memUsage
    });
    if (memNum > 80) {
      this.MemAlert(1);
    } else if (memNum > 60) {
      this.MemAlert(2);
    }
  }
  getResourceUsage = (url, state) => {
    axios
      .get(url)
      .then((res) => {
        const items = JSON.parse(JSON.stringify(res.data));
        console.log(items);
        if(state === 1){
          this.SetCpuUsageToGrapth(items);
        }else{
          this.SetMemoryUsageToGrapth(items);
        }
        this.setState({
          now: new Date()
        });
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };


  componentWillMount() {
    setInterval(() => {
      this.getResourceUsage('http://************************************', 1);
      this.getResourceUsage('http://************************************', 2);
    }, 3000);
  }

  getOptions = () => {
    const options = {
      maintainAspectRatio: false,
      responsive: false,
      animation: false,
      scales: {
        width: 300,
        height: 200,
        x: {
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
          data={this.getData()}
          options={this.getOptions()}
          width={800}
          height={500}
        />
      </div>
    );
  }
}
Chart.register(...registerables);

export default WriteGraph;
