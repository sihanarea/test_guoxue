import { Grid, Image } from "@taroify/core";
import { View, Text } from "@tarojs/components";

const GridList = () => {
  return (
    <View className="index-grid">
      <View style={{ margin: "27rpx" }}>热门测试</View>
      <Grid columns={3} bordered={false}>
        <Grid.Item className="index-grid-item">
          {/* <Image
            style={{ width: "3rem", height: "3rem" }}
            className="grid-image"
            src={require("../../../assets/images/1.png")}
          /> */}
          <Text className="grid-text">今日黄历</Text>
        </Grid.Item>
      </Grid>
    </View>
  );
};

export default GridList;
