import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BookInterface } from "../Pages/seller/ListBook/ListBook";

interface CartStore {
  cartItems: BookInterface[];
  addToCart: (book: BookInterface) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (book) =>
        set((state) => {
          if (state.cartItems.find((item) => item.id === book.id)) return state;
          return { cartItems: [...state.cartItems, book] };
        }),

      removeFromCart: (bookId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== bookId),
        })),

      clearCart: () => set({ cartItems: [] }),

      isInCart: (bookId) => get().cartItems.some((item) => item.id === bookId),

      getTotalItems: () => get().cartItems.length,

      getTotalPrice: () =>
        get().cartItems.reduce((total, item) => total + item.price, 0),
    }),
    {
      name: "cart-storage", // localStorage key
      partialize: (state) => ({ cartItems: state.cartItems }), // persist only cartItems
    }
  )
);
