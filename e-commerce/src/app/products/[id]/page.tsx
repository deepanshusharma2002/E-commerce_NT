import { productsDummyData } from "@/components/dummyData";

export default function ProductViewPage({ params }: { params: { id: number; } }) {

    let product = productsDummyData.find((p) => p.id === Number(params?.id));
    return (
        <div className="max-w-[1200px] mx-auto">
            <h1 className="text-2xl font-bold mb-4">Product Details - ID: {params?.id}</h1>
        </div>
    );
}