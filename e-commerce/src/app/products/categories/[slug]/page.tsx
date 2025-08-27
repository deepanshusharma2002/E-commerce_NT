"use client";

import InputSelect from "@/components/InputSelect";
import Products from "@/components/Products";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [filterCategory, setFilterCategory] = useState<string>(params.slug?.replace("_", " "));
  return (
    //   <div>{params.slug?.replace("_", " ")}</div>
    <div className="max-w-[1200px] mx-auto">
      <div className="w-full bg-white">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold">Ecommerce Store</div>

          <div>
            {/* <InputSelect
              label="Filter: "
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                router.push(
                  "/products/categories/" +
                    e.target.value?.toLowerCase().replace(" ", "_")
                );
              }}
              options={[
                "All",
                "Men's Clothing",
                "Women's Clothing",
                "Jewelry",
                "Electronics",
              ]}
            /> */}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex px-4 py-4">
        <div className="text-md font-semibold text-gray-600">
          Showing Products
        </div>
      </div>
      <Products search={""} sortBy={""} />
    </div>
  );
}
