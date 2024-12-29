import { useAppDispatch } from "@/app/hooks";
import { login, logout } from "@/app/lib/features/user/userSlice";

export function useLogUser() {
  const dispatch = useAppDispatch();

  const loginUser = (id: number, purchases: []) => {
    console.log("The ID: " + id);
    const userData = {
      userId: id,
      purchases: purchases,
    };

    dispatch(login(userData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { loginUser, logoutUser };
}
