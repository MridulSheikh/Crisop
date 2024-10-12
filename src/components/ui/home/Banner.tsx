import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../button";

const Banner: FC = () => {
  return (
    <div className=" lg:h-screen relative bg-[#EFEEEE] overflow-hidden">
      <div className="absolute size-80 rounded-full bg-gradient-to-r from-[#FF5F2C] to-[#FF5F2C]/10  top-[35%] left-[40%] opacity-40 blur-3xl filter block" />
      <div className="absolute size-80 rounded-full bg-gradient-to-r from-[#FF5F2C] to-[#FF5F2C]/10  -top-64 -right-36 opacity-40 blur-3xl filter block" />

      <div className=" max-w-screen-xl mx-auto h-full px-5 pt-10 lg:py-0 flex flex-col lg:flex-row  relative z-10">
        <div className="flex items-center lg:w-[50%]">
          <div className=" mt-20">
            <div className=" flex gap-x-3 p-3 rounded-full bg-[#FEF2F2] w-[250px]">
              <div className=" size-5 relative">
                <Image alt="vagitable img" src="/img/vegetables 1.png" fill />
              </div>
              <p className=" text-[#F54B4C] font-semibold text-sm">
                Grocery Delivery Service
              </p>
            </div>
            <div className="relative mt-5">
              <h1 className=" text-4xl lg:text-6xl font-bold lg:font-semibold leading-normal text-[#2F2F2E]">
                Make healthy <br /> life with{" "}
                <span className=" text-[#106D42]">fresh</span> grocery
              </h1>
            </div>
            <p className="mt-5 text-[#595959]">
              Get the best quality and most delicious grocery food in the{" "}
              <br className="hidden lg:inline-block" /> world, you can get them
              all use our website
            </p>
            <Button className="bg-[#FF5F2C] mt-7 text-lg">Shop Now</Button>
          </div>
        </div>
        <div className="relative h-full lg:w-[50%]">
          <div className=" hidden lg:flex absolute p-2 lg:bottom-[50%] left-0 lg:left-16 z-10 items-center  gap-x-3 rounded-md border shadow-xl bg-white">
            <div className=" relative size-8">
              <Image alt={"location icon"} fill src={"/img/destination.png"} />
            </div>
            <div>
              <h1 className=" text-sm font-bold">Fast Delivery</h1>
              <p className=" text-xs text-[#ADADAD]">
                Free of cost any devlivery
              </p>
            </div>
          </div>
          <div className=" hidden lg:inline absolute p-2 bottom-[60%] right-14 z-10  gap-x-3 rounded-md border shadow-xl bg-white">
            <div className=" size-14 rounded-full bg-[#EBE3E3] border border-[#C8C8C8] m-auto flex justify-center items-center">
              <div className=" relative size-8">
                <Image alt={"location icon"} fill src={"/img/vegitable.png"} />
              </div>
            </div>
            <div className="text-center mt-1.5">
              <h1 className="text-sm font-bold">100% Fresh</h1>
              <p className="text-xs text-[#ADADAD]">Quality maintain</p>
            </div>
          </div>

          <div className=" relative w-[100%] hidden lg:inline-block h-full">
            <Image
              alt="hero-image"
              src="/img/hero.png"
              fill
              className="object-contain object-bottom"
            />
          </div>
          <div className=" relative w-[100%] lg:hidden h-96 lg:h-full">
            <Image
              alt="hero-image"
              src="/img/hero_2.png"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
