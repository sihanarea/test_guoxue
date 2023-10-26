import { View, Text, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Radio,
  Button,
  Tabs,
  Image,
  Tag,
  Toast,
  Flex,
  Cell,
} from "@taroify/core";
import { ArrowDown } from "@taroify/icons";
import { useSelector, useDispatch } from "react-redux";
import { Lunar, LunarUtil, EightChar, Solar } from "./components/lunar";
import GetCangGan from "./components/GetCangGan";
import useShenSha from "./Hooks/useShenSha";
import useXingChongHehai from "./Hooks/useXingChongHeHai";
import Liuyue from "./components/Liuyue";
import Liunian from "./components/Liunian";
import Dayun from "./components/Dayun";
import Birthday from "./components/Birthday";

import { open, openArea } from "../../actions/huangli";
import DatePick from "./components/DatePick";
import AreaPick from "./components/AreaPick";
import "./index.less";

const Index = () => {
  const huangli = useSelector((state) => state.huangli);
  const [sexValue, setSexValue] = useState("");
  const [liValue, setLiValue] = useState();
  const [showPan, setShowPan] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastValue, setToastValue] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [lunar, setLunar] = useState("");
  const [solar, setSolar] = useState("");
  const [name, setName] = useState("");
  const [currentBazi, setCurrentBazi] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [startYunSolar, setStartYunSolar] = useState("");
  const [daYun, setDaYun] = useState("");
  // const [daYunSize, setDaYunSize] = useState("");
  const [currentYun, setCurrentYun] = useState("");
  const [dayunIndex, setDayunIndex] = useState(1);
  const [liunianIndex, setLiunianIndex] = useState(1);

  const dispatch = useDispatch();

  const openFn = (type) => {
    if (type === "area") {
      dispatch(openArea());
    } else {
      dispatch(open());
    }
  };

  const getName = (e) => {
    console.log("name", e.target.value);
    setName(e.target.value);
  };

  const initBazi = () => {
    //阳历1，阴历0
    var year, month, day, hour;
    hour = Number(huangli.getBaziDate.split(" ")[1]);

    if (liValue === "1") {
      const ymd = huangli.getBaziDate.split(" ")[0];
      const so = Solar.fromDate(new Date(ymd));
      year = Number(so.getLunar().getYear());
      month = Number(so.getLunar().getMonth());
      day = Number(so.getLunar().getDay());
    } else {
      year = Number(huangli.getBaziDate.split("-")[0]);
      month = Number(huangli.getBaziDate.split("-")[1]);
      day = Number(huangli.getBaziDate.split("-")[2].split(" ")[0]);
    }
    const lunarObj = Lunar.fromYmdHms(year, month, day, hour, 30, sexValue);
    addHistory({ name, year, month, day, hour, sexValue, liValue });
    const solarObj = lunarObj.getSolar();
    const currBaziObj = lunarObj.getEightChar();
    currBaziObj.setSect(2);
    computeEightChar(lunarObj);
    setLunar(lunarObj); //1男，0女
    setSolar(solarObj);
    setCurrentBazi(currBaziObj);
  };
  const historyInit = (item) => {
    //阳历1，阴历0
    var year = Number(item.year),
      month = Number(item.month),
      day = Number(item.day),
      hour = Number(item.hour);
    setSexValue(item.sex);
    // if (item.liValue === "1") {
    //   const ymd = dayjs().format(`${year}-${month}-${day}`);
    //   const so = Solar.fromDate(new Date(ymd));
    //   year = Number(so.getLunar().getYear());
    //   month = Number(so.getLunar().getMonth());
    //   day = Number(so.getLunar().getDay());
    // }
    const lunarObj = Lunar.fromYmdHms(year, month, day, hour, 30, item.sex);
    const solarObj = lunarObj.getSolar();
    const currBaziObj = lunarObj.getEightChar();
    currBaziObj.setSect(2);
    computeEightChar(lunarObj);
    setLunar(lunarObj); //1男，0女
    setSolar(solarObj);
    setCurrentBazi(currBaziObj);
    setShowPan(true);
  };
  const randomPan = () => {
    const year = Math.floor(Math.random() * (2009 - 1930 + 1) + 1930);
    const month = Math.floor(Math.random() * (12 - 1 + 1) + 1);
    const day = Math.floor(Math.random() * (31 - 1 + 1) + 1);
    const hour = Math.floor(Math.random() * (24 - 0 + 0) + 0);
    setSexValue(String(Math.round(Math.random())));

    setTimeout(() => {
      const lunarObj = Lunar.fromYmdHms(year, month, day, hour, 30, sexValue);
      const solarObj = lunarObj.getSolar();
      const currBaziObj = lunarObj.getEightChar();
      currBaziObj.setSect(2);
      computeEightChar(lunarObj);
      setLunar(lunarObj); //1男，0女
      setSolar(solarObj);
      setCurrentBazi(currBaziObj);
      setShowPan(true);
    }, 500);
  };
  const addHistory = (time) => {
    console.log("time", time);
    const hisData = Taro.getStorageSync("history")
      ? JSON.parse(Taro.getStorageSync("history"))
      : [];
    let timeArr = [].concat(hisData);
    console.log(hisData, timeArr);
    timeArr.unshift({
      name: time.name ? time.name : "匿名",
      liValue: time.liValue,
      sex: time.sexValue,
      year: time.year,
      month: time.month,
      day: time.day,
      hour: time.hour,
    });
    timeArr = timeArr.length > 5 ? timeArr.pop() : timeArr;
    const timeStr = JSON.stringify(timeArr);
    Taro.setStorageSync("history", timeStr);
  };

  const {
    shenShaYear,
    shenShaMonth,
    shenShaDay,
    shenShaTime,
    shenShadaYun,
    shenShaliuNian,
  } =
    lunar &&
    currentBazi &&
    currentYun &&
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useShenSha(lunar, sexValue, currentBazi, currentYun);
  const { tianganliuyi, dizhiliuyi } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentBazi && currentYun && useXingChongHehai(currentBazi, currentYun);

  //确定排盘
  const confirmPan = () => {
    if (!sexValue) {
      setToastValue("您还没选择性别！");
      setToastOpen(true);
    } else if (!liValue) {
      setToastValue("您还没选择阴历还是阳历！");
      setToastOpen(true);
    } else if (!huangli.getAreaData?.provice) {
      setToastValue("您还没选择出生地点！");
      setToastOpen(true);
    }
    var year =
      new Date().getFullYear() - Number(huangli.getBaziDate.split("-")[0]);
    if (year > 12) {
      if (sexValue && liValue && huangli.getAreaData?.provice) {
        setShowPan(true);
        initBazi();
      }
    } else {
      setToastOpen(true);
    }
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

  const dayunChange = (index) => {
    setDayunIndex(index);
  };
  const liunianChange = (index) => {
    setLiunianIndex(index);
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

  const currentToday = () => {
    computeEightChar(lunar);
  };

  const computeEightChar = (lunarObj) => {
    var currentYearObj, startYunSolarObj, daYunObj, daYunSizeObj, currentYunObj;
    var bazi = lunarObj.getEightChar();
    var date = new Date();
    currentYearObj = date.getFullYear();
    var yun = bazi.getYun(Number(sexValue), 2);
    startYunSolarObj = yun.getStartSolar();
    daYunObj = yun.getDaYun();
    daYunSizeObj = daYunObj.length;
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

    var currentYunObj = {
      daYunWuXing: "",

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

      daYunXunKong: "",
      liuNianXunKong: LunarUtil.getXunKong(
        currentLunar.getYearInGanZhiByLiChun()
      ),
      liuYueXunKong: LunarUtil.getXunKong(currentLunar.getMonthInGanZhi()),

      daYunNaYin: "",
      liuNianNaYin: LunarUtil.NAYIN[currentLunar.getYearInGanZhiByLiChun()],
      liuYueNaYin: LunarUtil.NAYIN[currentLunar.getMonthInGanZhi()],

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
    };

    for (var i = 0; i < daYunSizeObj; i++) {
      var d = daYunObj[i];
      if (
        d.getStartYear() <= currentYearObj &&
        currentYearObj <= d.getEndYear()
      ) {
        dayunChange(i); //获取大运位置
        var liunian = d.getLiuNian();

        for (var lnIndex = 0; lnIndex < liunian.length; lnIndex++) {
          var liunianObj = liunian[lnIndex];
          if (liunianObj.getYear() == currentYearObj) {
            liunianChange(liunianObj.getIndex());
          }
        }

        // liunianChange
        var gz = d.getGanZhi();
        if (gz) {
          var g = gz.substr(0, 1);
          var z = gz.substr(1);
          var zIndex = getZhiIndex(z);
          currentYunObj.daYunDiShi = getChangSheng(
            bazi.getDayGan(),
            bazi.getDayGanIndex(),
            zIndex
          );
          currentYunObj.daYunChangSheng = getChangSheng(
            g,
            getGanIndex(g),
            zIndex
          );
          currentYunObj.daYunXunKong = LunarUtil.getXunKong(gz);
          currentYunObj.daYunNaYin = LunarUtil.NAYIN[gz];

          currentYunObj.daYunGanZhi = gz;
          currentYunObj.daYunShiShen =
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
          currentYunObj.daYunShiShenZhi = dShiShenZhi;
        }
        break;
      }
    }
    setCurrentYear(currentYearObj);
    setStartYunSolar(startYunSolarObj);
    setDaYun(daYunObj);
    // setDaYunSize(daYunSizeObj);
    setCurrentYun(currentYunObj);
  };

  const color2Handle = (wuxing) => {
    let colors = "";
    let strWuxing = String(wuxing);
    if (strWuxing.includes("金")) {
      colors = "#e89126";
    } else if (strWuxing.includes("木")) {
      colors = "#30d04f";
    } else if (strWuxing.includes("水")) {
      colors = "#3287ef";
    } else if (strWuxing.includes("火")) {
      colors = "#d40719";
    } else if (strWuxing.includes("土")) {
      colors = "#8a6e17";
    }

    return colors;
  };
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

  const HighlightText = (text) => {
    const targetArray = ["金", "木", "水", "火", "土"];
    for (let i = 0; i < targetArray.length; i++) {
      // 使用正则表达式进行全局匹配，忽略大小写
      let pattern = new RegExp(targetArray[i], "gi");

      // 替换匹配到的文本，并添加颜色
      text = text.replace(
        pattern,
        `<Text style="fontWeight:bold;color:${color2Handle(pattern)}">$&</Text>`
      );
    }

    return <View dangerouslySetInnerHTML={{ __html: text }}></View>;
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
  const onShareAppMessage = () => {
    return {
      title: "八字排盘",
      path: "/pages/bazi",
    };
  };
  const onShareTimeline = () => {
    return {
      title: "八字排盘",
      path: "/pages/bazi",
    };
  };
  const getStoreHistry = () => {
    const hisData = Taro.getStorageSync("history")
      ? JSON.parse(Taro.getStorageSync("history"))
      : [];
    setHistoryList(hisData);
  };
  useEffect(() => {
    onShareAppMessage();
    onShareTimeline();
    getStoreHistry();
  }, []);

  return (
    <View className="bazi">
      {!showPan ? (
        <View className="date-pick-box">
          <View className="pick-date-btn">
            <View
              block
              variant="outlined"
              className="bazi-btn"
              onClick={openFn}
            >
              请选择出生生辰{huangli.getBaziDate}时
              <ArrowDown />
            </View>
          </View>
          <View className="name-box">
            <Text>请输入名字：</Text>
            <Input
              placeholder="请输入名字"
              defaultValue={name}
              onBlur={(e) => getName(e)}
            />
          </View>
          <View className="sex-box">
            <Text>请选择性别：</Text>
            <Radio.Group
              defaultValue=""
              value={sexValue}
              onChange={setSexValue}
              className="sex"
              direction="horizontal"
            >
              <Radio name="1" className="radio">
                男
              </Radio>
              <Radio name="0" className="radio">
                女
              </Radio>
            </Radio.Group>
          </View>
          <View className="sex-box">
            <Text>请选择日历：</Text>
            <Radio.Group
              value={liValue}
              onChange={setLiValue}
              defaultValue=""
              className="sex"
              direction="horizontal"
            >
              <Radio name="1" className="radio">
                阳历
              </Radio>
              <Radio name="0" className="radio">
                阴历
              </Radio>
            </Radio.Group>
          </View>
          <View
            className="select-address"
            onClick={() => {
              openFn("area");
            }}
          >
            选择出生地点
            <ArrowDown />
          </View>
          {huangli.getAreaData?.provice && (
            <View className="area-data">{`${huangli.getAreaData?.provice}-${huangli.getAreaData?.city}-${huangli.getAreaData?.county}`}</View>
          )}

          <View className="btn-box">
            <Button
              variant="contained"
              color="primary"
              size="large"
              shape="round"
              className="btn"
              onClick={confirmPan}
            >
              确定
            </Button>
          </View>
          <View className="btn-box">
            <Button
              variant="contained"
              color="primary"
              size="large"
              shape="round"
              className="btn"
              onClick={randomPan}
            >
              随机一个
            </Button>
          </View>
          {historyList.length > 0 && (
            <View className="btn-box-history">
              <View className="history-tit">历史记录</View>
              {historyList.map((item, idx) => {
                return (
                  <View key={idx} onClick={() => historyInit(item)}>
                    <Cell.Group>
                      <Cell
                        title={item.name}
                        brief={`阴历:${item.year}年${item.month}月${item.day}日 ${item.hour}时`}
                      >
                        {item.sex === "1" ? "男" : "女"}
                      </Cell>
                    </Cell.Group>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      ) : (
        <>
          {lunar !== "" && currentBazi !== "" && (
            // <Snapshot>
            <View className="pan">
              <Tabs animated swipeable>
                <Tabs.TabPane title="基本命盘">
                  <View className="base">
                    <Birthday solar={solar} lunar={lunar} sexValue={sexValue} />
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
                        元{sexValue === 1 ? "男" : "女"}
                      </Text>
                      <Text className="base-zhuxing-text bold">
                        {currentBazi.getTimeShiShenGan()}
                      </Text>
                    </View>
                    <View className="base-tiangan">
                      <Text className="base-tiangan-text-tit">天干</Text>
                      <View
                        className={`base-tiangan-text bold ${colorHandle(
                          currentBazi?.getYearGan()
                        )}`}
                      >
                        {currentBazi?.getYearGan()}
                        <Image
                          src={ImgHandle(currentBazi?.getYearGan())}
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
                          currentBazi?.getYearGan(),
                          lunar?.getYearGanIndexExact(),
                          lunar.getYearZhiIndexExact()
                        ).length === 1
                          ? `${
                              getChangSheng(
                                currentBazi?.getYearGan(),
                                lunar?.getYearGanIndexExact(),
                                lunar.getYearZhiIndexExact()
                              ) + " "
                            }`
                          : getChangSheng(
                              currentBazi?.getYearGan(),
                              lunar?.getYearGanIndexExact(),
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
                        {shenShaYear &&
                          shenShaYear?.map((item, index) => (
                            <View className="base-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShaMonth &&
                          shenShaMonth?.map((item, index) => (
                            <View className="base-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShaDay &&
                          shenShaDay?.map((item, index) => (
                            <View className="base-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShaTime &&
                          shenShaTime?.map((item, index) => (
                            <View className="base-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                    </View>
                    <View className="base-liuyi">
                      <Tag
                        className="base-liuyi-text-tit"
                        children="天干留意"
                      />
                      {tianganliuyi.length > 1
                        ? tianganliuyi.map((item, index) => (
                            <View key={index} className="base-liuyi-view">
                              {HighlightText(item)}
                            </View>
                          ))
                        : "无"}
                    </View>
                    <View className="base-liuyi">
                      <Tag
                        className="base-liuyi-text-tit"
                        children="地支留意"
                      />
                      {dizhiliuyi.length > 1
                        ? dizhiliuyi.map((item, index) => (
                            <View key={index} className="base-liuyi-text">
                              {HighlightText(item)}
                            </View>
                          ))
                        : "无"}
                    </View>
                  </View>
                </Tabs.TabPane>
                <Tabs.TabPane title="专业细盘">
                  <View className="pro">
                    <Birthday solar={solar} lunar={lunar} sexValue={sexValue} />
                    <View className="pro-zhu">
                      <Text className="pro-zhu-text">日期</Text>
                      <Text className="pro-zhu-text">流年</Text>
                      <Text className="pro-zhu-text">大运</Text>
                      <Text className="pro-zhu-text">年柱</Text>
                      <Text className="pro-zhu-text">月柱</Text>
                      <Text className="pro-zhu-text">日柱</Text>
                      <Text className="pro-zhu-text">时柱</Text>
                    </View>
                    <View className="pro-zhuxing">
                      <Text className="pro-zhuxing-text">主星</Text>
                      <Text className="pro-zhuxing-text bold">
                        {currentYun.liuNianShiShen}
                      </Text>
                      <Text className="pro-zhuxing-text bold">
                        {" "}
                        {currentYun.daYunShiShen}
                      </Text>
                      <Text className="pro-zhuxing-text bold">
                        {currentBazi.getYearShiShenGan()}
                      </Text>
                      <Text className="pro-zhuxing-text bold">
                        {currentBazi.getMonthShiShenGan()}
                      </Text>
                      <Text className="pro-zhuxing-text bold">
                        元{sexValue == 1 ? "男" : "女"}
                      </Text>
                      <Text className="pro-zhuxing-text bold">
                        {currentBazi.getTimeShiShenGan()}
                      </Text>
                    </View>
                    <View className="pro-tiangan">
                      <Text className="pro-tiangan-text-tit">天干</Text>
                      <View
                        className={`pro-tiangan-text bold ${colorHandle(
                          currentYun.liuNianGanZhi.substr(0, 1)
                        )}`}
                      >
                        {currentYun.liuNianGanZhi.substr(0, 1)}
                        <Image
                          src={ImgHandle(currentYun.liuNianGanZhi.substr(0, 1))}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-tiangan-text bold ${colorHandle(
                          currentYun.daYunGanZhi.substr(0, 1)
                        )}`}
                      >
                        {currentYun.daYunGanZhi.substr(0, 1)}
                        <Image
                          src={ImgHandle(currentYun.daYunGanZhi.substr(0, 1))}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-tiangan-text bold ${colorHandle(
                          currentBazi?.getYearGan()
                        )}`}
                      >
                        {currentBazi?.getYearGan()}
                        <Image
                          src={ImgHandle(currentBazi?.getYearGan())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-tiangan-text bold ${colorHandle(
                          currentBazi.getMonthGan()
                        )}`}
                      >
                        {currentBazi.getMonthGan()}
                        <Image
                          src={ImgHandle(currentBazi.getMonthGan())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-tiangan-text bold ${colorHandle(
                          currentBazi.getDayGan()
                        )}`}
                      >
                        {currentBazi.getDayGan()}
                        <Image
                          src={ImgHandle(currentBazi.getDayGan())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-tiangan-text bold ${colorHandle(
                          currentBazi.getTimeGan()
                        )}`}
                      >
                        {currentBazi.getTimeGan()}
                        <Image
                          src={ImgHandle(currentBazi.getTimeGan())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                    </View>
                    <View className="pro-dizhi">
                      <Text className="pro-dizhi-text-tit">地支</Text>
                      <View
                        className={`pro-dizhi-text bold ${colorHandle(
                          currentYun.liuNianGanZhi.substr(1)
                        )}`}
                      >
                        {currentYun.liuNianGanZhi.substr(1)}
                        <Image
                          src={ImgHandle(currentYun.liuNianGanZhi.substr(1))}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-dizhi-text bold ${colorHandle(
                          currentYun.daYunGanZhi.substr(1)
                        )}`}
                      >
                        {currentYun.daYunGanZhi.substr(1)}
                        <Image
                          src={ImgHandle(currentYun.daYunGanZhi.substr(1))}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-dizhi-text bold ${colorHandle(
                          currentBazi.getYearZhi()
                        )}`}
                      >
                        {currentBazi.getYearZhi()}
                        <Image
                          src={ImgHandle(currentBazi.getYearZhi())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-dizhi-text bold ${colorHandle(
                          currentBazi.getMonthZhi()
                        )}`}
                      >
                        {currentBazi.getMonthZhi()}
                        <Image
                          src={ImgHandle(currentBazi.getMonthZhi())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-dizhi-text bold ${colorHandle(
                          currentBazi.getDayZhi()
                        )}`}
                      >
                        {currentBazi.getDayZhi()}
                        <Image
                          src={ImgHandle(currentBazi.getDayZhi())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                      <View
                        className={`pro-dizhi-text bold ${colorHandle(
                          currentBazi.getTimeZhi()
                        )}`}
                      >
                        {currentBazi.getTimeZhi()}
                        <Image
                          src={ImgHandle(currentBazi.getTimeZhi())}
                          style={{
                            width: "30rpx",
                            height: "30rpx",
                            marginLeft: "0rpx",
                          }}
                        />
                      </View>
                    </View>
                    <View className="pro-canggan">
                      <Text className="pro-canggan-text">藏干</Text>
                      <View>
                        <GetCangGan
                          proData={currentYun.liuNianShiShenZhi}
                          colorHandle={colorHandle}
                          type="pro"
                        />
                      </View>
                      <View>
                        <GetCangGan
                          proData={currentYun.daYunShiShenZhi}
                          colorHandle={colorHandle}
                          type="pro"
                        />
                      </View>
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
                    <View className="pro-shishen">
                      <Text className="pro-shishen-text">十神</Text>
                      <View>
                        {currentYun.liuNianShiShenZhi.map((item, index) => (
                          <View className="pro-shishen-text" key={index}>
                            {item.split("-")[1]}
                          </View>
                        ))}
                      </View>
                      <View>
                        {currentYun.daYunShiShenZhi.map((item, index) => (
                          <View className="pro-shishen-text" key={index}>
                            {item.split("-")[1]}
                          </View>
                        ))}
                      </View>

                      <View>
                        {currentBazi.getYearShiShenZhi().map((item, index) => (
                          <View className="pro-shishen-text" key={index}>
                            {item}
                          </View>
                        ))}
                      </View>
                      <View>
                        {currentBazi.getMonthShiShenZhi().map((item, index) => (
                          <View className="pro-shishen-text" key={index}>
                            {item}
                          </View>
                        ))}
                      </View>
                      <View>
                        {currentBazi.getDayShiShenZhi().map((item, index) => (
                          <View className="pro-shishen-text" key={index}>
                            {item}
                          </View>
                        ))}
                      </View>
                      <View>
                        {currentBazi.getTimeShiShenZhi().map((item, index) => (
                          <View className="pro-shishen-text" key={index}>
                            {item}
                          </View>
                        ))}
                      </View>
                    </View>
                    <View className="pro-xingyun">
                      <Text className="pro-xingyun-text">星运</Text>
                      <View className="pro-xingyun-text">
                        {currentYun.liuNianDiShi.length === 1
                          ? `${currentYun.liuNianDiShi + "　"}`
                          : currentYun.liuNianDiShi}
                      </View>
                      <View className="pro-xingyun-text">
                        {currentYun.daYunDiShi.length === 1
                          ? `${currentYun.daYunDiShi + "　"}`
                          : currentYun.daYunDiShi}
                      </View>
                      <View className="pro-xingyun-text">
                        {currentBazi.getYearDiShi().length === 1
                          ? `${currentBazi.getYearDiShi() + "　"}`
                          : currentBazi.getYearDiShi()}
                      </View>
                      <View className="pro-xingyun-text">
                        {currentBazi.getMonthDiShi().length === 1
                          ? `${currentBazi.getMonthDiShi() + "　"}`
                          : currentBazi.getMonthDiShi()}
                      </View>
                      <View className="pro-xingyun-text">
                        {currentBazi.getDayDiShi().length === 1
                          ? `${currentBazi.getDayDiShi() + "　"}`
                          : currentBazi.getDayDiShi()}
                      </View>
                      <View className="pro-xingyun-text">
                        {currentBazi.getTimeDiShi().length === 1
                          ? `${currentBazi.getTimeDiShi() + "　"}`
                          : currentBazi.getTimeDiShi()}
                      </View>
                    </View>
                    <View className="pro-zizuo">
                      <Text className="pro-zizuo-text">自坐</Text>
                      <View className="pro-zizuo-text">
                        {currentYun.liuNianChangSheng.length === 1
                          ? `${currentYun.liuNianChangSheng + "　"}`
                          : currentYun.liuNianChangSheng}
                      </View>
                      <View className="pro-zizuo-text">
                        {currentYun.daYunChangSheng.length === 1
                          ? `${currentYun.daYunChangSheng + "　"}`
                          : currentYun.daYunChangSheng}
                      </View>
                      <View className="pro-zizuo-text">
                        {getChangSheng(
                          currentBazi?.getYearGan(),
                          lunar?.getYearGanIndexExact(),
                          lunar.getYearZhiIndexExact()
                        ).length === 1
                          ? `${
                              getChangSheng(
                                currentBazi?.getYearGan(),
                                lunar?.getYearGanIndexExact(),
                                lunar.getYearZhiIndexExact()
                              ) + "　"
                            }`
                          : getChangSheng(
                              currentBazi?.getYearGan(),
                              lunar?.getYearGanIndexExact(),
                              lunar.getYearZhiIndexExact()
                            )}
                      </View>
                      <View className="pro-zizuo-text">
                        {getChangSheng(
                          currentBazi?.getMonthGan(),
                          lunar?.getMonthGanIndexExact(),
                          lunar.getMonthZhiIndexExact()
                        ).length === 1
                          ? `${
                              getChangSheng(
                                currentBazi?.getMonthGan(),
                                lunar?.getMonthGanIndexExact(),
                                lunar.getMonthZhiIndexExact()
                              ) + "　"
                            }`
                          : getChangSheng(
                              currentBazi?.getMonthGan(),
                              lunar?.getMonthGanIndexExact(),
                              lunar.getMonthZhiIndexExact()
                            )}
                      </View>
                      <View className="pro-zizuo-text">
                        {getChangSheng(
                          currentBazi?.getDayGan(),
                          lunar?.getDayGanIndexExact(),
                          lunar.getDayZhiIndexExact()
                        ).length === 1
                          ? `${
                              getChangSheng(
                                currentBazi?.getDayGan(),
                                lunar?.getDayGanIndexExact(),
                                lunar.getDayZhiIndexExact()
                              ) + "　"
                            }`
                          : getChangSheng(
                              currentBazi?.getDayGan(),
                              lunar?.getDayGanIndexExact(),
                              lunar.getDayZhiIndexExact()
                            )}
                      </View>
                      <View className="pro-zizuo-text">
                        {getChangSheng(
                          currentBazi?.getTimeGan(),
                          lunar?.getTimeGanIndex(),
                          lunar.getTimeZhiIndex()
                        ).length === 1
                          ? `${
                              getChangSheng(
                                currentBazi?.getTimeGan(),
                                lunar?.getTimeGanIndex(),
                                lunar.getTimeZhiIndex()
                              ) + "　"
                            }`
                          : getChangSheng(
                              currentBazi?.getTimeGan(),
                              lunar?.getTimeGanIndex(),
                              lunar.getTimeZhiIndex()
                            )}
                      </View>
                    </View>
                    <View className="pro-kongwang">
                      <Text className="pro-kongwang-text">空亡</Text>
                      <View className="pro-kongwang-text">
                        {currentYun.liuNianXunKong}
                      </View>
                      <View className="pro-kongwang-text">
                        {currentYun.daYunXunKong}
                      </View>
                      <View className="pro-kongwang-text">
                        {currentBazi.getYearXunKong()}
                      </View>
                      <View className="pro-kongwang-text">
                        {currentBazi.getMonthXunKong()}
                      </View>
                      <View className="pro-kongwang-text">
                        {currentBazi.getDayXunKong()}
                      </View>
                      <View className="pro-kongwang-text">
                        {currentBazi.getTimeXunKong()}
                      </View>
                    </View>
                    <View className="pro-nayin">
                      <Text className="pro-nayin-text-tit">纳音</Text>
                      <View className="pro-nayin-text">
                        {currentYun.liuNianNaYin}
                      </View>
                      <View className="pro-nayin-text">
                        {currentYun.daYunNaYin}
                      </View>
                      <View className="pro-nayin-text">
                        {currentBazi.getYearNaYin()}
                      </View>
                      <View className="pro-nayin-text">
                        {currentBazi.getMonthNaYin()}
                      </View>
                      <View className="pro-nayin-text">
                        {currentBazi.getDayNaYin()}
                      </View>
                      <View className="pro-nayin-text">
                        {currentBazi.getTimeNaYin()}
                      </View>
                    </View>
                    <View className="pro-shensha">
                      <Text className="pro-shensha-text-tit">神煞</Text>
                      <View>
                        {shenShaliuNian &&
                          shenShaliuNian?.map((item, index) => (
                            <View className="pro-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShadaYun &&
                          shenShadaYun?.map((item, index) => (
                            <View className="pro-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShaYear &&
                          shenShaYear?.map((item, index) => (
                            <View className="pro-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShaMonth &&
                          shenShaMonth?.map((item, index) => (
                            <View className="pro-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShaDay &&
                          shenShaDay?.map((item, index) => (
                            <View className="pro-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                      <View>
                        {shenShaTime &&
                          shenShaTime?.map((item, index) => (
                            <View className="pro-shensha-text" key={index}>
                              {item}
                            </View>
                          ))}
                      </View>
                    </View>
                    <View className="pro-yun">
                      <Flex className="pro-yun-qiyun" justify="space-between">
                        <View>
                          起运：{startYunSolar.getYear()}年
                          {startYunSolar.getMonth()}月{startYunSolar.getDay()}日
                        </View>
                        <View>
                          <Text>
                            {new Date().getFullYear() - lunar.getYear() + 1}岁
                          </Text>
                          <Tag
                            children="今"
                            className="jin"
                            onClick={currentToday}
                          />
                        </View>
                      </Flex>

                      <Dayun
                        dayunChange={dayunChange}
                        daYun={daYun}
                        dayunIndex={dayunIndex}
                        colorHandle={colorHandle}
                        LunarUtil={LunarUtil}
                        currentBazi={currentBazi}
                        currentYun={currentYun}
                        setCurrentYun={setCurrentYun}
                      />
                      <Liunian
                        liunianChange={liunianChange}
                        daYun={daYun}
                        dayunIndex={dayunIndex}
                        colorHandle={colorHandle}
                        LunarUtil={LunarUtil}
                        currentBazi={currentBazi}
                        liunianIndex={liunianIndex}
                        currentYun={currentYun}
                        setCurrentYun={setCurrentYun}
                      />
                      <Liuyue
                        lunar={lunar}
                        daYun={daYun}
                        dayunIndex={dayunIndex}
                        currentYear={currentYear}
                        colorHandle={colorHandle}
                        LunarUtil={LunarUtil}
                        currentBazi={currentBazi}
                        liunianIndex={liunianIndex}
                      />
                    </View>

                    <View className="base-liuyi">
                      <Tag
                        className="base-liuyi-text-tit"
                        children="天干留意"
                      />
                      {tianganliuyi.length > 1
                        ? tianganliuyi.map((item, index) => (
                            <View key={index} className="base-liuyi-view">
                              {HighlightText(item)}
                            </View>
                          ))
                        : "无"}
                    </View>
                    <View className="base-liuyi">
                      <Tag
                        className="base-liuyi-text-tit"
                        children="地支留意"
                      />
                      {dizhiliuyi.length > 1
                        ? dizhiliuyi.map((item, index) => (
                            <View key={index} className="base-liuyi-view">
                              {HighlightText(item)}
                            </View>
                          ))
                        : "无"}
                    </View>
                  </View>
                </Tabs.TabPane>
              </Tabs>
            </View>
          )}
        </>
      )}
      <View>
        <DatePick />
        <AreaPick />
        <Toast open={toastOpen} onClose={setToastOpen}>
          {toastValue}
        </Toast>
      </View>
    </View>
  );
};

export default Index;
