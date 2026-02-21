'use client';

import AddToCartButton from './AddToCartButton';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h2 className="text-lg font-semibold">{product.name}</h2>

      <p className="text-gray-600 mb-4">
        € {product.price.toFixed(2)}
      </p>

      <AddToCartButton product={product} />
    </div>
  );
}