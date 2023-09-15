import dayjs from "dayjs";
import { DatetimePicker, Popup } from "@taroify/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { close, getBaziDate } from "../../../actions/huangli";

const DatePick = () => {
  //这个是排盘的。年月日时
  const [minDate] = useState(new Date(1930, 0, 1, 0));
  const [maxDate] = useState(new Date(2010, 0, 1, 0));
  const [defaultValue] = useState(new Date());
  const [value, setValue] = useState(new Date());
  const huangli = useSelector((state) => state.huangli);
  const dispatch = useDispatch();
  // console.log("test", huangli);

  const closeFn = () => {
    dispatch(close());
  };
  const confirmFn = () => {
    console.log("===", value);
    const selectDate = dayjs(value).format("YYYY-MM-DD HH");
    dispatch(getBaziDate(selectDate));
    dispatch(close());
  };
  const changeHour = (val) => {
    if (val === "23" || val === "00") {
      return val + "子时";
    }
    if (val === "01" || val === "02") {
      return val + "丑时";
    }
    if (val === "03" || val === "04") {
      return val + "寅时";
    }
    if (val === "05" || val === "06") {
      return val + "卯时";
    }
    if (val === "07" || val === "08") {
      return val + "辰时";
    }

    if (val === "09" || val === "10") {
      return val + "巳时";
    }
    if (val === "11" || val === "12") {
      return val + "午时";
    }
    if (val === "13" || val === "14") {
      return val + "未时";
    }
    if (val === "15" || val === "16") {
      return val + "申时";
    }
    if (val === "17" || val === "18") {
      return val + "酉时";
    }
    if (val === "19" || val === "20") {
      return val + "戌时";
    }
    if (val === "21" || val === "22") {
      return val + "亥时";
    }
  };
  return (
    <Popup
      open={huangli.isOpen}
      placement="bottom"
      rounded
      style={{ height: "40%" }}
      onClose={closeFn}
    >
      <DatetimePicker
        type="date-hour"
        min={minDate}
        max={maxDate}
        defaultValue={defaultValue}
        value={value}
        onChange={setValue}
        formatter={(type, val) => {
          if (type === "year") {
            return val + "年";
          }
          if (type === "month") {
            return val + "月";
          }
          if (type === "day") {
            return val + "日";
          }
          if (type === "hour") {
            return changeHour(val);
          }
          return val;
        }}
      >
        <DatetimePicker.Toolbar>
          <DatetimePicker.Button onClick={closeFn}>取消</DatetimePicker.Button>
          <DatetimePicker.Title>选择年月日时</DatetimePicker.Title>
          <DatetimePicker.Button onClick={confirmFn}>
            确认
          </DatetimePicker.Button>
        </DatetimePicker.Toolbar>
      </DatetimePicker>
    </Popup>
  );
};
export default DatePick;
