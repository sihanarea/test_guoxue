/* eslint-disable react/no-children-prop */
import { AreaPicker, Popup } from "@taroify/core";
import { areaList } from "@vant/area-data";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeArea, getAreaData } from "../../../actions/huangli";

const AreaPick = () => {
  //这个是排盘的。年月日时
  // const [minDate] = useState(new Date(1930, 0, 1, 0));
  // const [maxDate] = useState(new Date(2010, 0, 1, 0));
  // const [defaultValue] = useState(areaList);
  // const [value, setValue] = useState(new Date());
  const huangli = useSelector((state) => state.huangli);
  const dispatch = useDispatch();
  // console.log("test", huangli);

  const closeFn = () => {
    dispatch(closeArea());
  };
  const confirmFn = (e) => {
    if (e.length > 0) {
      const provice = areaList["province_list"][e[0]];
      const city = areaList["city_list"][e[1]];
      const county = areaList["county_list"][e[2]];
      console.log(provice, city, county);
      dispatch(getAreaData({ provice, city, county }));
    }

    dispatch(closeArea());
  };

  return (
    <Popup
      open={huangli.isOpenArea}
      placement="bottom"
      rounded
      style={{ height: "40%" }}
      onClose={closeFn}
    >
      <AreaPicker onConfirm={(e) => confirmFn(e)}>
        <AreaPicker.Toolbar>
          <AreaPicker.Button onClick={closeFn}>取消</AreaPicker.Button>
          <AreaPicker.Title>选择地址</AreaPicker.Title>
          <AreaPicker.Button>确认</AreaPicker.Button>
        </AreaPicker.Toolbar>
        <AreaPicker.Columns children={areaList} />
      </AreaPicker>
    </Popup>
  );
};
export default AreaPick;
