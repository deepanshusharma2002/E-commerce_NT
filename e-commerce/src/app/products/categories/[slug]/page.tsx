import Products from "@/components/Products";
import { ShoppingCart } from "lucide-react";

export default function ({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="w-full bg-white">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold">Ecommerce Store</div>

          <div>
            <ShoppingCart className="ml-3 h-5 w-5 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex px-4 py-4">
        <div className="text-md font-semibold text-gray-600">
          Showing Products
        </div>
      </div>
      <Products
        search={""}
        sortBy={""}
        category={params?.slug?.replace("_", " ")}
      />
    </div>
  );
}
