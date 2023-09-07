import dayjs from "dayjs";
import { Calendar, Popup } from "@taroify/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeHunagLi, getHuangLiDate } from "../../../actions/huangli";

const DatePickHuang = () => {
  //选择日期的
  const [formatValue, setFormatValue] = useState("");
  const [value, setValue] = useState(new Date());
  const huangli = useSelector((state) => state.huangli);
  const dispatch = useDispatch();
  console.log(huangli);

  const closeFn = () => {
    dispatch(closeHunagLi());
    console.log("formatValue", formatValue);
  };

  const onConfirmFn = (newValue) => {
    console.log("newValue", newValue);
    setFormatValue(dayjs(newValue).format("YYYY-MM-DD"));
    closeFn();
    dispatch(getHuangLiDate(dayjs(newValue).format("YYYY-MM-DD")));
  };
  return (
    <Popup
      open={huangli.isOpenHuangLi}
      placement="bottom"
      rounded
      style={{ height: "80%" }}
      onClose={closeFn}
    >
      <Calendar
        type="single"
        value={value}
        onChange={setValue}
        onConfirm={(newValue) => {
          console.log("111", newValue);
          onConfirmFn(newValue);
        }}
      >
        <Calendar.Footer>
          <Calendar.Button type="confirm">确定</Calendar.Button>
        </Calendar.Footer>
      </Calendar>
    </Popup>
  );
};
export default DatePickHuang;
