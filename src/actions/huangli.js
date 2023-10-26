import {
  OPEN,
  CLOSE,
  OPENAREA,
  CLOSEAREA,
  GETHUANGLIDATE,
  OPENHUANGLI,
  CLOSEHUANGLI,
  GETBAZIDATA,
  GETAREADATA,
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
export const openArea = () => {
  return {
    type: OPENAREA,
  };
};
export const closeArea = () => {
  return {
    type: CLOSEAREA,
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

export const getHuangLiDate = (data) => {
  return {
    type: GETHUANGLIDATE,
    data: data,
  };
};

export const getBaziDate = (data) => {
  return {
    type: GETBAZIDATA,
    data: data,
  };
};

export const getAreaData = (data) => {
  return {
    type: GETAREADATA,
    data: data,
  };
};
