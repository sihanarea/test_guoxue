import { View } from "@tarojs/components";

const GetCangGan = (props) => {
  const { data, colorHandle } = props;
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
  const temp = data.map((item, index) => (
    <View className={`base-canggan-text ${colorHandle(item)}`} key={index}>
      {dizhi[item]}
    </View>
  ));
  return temp;
};

export default GetCangGan;
