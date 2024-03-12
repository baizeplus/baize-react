import useUserStore, { IUserState } from "@/store/user";
export default function useUser () {
  const { user, dispatch } = useUserStore((state) => ({ user: state.user, dispatch: state.dispatch }));

  const setUser = (data: IUserState) => {
    dispatch({
      type: "updateUser",
      payload: data,
    });
  };

  return { ...user,  setUser }
}
