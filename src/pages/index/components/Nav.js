import Taro from "@tarojs/taro";
import { Tabbar } from "@taroify/core";
import { HomeOutlined, CalendarOutlined } from "@taroify/icons";
import { useEffect } from "react";

const Nav = (props) => {
  const { current } = props;
  const toIndex = () => {
    Taro.navigateTo({
      url: "/pages/index/index",
    });
  };
  const toLaohuangli = () => {
    Taro.navigateTo({
      url: "/pages/huangli/index",
    });
  };

  useEffect(() => {
    console.log(1);
  }, [current]);

  return (
    <Tabbar defaultValue="1" className="nav-custom-color" fixed bordered>
      <Tabbar.TabItem value="1" icon={<HomeOutlined />} onClick={toIndex}>
        首页{current}
      </Tabbar.TabItem>
      <Tabbar.TabItem
        value="2"
        icon={<CalendarOutlined />}
        onClick={toLaohuangli}
      >
        黄历
      </Tabbar.TabItem>
    </Tabbar>
  );
};

export default Nav;
