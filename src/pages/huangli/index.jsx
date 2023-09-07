import dayjs from "dayjs";
import { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import { Button,Tag } from "@taroify/core";
import { ArrowDown }  from "@taroify/icons"
import DatePick from "./components/DatePick";
import DatePickHuang from "./components/DatePickHuang";
import Banner from "./components/Banner";
import "./index.less";
import { open,close,openHunagLi,closeHunagLi,getHuangLiDate } from "../../actions/huangli";


@connect(
  ({ huangli }) => ({
    huangli,
  }),
  (dispatch) => ({
    open() {
      dispatch(open());
    },
    close() {
      dispatch(close());
    },
    openHuangLi(){
      dispatch(openHunagLi());
    },
    closeHuangLi(){
       dispatch(closeHunagLi());
    },
    getHuangLiDate(date){
      dispatch(getHuangLiDate(date));
    }
  })
)
class Index extends Component {
  constructor() {
    super();
  }
 
  
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    
  }

  componentDidHide() {}
   
  changeToday(){
    const today = dayjs().format("YYYY-MM-DD");
    this.props.getHuangLiDate(today)
  }

  render() {

    return (
      <View className="huangli-index">
        {/* <View className="pick-date-btn"><Button block  variant="outlined" className="huangli-btn" onClick={this.props.open}>滚动选八字年月日时{this.props.huangli.getBaziDate}<ArrowDown /></Button></View> */}
        <View className="pick-date-btn">
          <View  className="huangli-btn" onClick={this.props.openHuangLi}>
            黄历选日期{this.props.huangli.getHuangLiDate}
            <ArrowDown /> 
            <Tag className="jin-tag" size="medium" children="今" onClick={(e)=>{
              e.stopPropagation();
              this.changeToday()
            }}
            />
          </View></View>

        <Banner />
        {/* <View className="out">
          <View className={this.state.show?"in donghua":"in"}>
            
          </View>
        </View> */}
        {/* <Button onClick={()=>{this.fanye()}}>点我翻页</Button> */}

        <View><DatePickHuang /></View>
        <View><DatePick /></View>
      </View>
    );
  }
}

export default Index;
