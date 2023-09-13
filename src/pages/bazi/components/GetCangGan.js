import { View, Text } from "@tarojs/components";

const GetCangGan = (props) => {
  const { data, colorHandle, proData, type } = props;
  const dizhi = {
    甲: "甲木",
    乙: "乙木",
    丙: "丙火",
    丁: "丁火",
    戊: "戊土",
    己: "己土",
    庚: "庚金",
    辛: "辛金",
    壬: "壬水",
    癸: "癸水",
  };
  const obj = type ? proData : data;
  const temp = obj.map((item, index) => (
    <View
      className={`${
        type ? "pro-canggan-text" : "base-canggan-text"
      } ${colorHandle(item)}`}
      key={index}
    >
      {type ? (
        <>
          <Text className={`${colorHandle(item.split("-")[0])}`}>
            {dizhi[item.split("-")[0]]}
          </Text>
        </>
      ) : (
        dizhi[item]
      )}
    </View>
  ));

  return temp;
};

export default GetCangGan;
