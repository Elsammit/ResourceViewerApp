import "./styles.css";
import React from "react";
import WriteGraph from "./UsageGraph";

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemAlert: 0,
      CpuAlert:0
    };
  }

  AlertMemIsOverFlow = (num) => {
    this.setState({
      MemAlert: num
    });
  };

  AlertCpuIsOverFlow = (num) => {
    this.setState({
      CpuAlert: num
    });
  };

  AlertMemMessageWindow = () => {
    let WarningMsg = <p className="NormalBox">Memory Usage is OK!!</p>;
    if (this.state.MemAlert === 1) {
      WarningMsg = <p className="AlertBox">Memory Usage is Alert!!</p>;
    } else if (this.state.MemAlert == 2) {
      WarningMsg = <p className="WarningBox">Memory Usage is Warning!!</p>;
    }
    return WarningMsg;
  };

  AlertCpuMessageWindow = () => {
    let WarningMsg = <p className="NormalBox">CPU Usage is OK!!</p>;
    if (this.state.CpuAlert === 1) {
      WarningMsg = <p className="AlertBox">CPU Usage is Alert!!</p>;
    } else if (this.state.CpuAlert == 2) {
      WarningMsg = <p className="WarningBox">CPU Usage is Warning!!</p>;
    }
    return WarningMsg;
  };

  render() {
    return (
      <div>
        <h1>定常監視サイト</h1>
        <h2>
          サーバーのリソースを表示します!
          <br />
          もし異常状態であれば通知も行います？
        </h2>
        {this.AlertCpuMessageWindow()}
        {this.AlertMemMessageWindow()}
        <div clsssName="graphArea">
          <WriteGraph 
            MemOverFlow={this.AlertMemIsOverFlow} 
            CpuOverFlow={this.AlertCpuIsOverFlow}
          />
        </div>
      </div>
    );
  }
}

export default MainWindow;
