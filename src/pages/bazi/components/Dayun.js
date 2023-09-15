import { View, Text } from "@tarojs/components";
import { Flex } from "@taroify/core";
import { EightChar } from "./lunar";

const Dayun = (props) => {
  const {
    daYun,
    dayunChange,
    dayunIndex,
    colorHandle,
    LunarUtil,
    currentBazi,
    currentYun,
    setCurrentYun,
  } = props;
  const getGanIndex = (gan) => {
    for (var i = 0, j = LunarUtil.GAN.length; i < j; i++) {
      if (gan === LunarUtil.GAN[i]) {
        return i - 1;
      }
    }
    return 0;
  };
  const getZhiIndex = (zhi) => {
    for (var i = 0, j = LunarUtil.ZHI.length; i < j; i++) {
      if (zhi === LunarUtil.ZHI[i]) {
        return i - 1;
      }
    }
    return 0;
  };
  var CHANG_SHENG_OFFSET = {
    甲: 1,
    丙: 10,
    戊: 10,
    庚: 7,
    壬: 4,
    乙: 6,
    丁: 9,
    己: 9,
    辛: 0,
    癸: 3,
  };
  const getChangSheng = (gan, ganIndex, zhiIndex) => {
    var offset = CHANG_SHENG_OFFSET[gan];
    var index = offset + (ganIndex % 2 == 0 ? zhiIndex : -zhiIndex);
    if (index >= 12) {
      index -= 12;
    }
    if (index < 0) {
      index += 12;
    }
    return EightChar.CHANG_SHENG[index];
  };
  const changeDayunInfo = (index) => {
    //改变大运的主星，干支，藏干，十神，星云，自坐，空亡，纳音
    const obj = currentYun;
    //干支
    obj.daYunGanZhi = daYun[index].getGanZhi();
    //主星十神
    obj.daYunShiShen =
      LunarUtil.SHI_SHEN_GAN[
        currentBazi.getDayGan() + daYun[index].getGanZhi().substr(0, 1)
      ];
    //藏干十神
    var dShiShenZhi = [];
    var dHideGan = LunarUtil.ZHI_HIDE_GAN[daYun[index].getGanZhi().substr(1)];
    for (var x = 0, y = dHideGan.length; x < y; x++) {
      dShiShenZhi.push(
        dHideGan[x] +
          "-" +
          LunarUtil.SHI_SHEN_ZHI[
            currentBazi.getDayGan() +
              daYun[index].getGanZhi().substr(1) +
              dHideGan[x]
          ]
      );
    }
    obj.daYunShiShenZhi = dShiShenZhi;

    var zIndex = getZhiIndex(daYun[index].getGanZhi().substr(1));

    obj.daYunDiShi = getChangSheng(
      currentBazi.getDayGan(),
      currentBazi.getDayGanIndex(),
      zIndex
    );
    obj.daYunChangSheng = getChangSheng(
      daYun[index].getGanZhi().substr(0, 1),
      getGanIndex(daYun[index].getGanZhi().substr(0, 1)),
      zIndex
    );
    obj.daYunXunKong = LunarUtil.getXunKong(daYun[index].getGanZhi());
    obj.daYunNaYin = LunarUtil.NAYIN[daYun[index].getGanZhi()];
    setCurrentYun(obj);
  };
  return (
    <Flex
      justify="flex-start"
      className="pro-yun-dayun"
      onTouchMove={(e) => {
        e.stopPropagation();
      }}
    >
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
              changeDayunInfo(index);
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
