// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: ["pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  enableShareAppMessage: true,
  enableShareTimeline: true,
  lazyCodeLoading: "requiredComponents",
  subPackages: [
    {
      root: "pages/bazi/",
      name: "bazi",
      pages: ["index"],
    },
    {
      root: "pages/huangli/",
      name: "huangli",
      pages: ["index"],
    },
  ],
});
