import Taro from "@tarojs/taro";
import { Tabbar } from "@taroify/core";
import { HomeOutlined, CalendarOutlined } from "@taroify/icons";

const CustomTabbar = () => {
  const currentIndex = Taro.getStorageSync("currentIndex") || "1";
  const toIndex = () => {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };
  const toLaohuangli = () => {
    Taro.switchTab({
      url: "/pages/huangli/index",
    });
  };

  return (
    <Tabbar
      defaultValue={currentIndex}
      className="nav-custom-color"
      fixed
      bordered
    >
      <Tabbar.TabItem value="1" icon={<HomeOutlined />} onClick={toIndex}>
        首页{currentIndex}
      </Tabbar.TabItem>
      <Tabbar.TabItem
        value="2"
        icon={<CalendarOutlined />}
        onClick={toLaohuangli}
      >
        黄历{currentIndex}
      </Tabbar.TabItem>
    </Tabbar>
  );
};

export default CustomTabbar;
