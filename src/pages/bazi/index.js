import { View, Text } from "@tarojs/components";
import { Radio, Button } from "@taroify/core";
import { ArrowDown } from "@taroify/icons";
import { useSelector, useDispatch } from "react-redux";
import { Lunar, LunarUtil, EightChar } from "./components/lunar";
// import { Lunar, LunarUtil, EightChar } from "lunar-javascript";

import {
  open,
  close,
  openHunagLi,
  closeHunagLi,
  getHuangLiDate,
} from "../../actions/huangli";
import DatePick from "./components/DatePick";
import "./index.less";

const Index = () => {
  const huangli = useSelector((state) => state.huangli);
  const dispatch = useDispatch();
  const openFn = () => {
    dispatch(open());
  };
  var gender = 0;
  var lunar = Lunar.fromYmdHms(1991, 4, 17, 17, 30, gender); //1男，0女
  var solar = lunar.getSolar();
  // console.log("lunar", lunar);
  // console.log("solar", solar);
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
    console.log(gan, ganIndex, zhiIndex);
    var offset = CHANG_SHENG_OFFSET[gan];
    var index = offset + (ganIndex % 2 == 0 ? zhiIndex : -zhiIndex);
    if (index >= 12) {
      index -= 12;
    }
    if (index < 0) {
      index += 12;
    }
    console.log(index, EightChar);
    return EightChar.CHANG_SHENG[index];
  };
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

  // eslint-disable-next-line no-shadow
  const computeEightChar = (lunar, solar, gender) => {
    var bazi = lunar.getEightChar();
    console.log("bazi", bazi);
    bazi.setSect(1);
    var currentYear, startYunSolar, daYun, daYunSize, currentYun;
    if (-1 != gender) {
      var date = new Date();
      currentYear = date.getFullYear();
      var yun = bazi.getYun(gender);
      startYunSolar = yun.getStartSolar();
      daYun = yun.getDaYun();
      daYunSize = daYun.length;
      var currentLunar = Lunar.fromDate(date);
      var yZhi = currentLunar.getYearZhiByLiChun();
      var yHideGan = LunarUtil.ZHI_HIDE_GAN[yZhi];
      var yShiShenZhi = [];
      for (var u = 0, v = yHideGan.length; u < v; u++) {
        yShiShenZhi.push(
          yHideGan[u] +
            "-" +
            LunarUtil.SHI_SHEN_ZHI[bazi.getDayGan() + yZhi + yHideGan[u]]
        );
      }
      var mZhi = currentLunar.getMonthZhi();
      var mHideGan = LunarUtil.ZHI_HIDE_GAN[mZhi];
      var mShiShenZhi = [];
      for (var u = 0, v = mHideGan.length; u < v; u++) {
        mShiShenZhi.push(
          mHideGan[u] +
            "-" +
            LunarUtil.SHI_SHEN_ZHI[bazi.getDayGan() + mZhi + mHideGan[u]]
        );
      }
      var rZhi = currentLunar.getDayZhi();
      var rHideGan = LunarUtil.ZHI_HIDE_GAN[rZhi];
      var rShiShenZhi = [];
      for (var u = 0, v = rHideGan.length; u < v; u++) {
        rShiShenZhi.push(
          rHideGan[u] +
            "-" +
            LunarUtil.SHI_SHEN_ZHI[bazi.getDayGan() + rZhi + rHideGan[u]]
        );
      }
      var sZhi = currentLunar.getTimeZhi();
      var sHideGan = LunarUtil.ZHI_HIDE_GAN[sZhi];
      var sShiShenZhi = [];
      for (var u = 0, v = sHideGan.length; u < v; u++) {
        sShiShenZhi.push(
          sHideGan[u] +
            "-" +
            LunarUtil.SHI_SHEN_ZHI[bazi.getDayGan() + sZhi + sHideGan[u]]
        );
      }
      currentYun = {
        daYunWuXing: "",
        liuNianWuXing:
          LunarUtil.WU_XING_GAN[currentLunar.getYearGanByLiChun()] +
          LunarUtil.WU_XING_ZHI[currentLunar.getYearZhiByLiChun()],
        liuYueWuXing:
          LunarUtil.WU_XING_GAN[currentLunar.getMonthGan()] +
          LunarUtil.WU_XING_ZHI[currentLunar.getMonthZhi()],
        liuRiWuXing:
          LunarUtil.WU_XING_GAN[currentLunar.getDayGan()] +
          LunarUtil.WU_XING_ZHI[currentLunar.getDayZhi()],
        liuShiWuXing:
          LunarUtil.WU_XING_GAN[currentLunar.getTimeGan()] +
          LunarUtil.WU_XING_ZHI[currentLunar.getTimeZhi()],
        daYunDiShi: "",
        liuNianDiShi: getChangSheng(
          bazi.getDayGan(),
          bazi.getDayGanIndex(),
          currentLunar.getYearZhiIndexByLiChun()
        ),
        liuYueDiShi: getChangSheng(
          bazi.getDayGan(),
          bazi.getDayGanIndex(),
          currentLunar.getMonthZhiIndex()
        ),
        liuRiDiShi: getChangSheng(
          bazi.getDayGan(),
          bazi.getDayGanIndex(),
          currentLunar.getDayZhiIndex()
        ),
        liuShiDiShi: getChangSheng(
          bazi.getDayGan(),
          bazi.getDayGanIndex(),
          currentLunar.getTimeZhiIndex()
        ),
        daYunChangSheng: "",
        liuNianChangSheng: getChangSheng(
          currentLunar.getYearGanByLiChun(),
          currentLunar.getYearGanIndexByLiChun(),
          currentLunar.getYearZhiIndexByLiChun()
        ),
        liuYueChangSheng: getChangSheng(
          currentLunar.getMonthGan(),
          currentLunar.getMonthGanIndex(),
          currentLunar.getMonthZhiIndex()
        ),
        liuRiChangSheng: getChangSheng(
          currentLunar.getDayGan(),
          currentLunar.getDayGanIndex(),
          currentLunar.getDayZhiIndex()
        ),
        liuShiChangSheng: getChangSheng(
          currentLunar.getTimeGan(),
          currentLunar.getTimeGanIndex(),
          currentLunar.getTimeZhiIndex()
        ),
        daYunXunKong: "",
        liuNianXunKong: LunarUtil.getXunKong(
          currentLunar.getYearInGanZhiByLiChun()
        ),
        liuYueXunKong: LunarUtil.getXunKong(currentLunar.getMonthInGanZhi()),
        liuRiXunKong: LunarUtil.getXunKong(currentLunar.getDayInGanZhi()),
        liuShiXunKong: LunarUtil.getXunKong(currentLunar.getTimeInGanZhi()),
        daYunNaYin: "",
        liuNianNaYin: LunarUtil.NAYIN[currentLunar.getYearInGanZhiByLiChun()],
        liuYueNaYin: LunarUtil.NAYIN[currentLunar.getMonthInGanZhi()],
        liuRiNaYin: LunarUtil.NAYIN[currentLunar.getDayInGanZhi()],
        liuShiNaYin: LunarUtil.NAYIN[currentLunar.getTimeInGanZhi()],
        daYunShiShen: "",
        daYunShiShenZhi: [],
        liuNianGanZhi: currentLunar.getYearInGanZhiByLiChun(),
        liuNianShiShen:
          LunarUtil.SHI_SHEN_GAN[
            bazi.getDayGan() + currentLunar.getYearGanByLiChun()
          ],
        liuNianShiShenZhi: yShiShenZhi,
        liuYueGanZhi: currentLunar.getMonthInGanZhi(),
        liuYueShiShen:
          LunarUtil.SHI_SHEN_GAN[bazi.getDayGan() + currentLunar.getMonthGan()],
        liuYueShiShenZhi: mShiShenZhi,
        liuRiGanZhi: currentLunar.getDayInGanZhi(),
        liuRiShiShen:
          LunarUtil.SHI_SHEN_GAN[bazi.getDayGan() + currentLunar.getDayGan()],
        liuRiShiShenZhi: rShiShenZhi,
        liuShiGanZhi: currentLunar.getTimeInGanZhi(),
        liuShiShiShen:
          LunarUtil.SHI_SHEN_GAN[bazi.getDayGan() + currentLunar.getTimeGan()],
        liuShiShiShenZhi: sShiShenZhi,
      };
      currentYun.liuNianGan = currentYun.liuNianGanZhi.substr(0, 1);
      currentYun.liuNianZhi = currentYun.liuNianGanZhi.substr(1);
      currentYun.liuYueGan = currentYun.liuYueGanZhi.substr(0, 1);
      currentYun.liuYueZhi = currentYun.liuYueGanZhi.substr(1);
      currentYun.liuRiGan = currentYun.liuRiGanZhi.substr(0, 1);
      currentYun.liuRiZhi = currentYun.liuRiGanZhi.substr(1);
      currentYun.liuShiGan = currentYun.liuShiGanZhi.substr(0, 1);
      currentYun.liuShiZhi = currentYun.liuShiGanZhi.substr(1);
      for (var i = 0; i < daYunSize; i++) {
        var d = daYun[i];
        if (d.getStartYear() <= currentYear && currentYear <= d.getEndYear()) {
          var gz = d.getGanZhi();
          if (gz) {
            var g = gz.substr(0, 1);
            var z = gz.substr(1);
            var zIndex = getZhiIndex(z);
            currentYun.daYunWuXing =
              LunarUtil.WU_XING_GAN[g] + LunarUtil.WU_XING_ZHI[z];
            currentYun.daYunDiShi = getChangSheng(
              bazi.getDayGan(),
              bazi.getDayGanIndex(),
              zIndex
            );
            currentYun.daYunChangSheng = getChangSheng(
              g,
              getGanIndex(g),
              zIndex
            );
            currentYun.daYunXunKong = LunarUtil.getXunKong(gz);
            currentYun.daYunNaYin = LunarUtil.NAYIN[gz];
            currentYun.daYunGan = g;
            currentYun.daYunZhi = z;
            currentYun.daYunGanZhi = gz;
            currentYun.daYunShiShen =
              LunarUtil.SHI_SHEN_GAN[bazi.getDayGan() + g];
            var dHideGan = LunarUtil.ZHI_HIDE_GAN[z];
            var dShiShenZhi = [];
            for (var x = 0, y = dHideGan.length; x < y; x++) {
              dShiShenZhi.push(
                dHideGan[x] +
                  "-" +
                  LunarUtil.SHI_SHEN_ZHI[bazi.getDayGan() + z + dHideGan[x]]
              );
            }
            currentYun.daYunShiShenZhi = dShiShenZhi;
          }
          break;
        }
      }
    }
    console.log(currentYear, startYunSolar, daYun, daYunSize, currentYun);
  };
  computeEightChar(lunar, solar, gender);
  return (
    <View className="bazi">
      <View className="pick-date-btn">
        <View block variant="outlined" className="bazi-btn" onClick={openFn}>
          请选择出生生辰{huangli.getBaziDate}时
          <ArrowDown />
        </View>
      </View>
      <View className="sex-box">
        <Text>请选择性别：</Text>
        <Radio.Group defaultValue="" className="sex" direction="horizontal">
          <Radio name="1">男</Radio>
          <Radio name="2">女</Radio>
        </Radio.Group>
      </View>
      <View className="sex-box">
        <Text>请选择日历：</Text>
        <Radio.Group defaultValue="" className="sex" direction="horizontal">
          <Radio name="1">阳历</Radio>
          <Radio name="2">阴历</Radio>
        </Radio.Group>
      </View>
      <Button
        variant="contained"
        color="primary"
        size="large"
        shape="round"
        className="btn"
      >
        确定
      </Button>
      <View>
        <DatePick />
      </View>
    </View>
  );
};

export default Index;
