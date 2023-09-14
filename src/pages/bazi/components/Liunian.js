import { View, Text } from "@tarojs/components";
import { Flex } from "@taroify/core";
import { useEffect } from "react";

const Liunian = (props) => {
  const {
    daYun,
    dayunIndex,
    colorHandle,
    LunarUtil,
    currentBazi,
    liunianChange,
    liunianIndex,
  } = props;
  const liunian = daYun[dayunIndex].getLiuNian();

  return (
    <Flex justify="flex-start" className="pro-yun-liunian">
      <View className="pro-yun-liunian-tit">流年</View>
      <View className="pro-yun-liunian-content">
        {liunian.map((ln, idx) => {
          return (
            <View
              className={`pro-yun-liunian-item ${
                liunianIndex === idx ? "active" : ""
              }`}
              key={idx}
              onClick={() => {
                liunianChange(idx);
              }}
            >
              <View>{ln.getYear()}</View>
              <View>
                <View>
                  <Text
                    className={`${colorHandle(ln.getGanZhi().substr(0, 1))}`}
                  >
                    {ln.getGanZhi().substr(0, 1)}
                  </Text>
                  <Text className="shishen">
                    {
                      LunarUtil.SHI_SHEN_GAN[
                        currentBazi.getDayGan() + ln.getGanZhi().substr(0, 1)
                      ]
                    }
                  </Text>
                </View>
                <View>
                  <Text className={`${colorHandle(ln.getGanZhi().substr(1))}`}>
                    {ln.getGanZhi().substr(1)}
                  </Text>
                  <Text className="shishen">
                    {
                      LunarUtil.SHI_SHEN_ZHI[
                        currentBazi.getDayGan() + ln.getGanZhi().substr(1)
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

export default Liunian;
