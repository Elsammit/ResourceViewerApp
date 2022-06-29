import "./styles.css";
import React from "react";
import WriteGraph from "./UsageGraph";

class InputNetworkPath extends React.Component {
  constructor(props) {
    super(props);
    this.SetSubIpAddr = this.props.SetIpAddr;
    this.state = {
      IpAddr:"aaa",
    };
  }

  test = () =>{
      console.log("test");

      const ipaddr = this.state.IpAddr;
      this.SetSubIpAddr(ipaddr);
  }

  render() {
    const ipAddr = this.state.IpAddr;
    return (
      <div>
        Server IP:
        <input type="text" 
          onChange={(e) => this.setState({IpAddr:e.target.value})}></input>
        <button onClick={this.test}>clickHere</button>
          <div>{ipAddr}</div>
      </div>
    );
  }
}

export default InputNetworkPath;