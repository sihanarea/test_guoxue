import {
  OPEN,
  CLOSE,
  GETHUANGLIDATE,
  OPENHUANGLI,
  CLOSEHUANGLI,
  GETBAZIDATE,
} from "../constants/counter";

export const open = () => {
  return {
    type: OPEN,
  };
};
export const close = () => {
  return {
    type: CLOSE,
  };
};

export const openHunagLi = () => {
  return {
    type: OPENHUANGLI,
  };
};
export const closeHunagLi = () => {
  return {
    type: CLOSEHUANGLI,
  };
};

export const getHuangLiDate = (date) => {
  return {
    type: GETHUANGLIDATE,
    data: date,
  };
};

export const getBaziDate = (date) => {
  return {
    type: GETBAZIDATE,
    data: date,
  };
};
