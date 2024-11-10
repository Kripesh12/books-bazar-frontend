import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SellerAuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  isAuth: boolean | null;
  setIsAuth: (auth: boolean) => void;
  sellerId: string | null;
  setSellerId: (id: string) => void;
}

const useSellerAuthStore = create<SellerAuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      isAuth: null,
      setIsAuth: (auth: boolean) => set({ isAuth: auth }),

      sellerId: null,
      setSellerId: (id: string) => set({ sellerId: id }),
    }),
    {
      name: "sellerAuth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSellerAuthStore;
