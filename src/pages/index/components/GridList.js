import { Grid, Image } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

const GridList = () => {
  const toHuangli = () => {
    Taro.navigateTo({
      url: "/pages/huangli/index",
    });
  };
  const toBazi = () => {
    Taro.navigateTo({
      url: "/pages/bazi/index",
    });
  };

  return (
    <View className="index-grid">
      <View style={{ margin: "27rpx" }}>热门测试</View>
      <Grid columns={3} bordered={false}>
        <Grid.Item className="index-grid-item" onClick={toHuangli}>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">今日黄历</Text>
        </Grid.Item>
        <Grid.Item onClick={toBazi}>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">八字排盘</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">紫微斗数</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">奇门遁甲</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">六爻排盘</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">梅花易数</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">手机号吉凶</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">车牌号吉凶</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">星座运势</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">姓名测试</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">宝宝起名</Text>
        </Grid.Item>
        <Grid.Item>
          <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          />
          <Text className="grid-text">塔罗占卜</Text>
        </Grid.Item>
      </Grid>
    </View>
  );
};

export default GridList;
