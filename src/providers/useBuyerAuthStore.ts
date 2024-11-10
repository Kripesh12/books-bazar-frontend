import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BuyerAuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  isAuth: boolean | null;
  setIsAuth: (auth: boolean) => void;
  buyerId: string | null;
  setBuyerId: (id: string) => void;
}

const useBuyerAuthStore = create<BuyerAuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      isAuth: null,
      setIsAuth: (auth: boolean) => set({ isAuth: auth }),
      buyerId: null,
      setBuyerId: (id: string) => set({ buyerId: id }),
    }),
    {
      name: "buyerAuth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBuyerAuthStore;
