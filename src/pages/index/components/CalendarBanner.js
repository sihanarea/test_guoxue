import { View, Text } from "@tarojs/components";
import { Tag } from "@taroify/core";
import { useState, useEffect } from "react";
import { Solar } from "lunar-javascript";

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

  return (
    <View className="calendar-banner">
      <View>
        {calendarData.lunarMonthInChinese}月{calendarData.lunarDayInChinese}日
      </View>
      <View>
        <Text>
          公历 {calendarData.year}年 {calendarData.month}月 {calendarData.day}日
          星期{calendarData.weekInChinese} {calendarData.xingZuo}座
        </Text>
      </View>
      <View>
        <Text>
          {calendarData.yearGanZhi}【{calendarData.yearShengXiao}】年{" "}
          {calendarData.monthGanZhi}月 {calendarData.dayGanZhi}日
        </Text>
      </View>
      <View>
        <Text style={{ color: "#32a14a", fontWeight: "bold" }}>宜</Text>
        {calendarData.dayYi &&
          calendarData.dayYi.map((item, index) => (
            <Text key={index} style={{ color: "#32a14a" }}>
              {"  "}
              {item}
            </Text>
          ))}
      </View>
      <View>
        <Text style={{ color: "red", fontWeight: "bold" }}>忌</Text>
        {calendarData.dayJi &&
          calendarData.dayJi.map((item, index) => (
            <Text key={index} style={{ color: "red" }}>
              {"  "}
              {item}
            </Text>
          ))}
      </View>
    </View>
  );
};

export default CalendarBanner;
