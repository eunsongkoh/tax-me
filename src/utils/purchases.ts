import { useAppDispatch } from "@/app/hooks";
import { updatePurchases } from "@/app/lib/features/user/userSlice";

export function useUpdatePurchases() {
  const dispatch = useAppDispatch();

  const updPurchases = (newPurchases: []) => {
    const newP = {
      purchases: newPurchases,
    };
    dispatch(updatePurchases(newP));
  };

  return { updPurchases };
}
