import ProductCard from "@/components/shared/card/ProductCard";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import LimitSelectClient from "@/components/ui/products/LimitClientComponent";
import MobileFilter from "@/components/ui/products/MobileShopFilter";
import CategorySidebar from "@/components/ui/products/SelectCategorySidebar";
import { TProduct } from "@/types/user";
import { Menu } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";

const Products = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    category?: string;
    searchTerm?:string;
  };
}) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 12;
  const category = searchParams.category;
  const searchTerm = searchParams.searchTerm;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product?page=${page}&limit=${limit}${
    category ? `&category=${category}` : ""}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const products = await res.json();
  const meta = products.meta;

  return (
    <div className="bg-[#f6f6f6] pb-10 lg:py-20">
      <div className="max-w-screen-2xl mx-auto h-72 lg:h-96 lg:rounded-md flex items-center relative overflow-hidden">
        {/* background image */}
        <Image
          src="/img/bag-banner.jpg"
          alt="banner"
          fill
          className="object-cover object-bottom"
          priority
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* content */}
        <div className="relative px-10 max-w-lg text-white space-y-4">
          <p className="text-green-400 font-semibold tracking-widest uppercase text-sm">
            Fresh Collection 2026
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Organic & Fresh Grocery Products
          </h1>

          <p className="text-sm md:text-base text-gray-200">
            Discover premium quality groceries, fresh fish, meat and daily
            essentials delivered straight to your door.
          </p>

          {/* <div className="flex items-center gap-4 pt-2">
            <button className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-md text-sm font-medium">
              Shop Now
            </button>

            <button className="border border-white/40 hover:border-white transition px-5 py-2 rounded-md text-sm">
              View Offers
            </button>
          </div> */}
        </div>
      </div>
      <div className="max-w-screen-2xl px-5 mx-auto pt-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <MobileFilter />
            <p className="text-sm flex items-center gap-x-2">
              Showing <LimitSelectClient /> of {meta?.total} items
            </p>
          </div>
        </div>
        <div className=" flex flex-col xl:flex-row gap-x-5 mt-[34px] w-full">
          <div className="hidden xl:block">
            <CategorySidebar />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {products?.data?.map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
        {/* 🔥 Product Grid */}
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
    </div>
  );
};

export default Products;
