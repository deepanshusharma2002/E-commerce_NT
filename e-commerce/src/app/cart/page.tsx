"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart, decreaseQuantity } from "@/redux/Slices/cartSlice";
import { productData } from "@/components/interface";
import Image from "next/image";

export default function CartPage() {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);

    const subtotal = cart.reduce(
        (acc: number, item: productData) => acc + item.price * (item.quantity || 1),
        0
    );
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 shadow-lg rounded-lg my-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-gray-600 mb-6 sm:mb-8">Review and manage your cart items</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-base sm:text-lg font-semibold mb-4">Cart Items</h2>
                    <div className="space-y-4">
                        {cart.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            cart.map((item: productData) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-md"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex items-center justify-center bg-gray-100 shadow-md rounded-lg sm:mx-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={160}
                                                height={160}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1 sm:line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 sm:line-clamp-1">
                                                {item.description}
                                            </p>
                                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-2">
                                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                                    {item.category}
                                                </span>
                                                <span className="text-xs text-yellow-500 flex items-center">
                                                    ★ {item.rating.rate} ({item.rating.count})
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row sm:flex-col justify-between sm:items-end mt-4 sm:mt-0">
                                        <p className="font-semibold mb-2 sm:mb-2 text-center sm:text-right">
                                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <button
                                                disabled={item.quantity === 1}
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                className="w-8 h-8 flex items-center justify-center rounded-md border shadow-sm text-lg hover:bg-gray-100"
                                            >
                                                -
                                            </button>

                                            <span className="min-w-[20px] text-center text-lg font-medium">
                                                {item.quantity || 1}
                                            </span>

                                            <button
                                                onClick={() => dispatch(addToCart(item))}
                                                className="w-8 h-8 flex items-center justify-center rounded-md border shadow-sm text-lg hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-sm sm:text-sm text-red-600 mt-2 hover:underline text-center sm:text-right"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-base sm:text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base border-t pt-2">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm sm:text-base">
                        Proceed to Checkout
                    </button>
                    <button className="w-full mt-3 py-3 border rounded-lg hover:bg-gray-100 transition text-sm sm:text-base">
                        Continue Shopping
                    </button>
                </div>
            </div>

            <p className="text-center text-xs sm:text-sm text-gray-500 mt-8 sm:mt-10">
                © 2025 ECommerce Store. All rights reserved.
            </p>
        </div>
    );
}
