import dayjs from "dayjs";
import { View, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import { Solar, LunarYear } from "lunar-javascript";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Tag, Image } from "@taroify/core";
import { getHuangLiDate } from "../../../actions/huangli";

const Banner = () => {
  const [calendarData, setCalendarData] = useState({});
  const huangliDate = useSelector((state) => state.huangli.getHuangLiDate);
  const [huangliDataValue, setHuangliDateValue] = useState(huangliDate);
  const dispatch = useDispatch();
  useEffect(() => {
    setHuangliDateValue(huangliDate);
  }, [huangliDate]);
  useEffect(() => {
    const now = new Date(huangliDataValue);
    console.log("huangliDate", huangliDataValue);
    const state = {
      year: now.getFullYear(), //年
      month: now.getMonth() + 1, //月
      day: now.getDate(), //日
      lunarYearInChinese: "", //农历年
      lunarMonthInChinese: "", //农历月
      lunarDayInChinese: "", //农历日
      weekInChinese: "", //星期几
      xingZuo: "", //星座
      yearGanZhi: "", //干支 年
      yearShengXiao: "", //年生肖
      monthGanZhi: "", //干支 月
      monthShengXiao: "", //月生肖
      dayGanZhi: "", //干支 日
      dayYi: [], //宜
      dayJi: [], //忌
      daySha: "", //岁煞
      liuYao: "", //六曜
      dayLu: "", //日禄
      positionXi: "", //喜神
      positionFu: "", //福神
      positionCai: "", //财神
      positionYangGui: "", //阳贵神
      positionYinGui: "", //阴贵神
      yearKongWang: "", //年空亡
      monthKongWang: "", //月空亡
      dayKongWang: "", //日空亡
      dayJiuXing: "", //九星
      xiu: "", //二十八宿
      yearZhiShui: "", //治水
      yearDeJin: "", //得金
      yearFenBing: "", //分饼
      yearGenTian: "", //耕田
      dayChong: "", //相冲
      dayZhiShen: "", //值神
      dayTianShen: "", //十二神
      monthTaiShen: "", //月胎神
      dayTaiShen: "", //日胎神
      pengZuGan: "", //彭祖
      pengZuZhi: "", //百忌
      yueMing: "", //月名
      yueXiang: "", //月相
      wuHou: "", //物候
      dayJiShen: "", //吉神
      dayXiongSha: "", //凶煞
      yearNaYin: "", //年纳音
      monthNaYin: "", //月纳音
      dayNaYin: "", //日纳音
    };
    const solar = Solar.fromYmd(state.year, state.month, state.day);
    const lunar = solar.getLunar();
    state.lunarYearInChinese = lunar.getYearInChinese();
    state.lunarMonthInChinese = lunar.getMonthInChinese();
    state.lunarDayInChinese = lunar.getDayInChinese();
    state.weekInChinese = solar.getWeekInChinese();
    state.xingZuo = solar.getXingZuo();
    state.yearKongWang = lunar.getYearXunKong();
    state.monthTaiShen = lunar.getMonthPositionTai();
    state.monthKongWang = lunar.getMonthXunKong();

    state.yearGanZhi = lunar.getYearInGanZhi();
    state.yearShengXiao = lunar.getYearShengXiao();
    state.monthGanZhi = lunar.getMonthInGanZhi();
    state.monthShengXiao = lunar.getMonthShengXiao();
    state.dayGanZhi = lunar.getDayInGanZhi();
    state.dayYi = lunar.getDayYi();
    state.dayJi = lunar.getDayJi();
    state.daySha = lunar.getDaySha();
    state.dayChong = lunar.getDayShengXiao() + "日冲" + lunar.getDayChongDesc();
    state.dayKongWang = lunar.getDayXunKong();
    state.xiu =
      lunar.getGong() +
      "方" +
      lunar.getXiu() +
      lunar.getZheng() +
      lunar.getAnimal() +
      "(" +
      lunar.getXiuLuck() +
      ")";
    state.positionXi = lunar.getPositionXiDesc();
    state.positionFu = lunar.getPositionFuDesc();
    state.positionCai = lunar.getPositionCaiDesc();
    state.positionYangGui = lunar.getPositionYangGuiDesc();
    state.positionYinGui = lunar.getPositionYinGuiDesc();
    state.yueXiang = lunar.getYueXiang();
    state.wuHou = lunar.getHou() + " " + lunar.getWuHou();
    state.yueMing = lunar.getSeason();
    state.dayShengXiao = lunar.getDayShengXiao();
    state.dayNaYin = lunar.getDayNaYin();
    state.dayTaiShen = lunar.getDayPositionTai();
    state.pengZuGan = lunar.getPengZuGan();
    state.pengZuZhi = lunar.getPengZuZhi();
    state.dayZhiShen = lunar.getZhiXing();
    state.dayTianShen =
      lunar.getDayTianShen() + "(" + lunar.getDayTianShenType() + "日)";
    state.liuYao = lunar.getLiuYao();
    state.dayLu = lunar.getDayLu();
    state.dayJiShen = lunar.getDayJiShen();
    state.dayXiongSha = lunar.getDayXiongSha();
    state.dayNaYin = lunar.getDayNaYin();
    state.monthNaYin = lunar.getMonthNaYin();
    state.yearNaYin = lunar.getYearNaYin();

    const lunarYear = LunarYear.fromYear(lunar.getYear());

    state.yearZhiShui = lunarYear.getZhiShui();
    state.yearDeJin = lunarYear.getDeJin();
    state.yearGenTian = lunarYear.getGengTian();
    state.yearFenBing = lunarYear.getFenBing();

    console.log(state);
    setCalendarData(state);
  }, [huangliDataValue]);

  const prevDay = () => {
    const prev = dayjs(huangliDataValue)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    setHuangliDateValue(prev);
    dispatch(getHuangLiDate(prev));
  };
  const nextDay = () => {
    const next = dayjs(huangliDataValue).add(1, "day").format("YYYY-MM-DD");
    setHuangliDateValue(next);
    dispatch(getHuangLiDate(next));
  };
  return (
    <View className="huangli-banner">
      <View className="huangli-banner-box">
        <Flex justify="center">
          <Flex
            className="huangli-banner-chinese"
            justify="space-between"
            align="center"
          >
            <View onClick={prevDay}>
              <Image
                style={{ width: "40rpx", height: "60rpx", marginTop: "20rpx" }}
                src={require("../../../assets/images/left.png")}
              />
            </View>
            <View>
              {calendarData.lunarMonthInChinese}月
              {calendarData.lunarDayInChinese}
            </View>
            <View onClick={nextDay}>
              <Image
                style={{ width: "40rpx", height: "60rpx", marginTop: "20rpx" }}
                src={require("../../../assets/images/right.png")}
              />
            </View>
          </Flex>
        </Flex>
        <View className="huangli-banner-ganzhi brown">
          {calendarData.yearGanZhi}年 {calendarData.monthGanZhi}月{" "}
          {calendarData.dayGanZhi}日 星期{calendarData.weekInChinese} 【属
          {calendarData.yearShengXiao}】{calendarData.xingZuo}座
        </View>
        <View>
          <Tag color="primary" size="large" children="宜" className="yi jiyi" />
          {calendarData.dayYi &&
            calendarData.dayYi.map((item, index) => (
              <Tag
                key={index}
                className="yi-tag"
                size="medium"
                children={item}
              />
            ))}
        </View>
        <View style={{ marginTop: "16rpx" }}>
          <Tag color="primary" size="large" children="忌" className="ji jiyi" />
          {calendarData.dayJi &&
            calendarData.dayJi.map((item, index) => (
              <Tag
                key={index}
                className="ji-tag"
                size="medium"
                children={item}
              />
            ))}
        </View>
      </View>
      <Flex
        justify="space-between"
        style={{
          padding: "20rpx",
          background: "#f5f4f1",
        }}
      >
        <Flex.Item span="6">
          <View className="strong brown">财神位</View>
          <Flex justify="space-between">
            <Text className="brown">喜神</Text>
            <Text>{calendarData.positionXi}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">福神</Text>
            <Text>{calendarData.positionFu}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">财神</Text>
            <Text>{calendarData.positionCai}</Text>
          </Flex>
        </Flex.Item>
        <Flex.Item span="6">
          <View className="strong brown">阴阳贵神</View>
          <Flex justify="space-between">
            <Text className="brown">阳贵神</Text>
            <Text>{calendarData.positionYangGui}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">阴贵神</Text>
            <Text>{calendarData.positionYinGui}</Text>
          </Flex>
        </Flex.Item>
        <Flex.Item span="6">
          <View className="strong brown">空亡所值</View>
          <Flex justify="space-between">
            <Text className="brown">年</Text>
            <Text>{calendarData.yearKongWang}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">月</Text>
            <Text>{calendarData.monthKongWang}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">日</Text>
            <Text>{calendarData.dayKongWang}</Text>
          </Flex>
        </Flex.Item>
      </Flex>
      <Flex
        justify="space-between"
        style={{
          padding: "20rpx",
        }}
      >
        <Flex.Item span="12">
          <View className="strong brown">九宫飞星</View>
          <Flex justify="space-between">
            <Text className="brown">九星</Text>
            <Text>{calendarData.dayJiuXing}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">二十八宿</Text>
            <Text>{calendarData.xiu}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>{calendarData.yearZhiShui}</Text>
            <Text>{calendarData.yearDeJin}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>{calendarData.yearFenBing}</Text>
            <Text>{calendarData.yearGenTian}</Text>
          </Flex>
        </Flex.Item>
        <Flex.Item span="11">
          <Flex justify="space-between">
            <Text className="brown">{calendarData.yearGanZhi}年</Text>
            <Text>属{calendarData.yearShengXiao}</Text>
            <Text>{calendarData.yearNaYin}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">{calendarData.monthGanZhi}月</Text>
            <Text>属{calendarData.monthShengXiao}</Text>
            <Text>{calendarData.monthNaYin}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">{calendarData.dayGanZhi}日</Text>
            <Text>属{calendarData.dayShengXiao}</Text>
            <Text>{calendarData.dayNaYin}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">相冲</Text>
            <Text>{calendarData.dayChong}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">值神</Text>
            <Text>{calendarData.dayZhiShen}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="brown">十二神</Text>
            <Text>{calendarData.dayTianShen}</Text>
          </Flex>
        </Flex.Item>
      </Flex>

      <View
        style={{
          padding: "20rpx",
          background: "#f5f4f1",
        }}
      >
        <View style={{ textAlign: "center" }} className="strong brown">
          吉神宜趋
        </View>
        <Flex justify="space-between">
          {calendarData.dayJiShen &&
            calendarData.dayJiShen.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
        </Flex>
      </View>
      <View
        style={{
          padding: "20rpx",
        }}
      >
        <View style={{ textAlign: "center" }} className="strong brown">
          凶煞宜忌
        </View>
        <Flex justify="space-between">
          {calendarData.dayXiongSha &&
            calendarData.dayXiongSha.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
        </Flex>
      </View>
      <Flex
        style={{
          padding: "20rpx",
          background: "#f5f4f1",
        }}
        justify="space-between"
      >
        <View>
          <View style={{ textAlign: "center" }} className="strong brown">
            彭祖
          </View>
          <View>{calendarData.pengZuGan}</View>
        </View>
        <View>
          <View style={{ textAlign: "center" }} className="strong brown">
            百忌
          </View>
          <View>{calendarData.pengZuZhi}</View>
        </View>
      </Flex>
      <Flex
        style={{
          padding: "20rpx",
        }}
        justify="space-between"
      >
        <View>
          <View style={{ textAlign: "center" }} className="strong brown">
            本月胎神
          </View>
          <View>{calendarData.monthTaiShen}</View>
        </View>
        <View>
          <View style={{ textAlign: "center" }} className="strong brown">
            今日胎神
          </View>
          <View>{calendarData.dayTaiShen}</View>
        </View>
      </Flex>
      <Flex
        style={{
          padding: "20rpx",
          background: "#f5f4f1",
        }}
        justify="space-between"
      >
        <Flex.Item span="11">
          <Flex justify="space-between">
            <Text className="strong brown">月名</Text>
            <Text>{calendarData.yueMing}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="strong brown">月相</Text>
            <Text>{calendarData.yueXiang}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="strong brown">物候</Text>
            <Text>{calendarData.wuHou}</Text>
          </Flex>
        </Flex.Item>
        <Flex.Item span="11">
          <Flex justify="space-between">
            <Text className="strong brown">岁煞</Text>
            <Text>{calendarData.daySha}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="strong brown">六曜</Text>
            <Text>{calendarData.liuYao}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="strong brown">日禄</Text>
            <Text>{calendarData.dayLu}</Text>
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  );
};

export default Banner;
