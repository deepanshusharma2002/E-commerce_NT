"use client";

import { productsDummyData } from "@/components/dummyData";
import { productData } from "@/components/interface";
import Loader from "@/components/Loader";
import Product from "@/components/Product";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function ProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [posts, setPosts] = useState<productData[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function GetProducts() {
    try {
      const res = await fetch("http://fakestoreapi.com/products");

      if (!res.ok) {
        console.error(`Failed to fetch: ${res.status}`);
      }

      const posts = await res.json();
      setLoading(false);

      setPosts(
        slug === "All"
          ? posts
          : posts.filter(
              (p) => p?.category === slug?.toLowerCase()?.replace("_", " ")
            )
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
      setPosts(
        slug === "All"
          ? productsDummyData
          : productsDummyData.filter(
              (p) => p?.category === slug?.toLowerCase()?.replace("_", " ")
            )
      );
    }
  }

  useEffect(() => {
    GetProducts();
  }, [slug]);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="w-full bg-white">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold">Ecommerce Store</div>

          <div>
            <Link href={"/cart"}>
              <ShoppingCart className="ml-3 h-5 w-5 text-gray-600 cursor-pointer" />{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex px-4 py-4">
        <div className="text-md font-semibold text-gray-600">
          Showing Products
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-100">
          <Loader size={30} />
        </div>
      ) : !posts || posts.length === 0 ? (
        <div className="flex justify-center items-center h-100">
          <p className="text-gray-500 font-bold text-xl">
            No Products Found, Please Check after later.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {posts &&
            posts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <Product data={p} />
              </Link>
            ))}
        </div>
      )}

      <p className="text-center text-xs sm:text-sm text-gray-500 mt-8 sm:mt-10">
        © 2025 ECommerce Store. All rights reserved.
      </p>
    </div>
  );
}
