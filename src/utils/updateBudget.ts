import { useAppDispatch } from "@/app/hooks";
import { updateBudget } from "@/app/lib/features/user/userSlice";

export function useUpdateBudget() {
  const dispatch = useAppDispatch();

  const updBudget = (newBudget: number) => {
    const newBud = {
      budget: newBudget,
    };
    dispatch(updateBudget(newBud));
  };

  return { updBudget };
}
