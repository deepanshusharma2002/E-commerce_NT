import { productsDummyData } from "@/components/dummyData";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductViewPage({ params }: { params: { id: string } }) {
    const product = productsDummyData.find((p) => p.id === Number(params?.id));

    if (!product) {
        return (
            <div className="max-w-[1200px] mx-auto py-10">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto">

            <div className="w-full bg-white">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-lg font-semibold">Ecommerce Store</div>
                    <ShoppingCart className="ml-3 h-5 w-5 text-gray-600 cursor-pointer" />
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left: Product Image */}
                <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-w-sm w-full object-contain"
                    />
                </div>

                {/* Right: Product Details */}
                <div>
                    {/* Category */}
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                    {/* Title */}
                    <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

                    {/* Price */}
                    <p className="text-xl font-semibold mb-2">${product.price}</p>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                        {/* Stars */}
                        <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }, (_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.round(product.rating.rate)
                                        ? "fill-current"
                                        : "text-gray-300"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.287 3.959c.3.922-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.175 0l-3.37 2.449c-.785.57-1.84-.196-1.54-1.118l1.287-3.959a1 1 0 00-.364-1.118L2.075 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.959z" />
                                </svg>
                            ))}
                        </div>
                        {/* Rating number & count */}
                        <p className="ml-2 text-sm text-gray-600">
                            {product.rating.rate} ({product.rating.count} reviews)
                        </p>
                    </div>

                    {/* Description */}
                    <h2 className="font-semibold mb-2">Description</h2>
                    <p className="text-gray-700 mb-6">{product.description}</p>

                    {/* Buttons */}
                    <div className="flex gap-4 mb-4">
                        <button className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                            Add to Cart
                        </button>
                        <button className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                            Buy Now
                        </button>
                    </div>

                    {/* Wishlist */}
                    <button className="flex items-center text-gray-600 hover:text-black transition">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <Heart />
                        </svg>
                        Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
}
