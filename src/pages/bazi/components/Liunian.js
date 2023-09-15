import { View, Text } from "@tarojs/components";
import { Flex } from "@taroify/core";
import { EightChar } from "./lunar";

const Liunian = (props) => {
  const {
    daYun,
    dayunIndex,
    colorHandle,
    LunarUtil,
    currentBazi,
    liunianChange,
    liunianIndex,
    currentYun,
    setCurrentYun,
  } = props;
  const liunian = daYun[dayunIndex].getLiuNian();
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
  const changeLiuNianInfo = (index) => {
    //改变流年的主星，干支，藏干，十神，星云，自坐，空亡，纳音
    const obj = currentYun;
    //干支
    obj.liuNianGanZhi = liunian[index].getGanZhi();
    //主星十神
    obj.liuNianShiShen =
      LunarUtil.SHI_SHEN_GAN[
        currentBazi.getDayGan() + liunian[index].getGanZhi().substr(0, 1)
      ];
    //藏干十神
    var dShiShenZhi = [];
    var dHideGan = LunarUtil.ZHI_HIDE_GAN[liunian[index].getGanZhi().substr(1)];
    for (var x = 0, y = dHideGan.length; x < y; x++) {
      dShiShenZhi.push(
        dHideGan[x] +
          "-" +
          LunarUtil.SHI_SHEN_ZHI[
            currentBazi.getDayGan() +
              liunian[index].getGanZhi().substr(1) +
              dHideGan[x]
          ]
      );
    }
    obj.liuNianShiShenZhi = dShiShenZhi;

    var zIndex = getZhiIndex(liunian[index].getGanZhi().substr(1));

    obj.liuNianDiShi = getChangSheng(
      currentBazi.getDayGan(),
      currentBazi.getDayGanIndex(),
      zIndex
    );
    obj.liuNianChangSheng = getChangSheng(
      liunian[index].getGanZhi().substr(0, 1),
      getGanIndex(liunian[index].getGanZhi().substr(0, 1)),
      zIndex
    );
    obj.liuNianXunKong = LunarUtil.getXunKong(liunian[index].getGanZhi());
    obj.liuNianNaYin = LunarUtil.NAYIN[liunian[index].getGanZhi()];
    setCurrentYun(obj);
  };
  return (
    <Flex
      justify="flex-start"
      className="pro-yun-liunian"
      onTouchMove={(e) => {
        e.stopPropagation();
      }}
    >
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
                changeLiuNianInfo(idx);
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
