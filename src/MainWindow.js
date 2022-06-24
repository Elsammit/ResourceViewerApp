import "./styles.css";
import React from "react";
import WriteGraph from "./UsageGraph";

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AlertNum: 0
    };
  }

  AlertIsValueOverFlow = (num) => {
    this.setState({
      AlertNum: num
    });
  };

  AlertMessageWindow = () => {
    let WarningMsg = <p className="NormalBox">Memory OK!!</p>;
    const { AlertNum } = this.state;
    if (AlertNum === 1) {
      //console.log("OverFlow !!!!!!!!!!!!!!");
      WarningMsg = <p className="AlertBox">Memory OK!!</p>;
    } else if (AlertNum == 2) {
      WarningMsg = <p className="WarningBox">Memory OK!!</p>;
    }
    return WarningMsg;
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
        {this.AlertMessageWindow()}
        {this.AlertMessageWindow()}
        <div clsssName="graphArea">
          <WriteGraph OverFlow={this.AlertIsValueOverFlow} />
        </div>
      </div>
    );
  }
}

export default MainWindow;
