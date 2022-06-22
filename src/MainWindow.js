import "./styles.css";
import React from "react";
import WriteGraph from "./UsageGraph";

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  AlertIsValueOverFlow = (num) => {
    if (num === 1) {
      console.log("OverFlow !!!!!!!!!!!!!!");
    } else {
      console.log("Warning !!!!!!!!!!!!!!");
    }
  };

  render() {
    return (
      <div>
        <h1>定常監視サイト</h1>
        <h2>
          サーバーのリソースを表示します。
          <br />
          もし異常状態であれば通知も行います？
        </h2>
        <div>
          <WriteGraph OverFlow={this.AlertIsValueOverFlow} />
        </div>
      </div>
    );
  }
}

export default MainWindow;
