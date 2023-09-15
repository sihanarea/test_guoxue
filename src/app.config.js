// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: ["pages/index/index", "pages/bazi/index", "pages/huangli/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  lazyCodeLoading: "requiredComponents",
});
