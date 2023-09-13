import { View, Text } from "@tarojs/components";
import { useState } from "react";
import { Radio, Button, Tabs, Image, Tag, Toast } from "@taroify/core";
import { ArrowDown } from "@taroify/icons";
import { useSelector, useDispatch } from "react-redux";
import { Lunar, LunarUtil, EightChar, Solar } from "./components/lunar";
import GetCangGan from "./components/GetCangGan";
import useShenSha from "./Hooks/useShenSha";
import useXingChongHehai from "./Hooks/useXingChongHeHai";
// import { Lunar, LunarUtil, EightChar } from "lunar-javascript";

import {
  open,
  // close,
  // openHunagLi,
  // closeHunagLi,
  // getHuangLiDate,
} from "../../actions/huangli";
import DatePick from "./components/DatePick";
import "./index.less";

const Index = () => {
  const huangli = useSelector((state) => state.huangli);
  const [sexValue, setSexValue] = useState(1);
  const [liValue, setLiValue] = useState(1);
  const [showPan, setShowPan] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastValue, setToastValue] = useState("");
  const [lunar, setLunar] = useState("");
  const [solar, setSolar] = useState("");
  const [currentBazi, setCurrentBazi] = useState("");
  const dispatch = useDispatch();

  const openFn = () => {
    dispatch(open());
  };
  console.log("时辰", huangli.getBaziDate);

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
      console.log("选择了阳历", liValue);
    } else {
      year = Number(huangli.getBaziDate.split("-")[0]);
      month = Number(huangli.getBaziDate.split("-")[1]);
      day = Number(huangli.getBaziDate.split("-")[2].split(" ")[0]);
      console.log("选择了阴历", year, month, day);
    }

    const lunarObj = Lunar.fromYmdHms(year, month, day, hour, 0, sexValue);
    const solarObj = lunarObj.getSolar();
    const currBaziObj = lunarObj.getEightChar();
    currBaziObj.setSect(1);
    setLunar(lunarObj); //1男，0女
    setSolar(solarObj);
    setCurrentBazi(currBaziObj);
  };

  const { shenShaYear, shenShaMonth, shenShaDay, shenShaTime } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    lunar && currentBazi && useShenSha(lunar, sexValue, currentBazi);
  const { tianganliuyi, dizhiliuyi } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentBazi && useXingChongHehai(currentBazi);

  console.log("lunar", lunar);
  //确定排盘
  const confirmPan = () => {
    if (!sexValue) {
      setToastValue("您还没选择性别！");
      setToastOpen(true);
    } else {
      if (!liValue) {
        setToastValue("您还没选择阴历还是阳历！");
        setToastOpen(true);
      }
    }

    if (sexValue && liValue) {
      setShowPan(true);
      initBazi();
    }
    // setShowPan(true);
    // initBazi();
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
    if (!ganIndex) return;
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
          <View className="sex-box">
            <Text>请选择性别：</Text>
            <Radio.Group
              defaultValue=""
              value={sexValue}
              onChange={setSexValue}
              className="sex"
              direction="horizontal"
            >
              <Radio name="1">男</Radio>
              <Radio name="0">女</Radio>
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
              <Radio name="1">阳历</Radio>
              <Radio name="0">阴历</Radio>
            </Radio.Group>
          </View>
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
        </View>
      ) : (
        <>
          {lunar !== "" && currentBazi !== "" && (
            <View className="pan">
              <Tabs animated swipeable>
                <Tabs.TabPane title="基本命盘">
                  <View className="base">
                    <View className="birthday">
                      <View className="birthday-item">
                        阳历:{solar.toYmdHms()}
                      </View>
                      <View className="birthday-item">
                        阴历:{lunar.getYearInChinese()}年
                        {lunar.getMonthInChinese()}月{lunar.getDayInChinese()}{" "}
                        {lunar.getTimeZhi()}时{" "}
                        {/* <Tag className="qian">
                    （{sexValue === 1 ? "乾" : "坤"}造）
                  </Text> */}
                        <Tag
                          color="primary"
                          children={`${sexValue === 1 ? "乾" : "坤"}造`}
                          className="qian"
                        />
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
                          // lunar?.getYearGanIndexExact(),
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
                      <View className="base-liuyi-text-tit">天干留意：</View>
                      {tianganliuyi.length > 1
                        ? tianganliuyi.map((item, index) => (
                            <Text key={index} className="base-liuyi-text">
                              {item}
                            </Text>
                          ))
                        : "无"}
                    </View>
                    <View className="base-liuyi">
                      <View className="base-liuyi-text-tit">地支留意：</View>
                      {dizhiliuyi.length > 1
                        ? dizhiliuyi.map((item, index) => (
                            <Text key={index} className="base-liuyi-text">
                              {item}
                            </Text>
                          ))
                        : "无"}
                    </View>
                  </View>
                </Tabs.TabPane>
                <Tabs.TabPane title="专业细盘">
                  <View className="pro">
                    <View className="pro-zhu">
                      <Text className="pro-zhu-text">日期</Text>
                      <Text className="pro-zhu-text">流年</Text>
                      <Text className="pro-zhu-text">大运</Text>
                      <Text className="pro-zhu-text">年柱</Text>
                      <Text className="pro-zhu-text">月柱</Text>
                      <Text className="pro-zhu-text">日柱</Text>
                      <Text className="pro-zhu-text">时柱</Text>
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
                          // lunar?.getYearGanIndexExact(),
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
                      <View className="base-liuyi-text-tit">天干留意：</View>
                      {tianganliuyi.length > 1
                        ? tianganliuyi.map((item, index) => (
                            <Text key={index} className="base-liuyi-text">
                              {item}
                            </Text>
                          ))
                        : "无"}
                    </View>
                    <View className="base-liuyi">
                      <View className="base-liuyi-text-tit">地支留意：</View>
                      {dizhiliuyi.length > 1
                        ? dizhiliuyi.map((item, index) => (
                            <Text key={index} className="base-liuyi-text">
                              {item}
                            </Text>
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
        <Toast open={toastOpen} onClose={setToastOpen}>
          {toastValue}
        </Toast>
      </View>
    </View>
  );
};

export default Index;
