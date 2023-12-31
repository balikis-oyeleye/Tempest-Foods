import { formatPrice } from "@/actions/formatPrice";
import useCart from "@/hooks/useCart";
import { CartProps } from "@/types/Food";
import Image from "next/image";
import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const CartItem = ({ item }: CartProps) => {
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const reduceQuantity = useCart((state) => state.reduceQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);

  return (
    <div className="cart-item">
      <div className="item-main">
        <Image src={item.imageSrc} alt="food" width={60} height={60} />
        <p>{item.title}</p>
      </div>
      <div className="item-info">
        <span className="item-price">NGN {formatPrice(item.price)}</span>
        <div className="item-cta">
          <div className="item-btn">
            <button onClick={() => reduceQuantity(item)}>
              <FiMinus />
            </button>
            <span className="item-qty">{item.quantity}</span>
            <button onClick={() => increaseQuantity(item)}>
              <FiPlus />
            </button>
          </div>
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
