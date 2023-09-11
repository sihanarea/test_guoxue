import { View, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import { Radio, Button, Tabs, Image } from "@taroify/core";
import { ArrowDown } from "@taroify/icons";
import { useSelector, useDispatch } from "react-redux";
import { Lunar, LunarUtil, EightChar } from "./components/lunar";
import GetCangGan from "./components/GetCangGan";
import useShenSha from "./Hooks/useShenSha";
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
  var gender = 1;
  var lunar = Lunar.fromYmdHms(1991, 4, 17, 16, 30, gender); //1男，0女
  var solar = lunar.getSolar();
  var currentBazi = lunar.getEightChar();
  currentBazi.setSect(1);
  const { shenShaYear, shenShaMonth, shenShaDay, shenShaTime } = useShenSha(
    lunar,
    gender,
    currentBazi
  );
  console.log("神煞", shenShaYear, shenShaMonth, shenShaDay, shenShaTime);

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
    console.log("=====", bazi.getYearShiShenZhi());
  };
  computeEightChar(lunar, solar, gender);

  const colorHandle = (tiangandizhi) => {
    const tiangandizhiArr = {
      mu: ["甲", "乙", "寅", "卯"],
      huo: ["丙", "丁", "巳", "午"],
      shui: ["壬", "癸", "子", "亥"],
      jin: ["庚", "辛", "申", "酉"],
      tu: ["戊", "己", "丑", "辰", "未", "戌"],
    };
    let colors = "";
    if (tiangandizhiArr.mu.includes(tiangandizhi)) {
      colors = "mu";
    }
    if (tiangandizhiArr.huo.includes(tiangandizhi)) {
      colors = "huo";
    }
    if (tiangandizhiArr.shui.includes(tiangandizhi)) {
      colors = "shui";
    }
    if (tiangandizhiArr.jin.includes(tiangandizhi)) {
      colors = "jin";
    }
    if (tiangandizhiArr.tu.includes(tiangandizhi)) {
      colors = "tu";
    }
    return colors;
  };
  const ImgHandle = (tiangandizhi) => {
    const tiangandizhiArr = {
      mu: ["甲", "乙", "寅", "卯"],
      huo: ["丙", "丁", "巳", "午"],
      shui: ["壬", "癸", "子", "亥"],
      jin: ["庚", "辛", "申", "酉"],
      tu: ["戊", "己", "丑", "辰", "未", "戌"],
    };
    let imgs = "";
    if (tiangandizhiArr.mu.includes(tiangandizhi)) {
      imgs = require("../../assets/images/mu.png");
    }
    if (tiangandizhiArr.huo.includes(tiangandizhi)) {
      imgs = require("../../assets/images/huo.png");
    }
    if (tiangandizhiArr.shui.includes(tiangandizhi)) {
      imgs = require("../../assets/images/shui.png");
    }
    if (tiangandizhiArr.jin.includes(tiangandizhi)) {
      imgs = require("../../assets/images/jin.png");
    }
    if (tiangandizhiArr.tu.includes(tiangandizhi)) {
      imgs = require("../../assets/images/tu1.png");
    }
    return imgs;
  };
  return (
    <View className="bazi">
      <View className="date-pick-box">
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
      </View>
      <View className="pan">
        <Tabs animated swipeable>
          <Tabs.TabPane title="基本命盘">
            <View className="base">
              <View className="birthday">
                <View className="birthday-item">阳历:1991-05-30 16:00:00</View>
                <View className="birthday-item">
                  阴历:1991年四月十七 申时{" "}
                  <Text className="qian">（乾造）</Text>
                </View>
              </View>
              <View className="base-zhu">
                <Text className="base-zhu-text">日期</Text>
                <Text className="base-zhu-text">年柱</Text>
                <Text className="base-zhu-text">月柱</Text>
                <Text className="base-zhu-text">日柱</Text>
                <Text className="base-zhu-text">时柱</Text>
              </View>
              <View className="base-zhuxing">
                <Text className="base-zhuxing-text">主星</Text>
                <Text className="base-zhuxing-text bold">
                  {currentBazi.getYearShiShenGan()}
                </Text>
                <Text className="base-zhuxing-text bold">
                  {currentBazi.getMonthShiShenGan()}
                </Text>
                <Text className="base-zhuxing-text bold">
                  元{gender === 1 ? "男" : "女"}
                </Text>
                <Text className="base-zhuxing-text bold">
                  {currentBazi.getTimeShiShenGan()}
                </Text>
              </View>
              <View className="base-tiangan">
                <Text className="base-tiangan-text-tit">天干</Text>
                <View
                  className={`base-tiangan-text bold ${colorHandle(
                    currentBazi.getYearGan()
                  )}`}
                >
                  {currentBazi.getYearGan()}
                  <Image
                    src={ImgHandle(currentBazi.getYearGan())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
                <View
                  className={`base-tiangan-text bold ${colorHandle(
                    currentBazi.getMonthGan()
                  )}`}
                >
                  {currentBazi.getMonthGan()}
                  <Image
                    src={ImgHandle(currentBazi.getMonthGan())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
                <View
                  className={`base-tiangan-text bold ${colorHandle(
                    currentBazi.getDayGan()
                  )}`}
                >
                  {currentBazi.getDayGan()}
                  <Image
                    src={ImgHandle(currentBazi.getDayGan())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
                <View
                  className={`base-tiangan-text bold ${colorHandle(
                    currentBazi.getTimeGan()
                  )}`}
                >
                  {currentBazi.getTimeGan()}
                  <Image
                    src={ImgHandle(currentBazi.getTimeGan())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
              </View>
              <View className="base-dizhi">
                <Text className="base-dizhi-text-tit">地支</Text>
                <View
                  className={`base-dizhi-text bold ${colorHandle(
                    currentBazi.getYearZhi()
                  )}`}
                >
                  {currentBazi.getYearZhi()}
                  <Image
                    src={ImgHandle(currentBazi.getYearZhi())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
                <View
                  className={`base-dizhi-text bold ${colorHandle(
                    currentBazi.getMonthZhi()
                  )}`}
                >
                  {currentBazi.getMonthZhi()}
                  <Image
                    src={ImgHandle(currentBazi.getMonthZhi())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
                <View
                  className={`base-dizhi-text bold ${colorHandle(
                    currentBazi.getDayZhi()
                  )}`}
                >
                  {currentBazi.getDayZhi()}
                  <Image
                    src={ImgHandle(currentBazi.getDayZhi())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
                <View
                  className={`base-dizhi-text bold ${colorHandle(
                    currentBazi.getTimeZhi()
                  )}`}
                >
                  {currentBazi.getTimeZhi()}
                  <Image
                    src={ImgHandle(currentBazi.getTimeZhi())}
                    style={{
                      width: "30rpx",
                      height: "30rpx",
                      marginLeft: "10rpx",
                    }}
                  />
                </View>
              </View>
              <View className="base-canggan">
                <Text className="base-canggan-text">藏干</Text>
                <View>
                  <GetCangGan
                    data={currentBazi.getYearHideGan()}
                    colorHandle={colorHandle}
                  />
                </View>
                <View>
                  <GetCangGan
                    data={currentBazi.getMonthHideGan()}
                    colorHandle={colorHandle}
                  />
                </View>
                <View>
                  <GetCangGan
                    data={currentBazi.getDayHideGan()}
                    colorHandle={colorHandle}
                  />
                </View>
                <View>
                  <GetCangGan
                    data={currentBazi.getTimeHideGan()}
                    colorHandle={colorHandle}
                  />
                </View>
              </View>
              <View className="base-shishen">
                <Text className="base-shishen-text">十神</Text>
                <View>
                  {currentBazi.getYearShiShenZhi().map((item, index) => (
                    <View className="base-shishen-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
                <View>
                  {currentBazi.getMonthShiShenZhi().map((item, index) => (
                    <View className="base-shishen-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
                <View>
                  {currentBazi.getDayShiShenZhi().map((item, index) => (
                    <View className="base-shishen-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
                <View>
                  {currentBazi.getTimeShiShenZhi().map((item, index) => (
                    <View className="base-shishen-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
              </View>
              <View className="base-xingyun">
                <Text className="base-xingyun-text">星运</Text>
                <View className="base-xingyun-text">
                  {currentBazi.getYearDiShi()}
                </View>
                <View className="base-xingyun-text">
                  {currentBazi.getMonthDiShi()}
                </View>
                <View className="base-xingyun-text">
                  {currentBazi.getDayDiShi()}
                </View>
                <View className="base-xingyun-text">
                  {currentBazi.getTimeDiShi()}
                </View>
              </View>
              <View className="base-zizuo">
                <Text className="base-zizuo-text">自坐</Text>
                <View className="base-zizuo-text">
                  {getChangSheng(
                    currentBazi.getYearGan(),
                    lunar.getYearGanIndexExact(),
                    lunar.getYearZhiIndexExact()
                  )}
                </View>
                <View className="base-zizuo-text">
                  {getChangSheng(
                    currentBazi.getMonthGan(),
                    lunar.getMonthGanIndexExact(),
                    lunar.getMonthZhiIndexExact()
                  )}
                </View>
                <View className="base-zizuo-text">
                  {getChangSheng(
                    currentBazi.getDayGan(),
                    lunar.getDayGanIndexExact(),
                    lunar.getDayZhiIndexExact()
                  )}
                </View>
                <View className="base-zizuo-text">
                  {getChangSheng(
                    currentBazi.getTimeGan(),
                    lunar.getTimeGanIndex(),
                    lunar.getTimeZhiIndex()
                  )}
                </View>
              </View>
              <View className="base-kongwang">
                <Text className="base-kongwang-text">空亡</Text>
                <View className="base-kongwang-text">
                  {currentBazi.getYearXunKong()}
                </View>
                <View className="base-kongwang-text">
                  {currentBazi.getMonthXunKong()}
                </View>
                <View className="base-kongwang-text">
                  {currentBazi.getDayXunKong()}
                </View>
                <View className="base-kongwang-text">
                  {currentBazi.getTimeXunKong()}
                </View>
              </View>
              <View className="base-nayin">
                <Text className="base-nayin-text">纳音</Text>
                <View className="base-nayin-text">
                  {currentBazi.getYearNaYin()}
                </View>
                <View className="base-nayin-text">
                  {currentBazi.getMonthNaYin()}
                </View>
                <View className="base-nayin-text">
                  {currentBazi.getDayNaYin()}
                </View>
                <View className="base-nayin-text">
                  {currentBazi.getTimeNaYin()}
                </View>
              </View>
              <View className="base-shensha">
                <Text className="base-shensha-text-tit">神煞</Text>
                <View>
                  {shenShaYear.map((item, index) => (
                    <View className="base-shensha-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
                <View>
                  {shenShaMonth.map((item, index) => (
                    <View className="base-shensha-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
                <View>
                  {shenShaDay.map((item, index) => (
                    <View className="base-shensha-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
                <View>
                  {shenShaTime.map((item, index) => (
                    <View className="base-shensha-text" key={index}>
                      {item}
                    </View>
                  ))}
                </View>
              </View>
              <View>天干留意：</View>
              <View>地支留意：</View>
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="专业细盘">
            <View className="pro">专业盘</View>
          </Tabs.TabPane>
        </Tabs>
      </View>
      <View>
        <DatePick />
      </View>
    </View>
  );
};

export default Index;
