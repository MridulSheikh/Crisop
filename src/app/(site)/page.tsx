import AboutUs from "@/components/ui/home/AboutUs";
import Banner from "@/components/ui/home/Banner";
import Contact from "@/components/ui/home/ContactUs";
import MostPopularProduct from "@/components/ui/home/MostPopularProduct";
import OurCategories from "@/components/ui/home/OurCategories";

export default function Home() {
  return (
    <>
      <Banner />
      <MostPopularProduct />
      <OurCategories />
      <AboutUs />
      <Contact />
    </>
  );
}
