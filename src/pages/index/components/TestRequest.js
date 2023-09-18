import Taro from "@tarojs/taro";

const UseRequest = () => {
  const httpsFn = () => {
    Taro.request({
      url: "https://api.y3iu.com/getTest", //
      data: {},
      method: "GET",
      header: {
        "content-type": "application/json", // 默认值
      },
      success: function (res) {
        console.log(res.data);
      },
    });
  };
  httpsFn();
};

export default UseRequest;
