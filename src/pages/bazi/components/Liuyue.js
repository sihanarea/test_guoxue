import { View, Text } from "@tarojs/components";
import { Flex } from "@taroify/core";

const Liuyue = (props) => {
  const {
    daYun,
    dayunIndex,
    colorHandle,
    LunarUtil,
    currentBazi,
    liunianIndex,
  } = props;
  const liuyue = daYun[dayunIndex].getLiuNian()[liunianIndex].getLiuYue();

  return (
    <Flex justify="flex-start" className="pro-yun-liunian">
      <View className="pro-yun-liunian-tit">流月</View>
      <View className="pro-yun-liunian-content">
        {liuyue.map((item, idx) => {
          return (
            <View className="pro-yun-liunian-item" key={idx}>
              <View>{item.getMonthInChinese()}</View>
              <View>
                <View>
                  <Text
                    className={`${colorHandle(item.getGanZhi().substr(0, 1))}`}
                  >
                    {item.getGanZhi().substr(0, 1)}
                  </Text>
                  <Text className="shishen">
                    {
                      LunarUtil.SHI_SHEN_GAN[
                        currentBazi.getDayGan() + item.getGanZhi().substr(0, 1)
                      ]
                    }
                  </Text>
                </View>
                <View>
                  <Text
                    className={`${colorHandle(item.getGanZhi().substr(1))}`}
                  >
                    {item.getGanZhi().substr(1)}
                  </Text>
                  <Text className="shishen">
                    {
                      LunarUtil.SHI_SHEN_ZHI[
                        currentBazi.getDayGan() + item.getGanZhi().substr(1)
                      ]
                    }
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </Flex>
  );
};

export default Liuyue;
