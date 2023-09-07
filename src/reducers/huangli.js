import dayjs from "dayjs";

import {
  OPEN,
  CLOSE,
  GETHUANGLIDATE,
  OPENHUANGLI,
  CLOSEHUANGLI,
  GETBAZIDATE,
} from "../constants/counter";

const INITIAL_STATE = {
  isOpen: false,
  isOpenHuangLi: false,
  getHuangLiDate: dayjs().format("YYYY-MM-DD"),
  getBaziDate: dayjs().format("YYYY-MM-DD HH"),
};

export default function huangli(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case OPENHUANGLI:
      return {
        ...state,
        isOpenHuangLi: true,
      };
    case CLOSEHUANGLI:
      return {
        ...state,
        isOpenHuangLi: false,
      };
    case GETHUANGLIDATE:
      return {
        ...state,
        getHuangLiDate: action.data,
      };
    case GETBAZIDATE:
      return {
        ...state,
        getBaziDate: action.data,
      };
    default:
      return state;
  }
}
