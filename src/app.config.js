// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: ["pages/index/index", "pages/huangli/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/huangli/index",
        text: "老黄历",
      },
    ],
  },
});
