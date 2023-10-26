import dayjs from "dayjs";

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

const INITIAL_STATE = {
  isOpen: false,
  isOpenHuangLi: false,
  isOpenArea: false,
  getHuangLiDate: dayjs().format("YYYY-MM-DD"),
  getBaziDate: dayjs().format("2009-01-01 00"),
  getAreaData: { provice: "", city: "", county: "" },
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
    case OPENAREA:
      return {
        ...state,
        isOpenArea: true,
      };
    case CLOSEAREA:
      return {
        ...state,
        isOpenArea: false,
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
    case GETBAZIDATA:
      return {
        ...state,
        getBaziDate: action.data,
      };
    case GETAREADATA:
      return {
        ...state,
        getAreaData: action.data,
      };
    default:
      return state;
  }
}
