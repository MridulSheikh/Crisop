import Banner from "@/components/ui/home/Banner";
import FlashSell from "@/components/ui/home/FlashSell";
import MostPopularProduct from "@/components/ui/home/MostPopularProduct";
import TopCategories from "@/components/ui/home/TopCategories";

export default function Home() {
  return (
    <>
      <Banner />
      <FlashSell />
      <TopCategories />
      <MostPopularProduct />
    </>
  );
}
