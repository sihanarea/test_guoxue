import { View } from "@tarojs/components";
import { Image } from "@taroify/core";
import Taro from "@tarojs/taro";

const RowList = (props) => {
  const { asdfasdf } = props;
  const jump = (url) => {
    Taro.navigateTo({
      url,
    });
  };
  const data = [
    {
      src: "https://7072-prod-3g5f717bea609505-1300806080.tcb.qcloud.la/guoxue/huangli.jpg?sign=5df97f351eec30e46c6581ec007b7172&t=1695019730",
      text: "今日黄历",
      url: "/pages/huangli/index",
      show: false,
      // desc: "160152人参与",
    },
    {
      src: "https://7072-prod-3g5f717bea609505-1300806080.tcb.qcloud.la/guoxue/bazi.jpg?sign=5df97f351eec30e46c6581ec007b7172&t=1695019730",
      text: "八字排盘",
      url: "/pages/bazi/index",
      show: asdfasdf,
      // desc: "29765人参与",
    },
  ];
  return (
    <View className="row-list">
      {data.map(
        (item, index) =>
          !item.show && (
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
          )
      )}
    </View>
  );
};

export default RowList;
