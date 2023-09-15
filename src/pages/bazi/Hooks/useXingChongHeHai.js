const useXingChongHehai = (bazi, currentYun) => {
  //天干开始
  var tgguanxi = {
    甲己: "甲己合土",
    乙庚: "乙庚合金",
    丙辛: "丙辛合水",
    丁壬: "丁壬合木",
    戊癸: "戊癸合火",
    甲庚: "甲庚相冲",
    乙辛: "乙辛相冲",
    丙壬: "丙壬相冲",
    丁癸: "丁癸相冲",
  };
  var gans = [];
  gans.push(bazi.getYearGan());
  gans.push(bazi.getMonthGan());
  gans.push(bazi.getDayGan());
  gans.push(bazi.getTimeGan());
  if (currentYun) {
    if (currentYun.daYunGanZhi) {
      gans.push(currentYun.daYunGanZhi.substr(0, 1));
    }
    if (currentYun.liuNianGanZhi) {
      gans.push(currentYun.liuNianGanZhi.substr(0, 1));
    }
    if (currentYun.liuYueGanZhi) {
      gans.push(currentYun.liuYueGanZhi.substr(0, 1));
    }
  }
  var matchedTiangan = [];
  var gxs = {};
  var size = gans.length;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (i === j) {
        continue;
      }
      var v = tgguanxi[gans[i] + gans[j]];
      if (v) {
        gxs[v] = true;
      }
    }
  }
  for (var i in gxs) {
    matchedTiangan.push(i);
  }
  //天干结束
  //地支开始
  var dzguanxi = {
    亥子丑: "亥子丑三会水",
    寅卯辰: "寅卯辰三会木",
    巳午未: "巳午未三会火",
    申酉戌: "申酉戌三会金",
    申子辰: "申子辰三合水",
    寅午戌: "寅午戌三合火",
    亥卯未: "亥卯未三合木",
    巳酉丑: "巳酉丑三合金",
    申子: "申子半合水",
    子辰: "子辰半合水",
    午戌: "午戌半合火",
    亥卯: "亥卯半合木",
    卯未: "卯未半合木",
    酉丑: "酉丑半合金",
    寅午: "寅午半合火(暗合土)",
    巳酉: "巳酉半合金(暗合水)",
    子巳: "子巳暗合火",
    卯申: "卯申暗合金",
    亥午: "亥午暗合木",
    巳申: "巳申六合水(相破)",
    辰酉: "辰酉六合金",
    卯戌: "卯戌六合火",
    寅亥: "寅亥六合木(相破)",
    子丑: "子丑六合土",
    午未: "午未六合火或土",
    子卯: "子卯无礼相刑",
    丑未戌: "丑未戌恃势刑",
    寅巳申: "寅巳申无恩刑",

    辰辰: "辰辰自刑",
    午午: "午午自刑",
    酉酉: "酉酉自刑",
    亥亥: "亥亥自刑",

    辰辰辰: "辰辰自刑",
    午午午: "午午自刑",
    酉酉酉: "酉酉自刑",
    亥亥亥: "亥亥自刑",

    辰辰辰辰: "辰辰自刑",
    午午午午: "午午自刑",
    酉酉酉酉: "酉酉自刑",
    亥亥亥亥: "亥亥自刑",

    辰辰辰辰辰: "辰辰自刑",
    午午午午午: "午午自刑",
    酉酉酉酉酉: "酉酉自刑",
    亥亥亥亥亥: "亥亥自刑",

    辰辰辰辰辰辰: "辰辰自刑",
    午午午午午午: "午午自刑",
    酉酉酉酉酉酉: "酉酉自刑",
    亥亥亥亥亥亥: "亥亥自刑",

    子午: "子午相冲",
    卯酉: "卯酉相冲",
    寅申: "寅申相冲",
    巳亥: "巳亥相冲",
    辰戌: "辰戌相冲",
    丑未: "丑未相冲",
    子未: "子未相害",
    丑午: "丑午相害",
    寅巳: "寅巳相害",
    卯辰: "卯辰相害",
    申亥: "申亥相害",
    酉戌: "酉戌相害",
    子酉: "子酉相破",
    卯午: "卯午相破",
    辰丑: "辰丑相破",
    未戌: "未戌相破",
  };
  var zhis = {};
  zhis[bazi.getYearZhi()] = zhis[bazi.getYearZhi()]
    ? zhis[bazi.getYearZhi()] + 1
    : 1;
  zhis[bazi.getMonthZhi()] = zhis[bazi.getMonthZhi()]
    ? zhis[bazi.getMonthZhi()] + 1
    : 1;
  zhis[bazi.getDayZhi()] = zhis[bazi.getDayZhi()]
    ? zhis[bazi.getDayZhi()] + 1
    : 1;
  zhis[bazi.getTimeZhi()] = zhis[bazi.getTimeZhi()]
    ? zhis[bazi.getTimeZhi()] + 1
    : 1;
  if (currentYun) {
    const daYunZhi = currentYun.daYunGanZhi.substr(1);
    const liuNianZhi = currentYun.liuNianGanZhi.substr(1);
    const liuYuenZhi = currentYun.liuYueGanZhi.substr(1);
    if (daYunZhi) {
      zhis[daYunZhi] = zhis[daYunZhi] ? zhis[daYunZhi] + 1 : 1;
    }
    if (liuNianZhi) {
      zhis[liuNianZhi] = zhis[liuNianZhi] ? zhis[liuNianZhi] + 1 : 1;
    }
    if (liuYuenZhi) {
      zhis[liuYuenZhi] = zhis[liuYuenZhi] ? zhis[liuYuenZhi] + 1 : 1;
    }
  }

  var matchedDizhi = [];
  var gxs = {};
  for (var i in zhis) {
    for (var j in zhis) {
      for (var k in zhis) {
        if (i == j || j == k || i == k) {
          continue;
        }
        var v = dzguanxi[i + j];
        if (v) {
          gxs[v] = true;
        }
        v = dzguanxi[i + j + k];
        if (v) {
          gxs[v] = true;
        }
      }
    }
  }
  for (var i in zhis) {
    var n = zhis[i];
    var vs = [];
    for (var j = 0; j < n; j++) {
      vs.push(i);
    }
    var v = dzguanxi[vs.join("")];
    if (v) {
      gxs[v] = true;
    }
  }

  for (var i in gxs) {
    matchedDizhi.push(i);
  }

  const tianganliuyi = matchedTiangan;
  const dizhiliuyi = matchedDizhi;
  return {
    tianganliuyi,
    dizhiliuyi,
  };
};

export default useXingChongHehai;
