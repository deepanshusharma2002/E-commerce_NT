"use client";

import { productsDummyData } from "./dummyData";
import { useEffect, useState } from "react";
import { productData } from "./interface";
import Loader from "./Loader";
import Product from "./Product";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Products({
  search,
  sortBy,
  category,
}: {
  search: string;
  sortBy: string;
  category: string;
}) {
  const params = useParams();

  const [posts, setPosts] = useState<productData[] | null>(null);
  const [allPosts, setAllPosts] = useState<productData[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function GetProducts() {
    try {
      const res = await fetch("http://fakestoreapi.com/products");

      if (!res.ok) {
        console.error(`Failed to fetch: ${res.status}`);
      }

      const posts = await res.json();
      setLoading(false);

      setPosts(posts);
      setAllPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
      setPosts(productsDummyData);
      setAllPosts(productsDummyData);
    }
  }

  useEffect(() => {
    GetProducts();
  }, []);

  useEffect(() => {
    allPosts &&
      allPosts?.length > 0 &&
      setPosts((prev) =>
        allPosts.filter((p) =>
          p.title?.toUpperCase()?.includes(search.toUpperCase())
        )
      );
  }, [search]);

  useEffect(() => {
    if (allPosts && allPosts?.length > 0 && category) {
      category === "All"
        ? setPosts(allPosts)
        : setPosts((prev) => allPosts.filter((p) => p.category === category));
    }
  }, [category, allPosts]);

  useEffect(() => {
    if (allPosts && allPosts?.length > 0) {
      switch (sortBy) {
        case "Price - Low to High":
          setPosts([...allPosts].sort((a, b) => a.price - b.price));
          break;

        case "Price - High to Low":
          setPosts([...allPosts].sort((a, b) => b.price - a.price));
          break;

        case "Highest Rated":
          setPosts([...allPosts].sort((a, b) => b.rating.rate - a.rating.rate));
          break;

        case "Name - A to Z":
          setPosts(
            [...allPosts].sort((a, b) => a.title.localeCompare(b.title))
          );
          break;

        case "Name - Z to A":
          setPosts(
            [...allPosts].sort((a, b) => b.title.localeCompare(a.title))
          );
          break;

        default:
          setPosts(allPosts);
      }
    }
  }, [sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-100">
        <Loader size={30} />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-100">
        <p className="text-gray-500 font-bold text-xl">
          No Products Found, Please Check after later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {posts &&
        posts.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <Product data={p} />
          </Link>
        ))}
    </div>
  );
}
