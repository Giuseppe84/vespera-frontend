'use client';

import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cart/cartSlice';

export default function AddToCartButton({ product }: any) {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition"
    >
      Aggiungi al carrello
    </button>
  );
}