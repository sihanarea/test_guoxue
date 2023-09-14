import { View, Text } from "@tarojs/components";
import { Flex } from "@taroify/core";

const Dayun = (props) => {
  const {
    daYun,
    dayunChange,
    dayunIndex,
    colorHandle,
    LunarUtil,
    currentBazi,
  } = props;
  return (
    <Flex justify="flex-start" className="pro-yun-dayun">
      <View className="pro-yun-dayun-tit">大运</View>
      <View className="pro-yun-dayun-content">
        {daYun.map((item, index) => (
          <View
            className={`pro-yun-dayun-item ${
              dayunIndex === index ? "active" : ""
            }`}
            key={index}
            onClick={() => {
              dayunChange(index);
            }}
          >
            <View>{item.getStartYear()}</View>
            <View className="pro-yun-dayun-age">{item.getStartAge()}岁</View>
            {item.getGanZhi() && (
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
            )}
          </View>
        ))}
      </View>
    </Flex>
  );
};

export default Dayun;
