import { productData } from "./interface";
import { Star } from "lucide-react";

export default function Product({ data }: { data: productData }) {
    return <div className="bg-white shadow-md rounded-xl p-4 w-70 hover:shadow-lg transition">
        {/* Product Image */}
        <div className="flex justify-center">
            <img
                src={data.image}
                alt={data.title}
                className="h-40 object-contain"
            />
        </div>

        <h2 className="text-lg font-semibold mt-3 text-gray-600 line-clamp-2">{data.title}</h2>

        <p className="text-gray-500 text-md">{data.category}</p>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {data.description}
        </p>

        <div className="flex items-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={
                        i < Math.round(data.rating.rate)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                    }
                />
            ))}
            <span className="text-md text-gray-600 ml-2">
                ({data.rating.count})
            </span>
        </div>

        <p className="text-xl font-bold text-gray-600 mt-2">
            ${data.price}
        </p>
    </div>
}