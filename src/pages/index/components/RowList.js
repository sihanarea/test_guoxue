import { View, Text } from "@tarojs/components";
import { Image } from "@taroify/core";
import Taro from "@tarojs/taro";

const RowList = () => {
  const jump = (url) => {
    Taro.navigateTo({
      url,
    });
  };
  const data = [
    {
      src: require("../../../assets/images/tu.png"),
      text: "今日黄历",
      url: "/pages/huangli/index",
      // desc: "160152人参与",
    },
    {
      src: require("../../../assets/images/bagua.png"),
      text: "八字排盘",
      url: "/pages/bazi/index",
      // desc: "29765人参与",
    },
  ];
  return (
    <View className="row-list">
      {data.map((item, index) => (
        <View
          className="row-list-item"
          key={index}
          onClick={() => {
            jump(item.url);
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "280rpx",
              borderRadius: "18rpx",
            }}
            mode="aspectFill"
            src={item.src}
          />
          <View className="row-list-item-text">{item.text}</View>
          {/* <View className="row-list-item-desc">{item.desc}</View> */}
        </View>
      ))}
    </View>
  );
};

export default RowList;
