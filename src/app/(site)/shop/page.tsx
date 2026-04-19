import ProductCard from "@/components/shared/card/ProductCard";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import LimitSelectClient from "@/components/ui/products/LimitClientComponent";
import { TProduct } from "@/types/user";
import { cookies } from "next/headers";

const Products = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    category?: string;
  };
}) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const category = searchParams.category;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product?page=${page}&limit=${limit}${
    category ? `&category=${category}` : ""
  }`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const products = await res.json();
  const meta = products.meta;

  return (
    <div className="max-w-screen-xl px-5 mx-auto mt-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <p className="text-sm flex items-center gap-x-2">
            Showing <LimitSelectClient /> of {meta?.total} items
          </p>
        </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-4 gap-[29px] mt-[34px]">
          {products?.data?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      {/* 🔥 Product Grid */}
      {}
      <div className="mt-10">
        <div className="mt-5">
          <PaginationWithLinks
            page={meta?.page}
            pageSize={meta?.limit}
            totalCount={meta?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
