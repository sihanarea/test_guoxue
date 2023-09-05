import Taro from "@tarojs/taro";
import { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";

import { add, minus, asyncAdd } from "../../actions/counter";
import GridList from "./components/GridList";
import "./index.less";
// import Nav from "./components/Nav";
import CalendarBanner from "./components/CalendarBanner";

@connect(
  ({ counter }) => ({
    counter,
  }),
  (dispatch) => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    },
  })
)
class Index extends Component {

  
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
  }

  componentDidHide() {}

  render() {
    Taro.setStorageSync("currentIndex","1")
    return (
      <View className="index">
        {/* <View>{this.props.counter.num}</View>
         <View onCLick={this.props.add}>增加</View> */}
        <CalendarBanner />
        <GridList />
          {/* <Nav current="1" />  */}
      </View>
    );
  }
}

export default Index;
