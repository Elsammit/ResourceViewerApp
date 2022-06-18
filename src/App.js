import "./styles.css";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";
// import { LineChart } from "recharts";
const ReactDOM = require("react-dom");

// let labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// const chglabel = () => {
//   console.log("AAA");
//   for (let i = 0; i < labels.length; i++) {
//     labels[i] += 1;
//   }
// };
let labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let datas = [1, 2, 3, 5, 6, 7, 8, 9, 10, 30, 100, 200, 300];

// let getData = {
//   labels: labels,
//   datasets: [
//     {
//       label: "CPU使用率",
//       data: datas,
//       borderColor: "rgba(60, 190, 20, 1)",
//       backgroundColor: "rgba(0,0,0,0)"
//     },
//     {
//       label: "メモリ使用率",
//       data: [10, 20, 30, 15, 6, 98, 81, 92, 100, 30, 10, 2, 3],
//       borderColor: "rgba(190, 60, 20, 1)",
//       backgroundColor: "rgba(0,0,0,0)"
//     }
//   ]
// };

class WriteGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date()
    };
  }

  getData = () => {
    let data = {
      labels: labels,
      datasets: [
        {
          label: "CPU使用率",
          data: datas,
          borderColor: "rgba(60, 190, 20, 1)",
          backgroundColor: "rgba(0,0,0,0)"
        },
        {
          label: "メモリ使用率",
          data: [10, 20, 30, 15, 6, 98, 81, 92, 100, 30, 10, 2, 3],
          borderColor: "rgba(190, 60, 20, 1)",
          backgroundColor: "rgba(0,0,0,0)"
        }
      ]
    };
    return data;
  };

  componentDidMount() {
    let test = this.state.labels;
    // test[0]++;
    this.intervalId = setInterval(() => {
      for (let i = 0; i < labels.length; i++) {
        labels[i] += 1;
        //getData.datasets[0].data[i] += 1;

        //datas[i] += 10;
      }
      this.setState({
        now: new Date()
        // labels: test
      });
    }, 1000);
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
    XAxis: {
      scaleLabel: {
        display: true,
        labelString: "あああ",
        fontSize: 16
      }
    }
  }
};

Chart.register(...registerables);

// setInterval(chglabel, 1000);

export default function App() {
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
