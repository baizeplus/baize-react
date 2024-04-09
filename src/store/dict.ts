import { create } from "zustand";
import { produce } from "immer";

type IUseDictProps = {
  dictObj: Record<string, []>;
};

type SetDictAction = {
  type: "setDict";
  payload: Record<string, []>;
};

type CleanDictAction = {
  type: "cleanDict";
  payload: Record<string, []>;
};

type RemoveDictAction = {
  type: "removeDict";
  payload: Record<string, []>;
};

type Action = SetDictAction | CleanDictAction | RemoveDictAction;

type Dispatch = {
  dispatch: (action: Action) => void;
};

const reducer = (state: IUseDictProps, action: Action) => {
  switch (action.type) {
    case "setDict":
      return { dictObj: { ...state.dictObj, ...action.payload } };
    case "cleanDict":
      return { dictObj: {} };
    case "removeDict":
      return { dictObj: state };
    default:
      return state;
  }
};

const useDictStore = create<IUseDictProps & Dispatch>((set) => ({
  dictObj: {},
  dispatch: (action: Action) =>
    set(produce((state: IUseDictProps) => reducer(state, action))),
}));

export default useDictStore;
