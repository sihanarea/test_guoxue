import { View, Text } from "@tarojs/components";
import { Tag, Image } from "@taroify/core";
import { useState, useEffect } from "react";
import { Solar } from "lunar-javascript";
import Taro from "@tarojs/taro";

const CalendarBanner = () => {
  const [calendarData, setCalendarData] = useState({});
  useEffect(() => {
    const now = new Date();

    const state = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      lunarYearInChinese: "",
      lunarMonthInChinese: "",
      lunarDayInChinese: "",
      weekInChinese: "",
      xingZuo: "",
      yearGanZhi: "",
      yearShengXiao: "",
      monthGanZhi: "",
      monthShengXiao: "",
      dayGanZhi: "",
      dayYi: [],
      dayJi: [],
    };
    const solar = Solar.fromYmd(state.year, state.month, state.day);
    const lunar = solar.getLunar();
    state.lunarYearInChinese = lunar.getYearInChinese();
    state.lunarMonthInChinese = lunar.getMonthInChinese();
    state.lunarDayInChinese = lunar.getDayInChinese();
    state.weekInChinese = solar.getWeekInChinese();
    state.xingZuo = solar.getXingZuo();
    state.yearGanZhi = lunar.getYearInGanZhi();
    state.yearShengXiao = lunar.getYearShengXiao();
    state.monthGanZhi = lunar.getMonthInGanZhi();
    state.monthShengXiao = lunar.getMonthShengXiao();
    state.dayGanZhi = lunar.getDayInGanZhi();
    state.dayYi = lunar.getDayYi();
    state.dayJi = lunar.getDayJi();
    console.log(state);
    setCalendarData(state);
  }, []);

  const toHuangli = () => {
    Taro.navigateTo({
      url: "/pages/huangli/index",
    });
  };

  return (
    <View className="calendar-banner" onclick={toHuangli}>
      <View className="calendar-gongli">
        <Text>
          {calendarData.year}-{calendarData.month}-{calendarData.day} / 周
          {calendarData.weekInChinese} {calendarData.xingZuo}座
        </Text>
      </View>
      <View className="calendar-mouth">
        {calendarData.lunarMonthInChinese}月{calendarData.lunarDayInChinese}
      </View>
      <View className="calendar-ganzhi">
        <Text>
          {calendarData.yearGanZhi}年 {calendarData.monthGanZhi}月{" "}
          {calendarData.dayGanZhi}日 【属{calendarData.yearShengXiao}】
        </Text>
      </View>
      <View>
        <Tag color="primary" size="large" children="宜" className="yi jiyi" />
        {calendarData.dayYi &&
          calendarData.dayYi.map((item, index) => (
            <Tag key={index} className="yi-tag" size="medium" children={item} />
          ))}
      </View>
      <View style={{ marginTop: "16rpx" }}>
        <Tag color="primary" size="large" children="忌" className="ji jiyi" />
        {calendarData.dayJi &&
          calendarData.dayJi.map((item, index) => (
            <Tag key={index} className="ji-tag" size="medium" children={item} />
          ))}
      </View>
      {/* <View className="calendar-xingzuo">
        <Image
          src={require(`../../../assets/images/xingzuo/${
            calendarData.xingZuo || "白羊"
          }.png`)}
          style={{ width: "100%", height: "100%" }}
        />
        <View className="calendar-xingzuo-text">
          {calendarData.xingZuo}座
          <Image
            src={require("../../../assets/images/xingzuo/l.png")}
            className="calendar-xingzuo-line calendar-xingzuo-line-l"
          />
          <Image
            src={require("../../../assets/images/xingzuo/r.png")}
            className="calendar-xingzuo-line calendar-xingzuo-line-r"
          />
        </View>
      </View> */}
    </View>
  );
};

export default CalendarBanner;
