import { CartItemProps, FoodProps, ItemProps } from "@/types/Food";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  cart: CartItemProps[];
  addToCart: (item: ItemProps) => void;
  removeFromCart: (item: ItemProps) => void;
  increaseQuantity: (item: CartItemProps) => void;
  reduceQuantity: (item: CartItemProps) => void;
  clearCart: () => void;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const updatedCart = [...cart, { ...product, quantity: 1 }];

        set(() => ({
          cart: updatedCart,
        }));
      },
      removeFromCart: (product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
        }));
      },
      increaseQuantity(product) {
        const updatedCart = get().cart.map((item: CartItemProps) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set(() => ({
          cart: updatedCart,
        }));
      },
      reduceQuantity(product) {
        const updatedCart = get().cart.map((item: CartItemProps) =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        set(() => ({
          cart: updatedCart,
        }));
      },
      clearCart: () => set({ cart: [] }),
    }),
    { name: "tempest-foods" }
  )
);

export default useCart;
