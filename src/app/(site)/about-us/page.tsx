"use client";
import { useInView, motion } from "framer-motion";
import { CircleHelp, Package, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const imgVariant = {
  hidden: { x: 150, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const ParentVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const childrenVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const companyImage = [
  "/img/footer/shefinds-logo 1.png",
  "/img/footer/yahoo-news-img 1.png",
  "/img/footer/Healthline-img 1.png",
  "/img/footer/yahoo-news-img 2.png",
  "/img/footer/MSN-logo 1.png",
];

const AboutUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });
  return (
    <div
      className="max-w-screen-xl px-5 mx-auto mt-20 overflow-hidden"
      id="upcoming-event">
      <div className="grid lg:grid-cols-2 gap-[92px]">
        <motion.div
          ref={ref}
          variants={ParentVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{
            duration: 0.8,
            delayChildren: 0,
            staggerChildren: 0.5,
          }}
          className=" flex flex-col justify-center">
          <motion.h1
            className=" text-[40px] font-extrabold text-[#061c3c]"
            variants={childrenVariant}>
            ABOUT US
          </motion.h1>
          <motion.p
            variants={childrenVariant}
            className="text-[#566B84] font-normal text-[18px] mt-[24px]">
            At Crisop, we are committed to providing you with the freshest and
            highest-quality groceries at affordable prices. Our mission is to
            simplify your shopping experience, save you time, and ensure you
            have access to a wide range of products to meet all your household
            needs.
          </motion.p>
          <motion.div
            variants={childrenVariant}
            transition={{
              delayChildren: 0.5,
              staggerChildren: 0.5,
            }}
            className="mt-[48px] bg-[#e3f7da] rounded-[16px]">
            <motion.div
              variants={childrenVariant}
              className="flex space-x-[20px] p-[32px]">
              <div>
                <ShieldCheck />
              </div>
              <div>
                <h3 className="text-[20px] font-medium text-[#061C3D]">
                  Quality
                </h3>
                <p className=" text-[16px] text-[#42526B] mt-[8px]">
                  We source our products from reputable suppliers to ensure you
                  receive only the best quality items.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={childrenVariant}
              className="mx-[32px] h-[2px] bg-[#061C3D] bg-opacity-10"
            />
            <motion.div
              variants={childrenVariant}
              className="flex space-x-[20px] p-[32px]">
              <div>
                <CircleHelp />
              </div>
              <div>
                <h3 className="text-[20px] font-medium text-[#061C3D]">
                  Customer Support
                </h3>
                <p className=" text-[16px] text-[#42526B] mt-[8px]">
                  Our friendly and knowledgeable customer support team is
                  available to assist you with any inquiries or concerns.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={childrenVariant}
              className="mx-[32px] h-[2px] bg-[#061C3D] bg-opacity-10"
            />
            <motion.div
              variants={childrenVariant}
              className="flex space-x-[20px] p-[32px]">
              <div>
                <Package />
              </div>
              <div>
                <h3 className="text-[20px] font-medium text-[#061C3D]">
                  Fast and Reliable Delivery
                </h3>
                <p className=" text-[16px] text-[#42526B] mt-[8px]">
                  We ensure your order reaches your doorstep promptly and in
                  pristine condition.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          ref={ref}
          variants={imgVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{
            duration: 0.8,
          }}
          className=" w-full h-[300px] lg:h-auto rounded-[26px] overflow-hidden relative">
          <motion.img
            src="/img/about-us/delevery-boy.jpg"
            className=" object-cover object-center w-full h-full"
          />
        </motion.div>
      </div>
      <div className=" mt-32 p-10 rounded-md border-2 border-dashed relative border-[#ff7c08]">
        <h1 className=" bg-white absolute -top-7 left-7 p-3 text-xl font-bold text-[#061c3c] ">
          The Most Popular Brand&apos;s
        </h1>
        <div className=" flex justify-between items-center">
          {companyImage.map((img: string, index: number) => (
            <div key={index} className=" p-5 rounded-md border">
              <div className=" relative w-[159px] h-[49px] ">
                <Image
                  src={img}
                  alt={"logo_icon"}
                  fill
                  className=" object-contain object-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
