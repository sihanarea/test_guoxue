import dayjs from "dayjs";
import { Popup, DatetimePicker } from "@taroify/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeHunagLi, getHuangLiDate } from "../../../actions/huangli";

const DatePickHuang = () => {
  //选择日期的
  const [formatValue, setFormatValue] = useState("");
  const [value, setValue] = useState(new Date());
  const [defaultValue] = useState(new Date());

  const [minDate] = useState(new Date(1940, 0, 1));
  const [maxDate] = useState(new Date(2050, 11, 31));
  const huangli = useSelector((state) => state.huangli);
  const dispatch = useDispatch();
  console.log(huangli);

  const closeFn = () => {
    dispatch(closeHunagLi());
    console.log("formatValue", formatValue);
  };

  const confirmFn = () => {
    console.log("===", value);
    const selectDate = dayjs(value).format("YYYY-MM-DD");
    setFormatValue(dayjs(value).format("YYYY-MM-DD"));
    dispatch(getHuangLiDate(selectDate));
    closeFn();
  };
  return (
    <Popup
      open={huangli.isOpenHuangLi}
      placement="bottom"
      rounded
      style={{ height: "40%" }}
      onClose={closeFn}
    >
      {/* <Calendar
        type="single"
        value={value}
        min={minDate}
        max={maxDate}
        onChange={setValue}
        onConfirm={(newValue) => {
          console.log("111", newValue);
          onConfirmFn(newValue);
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar> */}
      <DatetimePicker
        type="date"
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
export default DatePickHuang;
