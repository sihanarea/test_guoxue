import { View, Text } from "@tarojs/components";
import { Image } from "@taroify/core";

const RowList = () => {
  const data = [
    {
      src: require("../../../assets/images/tu.png"),
      text: "2023兔年运",
      desc: "160152人参与",
    },
    {
      src: require("../../../assets/images/bagua.png"),
      text: "八字财富",
      desc: "29765人参与",
    },
    {
      src: require("../../../assets/images/hunpei.png"),
      text: "婚姻配对",
      desc: "50023人参与",
    },
    {
      src: require("../../../assets/images/shiye.png"),
      text: "事业运势",
      desc: "5413人参与",
    },
  ];
  return (
    <View className="row-list">
      {data.map((item, index) => (
        <View className="row-list-item" key={index}>
          <Image
            style={{
              width: "140rpx",
              height: "140rpx",
              borderRadius: "18rpx",
              margin: "6rpx",
            }}
            src={item.src}
          />
          <View className="row-list-item-text">{item.text}</View>
          <View className="row-list-item-desc">{item.desc}</View>
        </View>
      ))}
    </View>
  );
};

export default RowList;
