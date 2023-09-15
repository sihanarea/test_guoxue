import { View } from "@tarojs/components";
import { Tag } from "@taroify/core";

const Birthday = (props) => {
  const { lunar, solar, sexValue } = props;
  return (
    <View className="birthday">
      <View className="birthday-item">阳历:{solar.toYmdHms()}</View>
      <View className="birthday-item">
        阴历:{lunar.getYearInChinese()}年{lunar.getMonthInChinese()}月
        {lunar.getDayInChinese()} {lunar.getTimeZhi()}时{" "}
        <Tag
          color="primary"
          children={`${sexValue == 1 ? "乾" : "坤"}造`}
          className="qian"
        />
      </View>
    </View>
  );
};

export default Birthday;
