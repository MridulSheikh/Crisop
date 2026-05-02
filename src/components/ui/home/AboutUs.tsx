"use client";

import { useInView, motion } from "framer-motion";
import { CircleHelp, Package, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Products",
    desc: "We source only fresh and verified groceries from trusted suppliers.",
  },
  {
    icon: CircleHelp,
    title: "24/7 Support",
    desc: "Our support team is always ready to help you anytime.",
  },
  {
    icon: Package,
    title: "Fast Delivery",
    desc: "Quick and safe delivery right to your doorstep.",
  },
];

const companyImage = [
  "/img/footer/shefinds-logo 1.png",
  "/img/footer/yahoo-news-img 1.png",
  "/img/footer/Healthline-img 1.png",
  "/img/footer/yahoo-news-img 2.png",
  "/img/footer/MSN-logo 1.png",
];

const AboutUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="about-us"
      className="max-w-screen-2xl mx-auto px-5 mt-10 md:mt-24"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#106D42] text-center md:text-left">
            About <span className="text-gray-900">Us</span>
          </h1>

          <p className="mt-5 text-gray-600 leading-relaxed text-center md:text-left text-sm md:text-lg">
            At Crisop, we deliver fresh, organic, and high-quality groceries
            directly to your home. Our goal is to make your daily shopping
            faster, easier, and healthier.
          </p>

          {/* FEATURES */}
          <div className="mt-10 space-y-5">
            {features.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-white border hover:shadow-md transition"
              >
                <div className="text-[#86a628]">
                  <item.icon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] lg:h-[791px] rounded-2xl overflow-hidden"
        >
          <Image
            src="/img/about-us/delevery-boy.jpg"
            alt="delivery"
            fill
            className="object-cover"
          />

          {/* overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </div>

      {/* BRAND SECTION */}
      <div className="mt-24 border border-dashed border-[#86a628] rounded-2xl p-8 relative">
        <h2 className="absolute -top-4 left-6 bg-white px-4 text-lg font-semibold text-[#106D42]">
          Trusted Brands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
          {companyImage.map((img, i) => (
            <div
              key={i}
              className="p-4 border rounded-xl bg-white hover:shadow-md transition"
            >
              <div className="relative h-12">
                <Image
                  src={img}
                  alt="brand"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;