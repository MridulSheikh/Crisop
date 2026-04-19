import AboutUs from "@/components/ui/home/AboutUs";
import Banner from "@/components/ui/home/Banner";
import Contact from "@/components/ui/home/ContactUs";
import OurCategories from "@/components/ui/home/OurCategories";

export default function Home() {
  return (
    <>
      <Banner />
      <OurCategories />
      <AboutUs />
      <Contact />
    </>
  );
}
