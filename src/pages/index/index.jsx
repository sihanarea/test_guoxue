import { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import { add, minus, asyncAdd } from "../../actions/counter";
import GridList from "./components/GridList";
import RowList from "./components/RowList";
import "./index.less";
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

    return (
      <View className="index">
        <View className="header">
         <View className="header-title">智能排盘工具</View>
          <CalendarBanner />
          <RowList />
        </View>
        {/* <View>{this.props.counter.num}</View>
         <View onCLick={this.props.add}>增加</View> */}
        <View className="index-list">
           <GridList />
        </View>
       
      </View>
    );
  }
}

export default Index;
