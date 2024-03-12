import { create } from 'zustand'
import {produce} from "immer"
import { getInfo, logout as logoutApi } from '@/api/login';
import { removeToken } from '@/utils/auth';

type IUserInfo = {
  userId: string;
  userName: string;
  avatar?: string;

}

export type IUserState = {
  user: IUserInfo | null;
  roles: string[]
  permissions: string[]
};

type Dispatch = {
  dispatch: (action: Action) => void;
}

type Action = {
  type: 'updateUser'
  payload: IUserState
}

const countReducer = (state: IUserState, action: Action) => {
  switch (action.type) {
    case 'updateUser':
      return { userInfo: state.user }
    default:
      return state
  }
}

const useUserStore = create<IUserState & Dispatch>(set => ({
  user: null,
  roles: [],
  permissions: [],
  dispatch: (action: Action) => set(produce((state: IUserState) => countReducer(state, action))),
}));

export const getUserInfo = async () => {
  const { data } = await getInfo();
  useUserStore.setState(() => data)
  return data;
};

export const logout = async () => {
  try {
    await logoutApi();
    useUserStore.setState(() => ({ user: null, roles: [], permissions: [] }));
    removeToken()
    return true;
  } catch (error) {
    return new Error('退出错误')
  }
};

export default useUserStore;