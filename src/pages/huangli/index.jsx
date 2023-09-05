import Taro from "@tarojs/taro";
import { Component } from "react";
import { View } from "@tarojs/components";
import "./index.less";
// import Nav2 from "./components/Nav2.js";
import CustomTabbar from "../../components/CustomTabbar";

class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    console.log(this.$scope)
     if (typeof this.$scope.getTabBar === "function" && this.$scope.getTabBar()) {
            this.$scope.getTabBar().$component.setState({selected: 2})
        }
  }

  componentDidHide() {}
  
  render() {
    Taro.setStorageSync("currentIndex","2")
    return (
      <View className="index">
        老黄历
        {/* <Nav2 current="2" />  */}
        <CustomTabbar />
      </View>
    );
  }
}

export default Index;
