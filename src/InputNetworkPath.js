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

  IpAddrClickEvent = () =>{
      console.log("test");
      const ipaddr = this.state.IpAddr;
      
      const ipCheck = ipaddr.split('.');
      if(ipCheck.length === 4){
        this.SetSubIpAddr(ipaddr);
      }else{
        alert("IP Address format error !!!!!!");
      }
  }

  render() {
    const ipAddr = this.state.IpAddr;
    return (
      <div>
        Server IP:
        <input type="text" 
          onChange={(e) => this.setState({IpAddr:e.target.value})}></input>
        <button className="IpButtonClass" onClick={this.IpAddrClickEvent}>clickHere</button>
      </div>
    );
  }
}

export default InputNetworkPath;