import { useAppDispatch } from "@/app/hooks";
import { updateSessionBudget } from "@/app/lib/features/temp/budgetSlice";
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

export function useUpdateSessionBudget() {
  const dispatch = useAppDispatch();

  const updSessionBudget = (newBudget: number) => {
    dispatch(updateSessionBudget(newBudget));
  };

  return { updSessionBudget };
}
