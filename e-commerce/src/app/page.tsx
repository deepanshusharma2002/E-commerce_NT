"use client";

import InputSelect from "@/components/InputSelect";
import Products from "@/components/Products";
import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";

export default function Home() {
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="w-full bg-white">
        
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold">Ecommerce Store</div>

          <div className="flex items-center w-full max-w-xs ml-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <ShoppingCart className="ml-3 h-5 w-5 text-gray-600 cursor-pointer" />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-0">
          <div>
            <InputSelect
              label="Filter: "
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              options={[
                "All",
                "Men's Clothing",
                "Women's Clothing",
                "Jewelry",
                "Electronics",
              ]}
            />
          </div>

          <div>
            <InputSelect
              label="Sort By: "
              value={sortBy ? sortBy : "None"}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                "",
                "Price - Low to High",
                "Price - High to Low",
                "Highest Rated",
                "Name - A to Z",
                "Name - Z to A",
              ]}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex px-4 py-4">
        <div className="text-md font-semibold text-gray-600">Showing Products</div>
      </div>
      <Products search={search} sortBy={sortBy} />
    </div>
  );
}
