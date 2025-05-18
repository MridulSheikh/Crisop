import Image from "next/image";
import React from "react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const fakeSocialLink = [
  {
    icon: FaFacebook,
    link: "https://www.facebook.com/profile.php?id=100093106206286",
  },
  {
    icon: AiFillInstagram,
    link: "https://www.facebook.com/profile.php?id=100093106206286",
  },
  {
    icon: FaXTwitter,
    link: "https://www.facebook.com/profile.php?id=100093106206286",
  },
  {
    icon: FaTelegram,
    link: "https://www.facebook.com/profile.php?id=100093106206286",
  },
];

const footerImage = [
  "/img/footer/shefinds-logo 1.png",
  "/img/footer/yahoo-news-img 1.png",
  "/img/footer/Healthline-img 1.png",
  "/img/footer/yahoo-news-img 2.png",
  "/img/footer/yahoo-img 1.png",
  "/img/footer/MSN-logo 1.png",
  "/img/footer/yahoo-news-img 3.png",
];

const navigationData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "/categories",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Flash Sale",
    link: "/flash-sale",
  },
  {
    name: "About us",
    link: "/about-us",
  },
  {
    name: "Contuct us",
    link: "/contuct-us",
  },
];

const Footer = () => {
  return (
    <div className=" mt-20">
      <div className=" bg-[#f0eded] py-5">
        <div className=" max-w-screen-xl px-5 mx-auto flex flex-wrap gap-5 justify-center md:justify-between items-center">
          {footerImage.map((img: string, index: number) => (
            <div className=" relative w-[67.5px] h-[24px]" key={index}>
              <Image
                src={img}
                alt={"logo_icon"}
                fill
                className=" object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>
      <div className=" bg-[#3D3D3D] pt-20">
        <div className=" container mx-auto px-5 py-7 grid grid-cols-1 md:grid-cols-3 gap-7">
          <div>
            <h1 className=" text-white text-3xl font-bold">About Company</h1>
            <p className=" text-white mt-4 text-sm font-light leading-[25.5px]">
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
              amet quam egestas semper.
            </p>
            <div className="mt-7 flex gap-x-5 items-center">
              {fakeSocialLink.map((dt, index) => (
                <a
                  target="_blank"
                  href={dt.link}
                  key={index}
                  className=" text-white cursor-pointer"
                >
                  {React.createElement(dt.icon, {
                    className:
                      "text-2xl hover:text-[#F54B4C] ease-in-out duration-200",
                  })}
                </a>
              ))}
            </div>
          </div>
          <div className=" mt-10 md:mt-0 md:px-10">
            <h1 className=" text-3xl text-white font-bold">Contact</h1>
            <div className=" mt-5">
              <div className=" flex gap-x-4 items-center">
                <FaPhoneSquareAlt className=" text-[#F54B4C] text-xl" />
                <span className=" text-white">+880 1883992408</span>
              </div>
              <div className=" flex gap-x-4 items-center mt-4">
                <MdEmail className=" text-[#F54B4C] text-xl" />
                <span className=" text-white">needhelp@company.com</span>
              </div>
              <div className=" flex gap-x-4 mt-4">
                <FaLocationDot className=" text-[#F54B4C] text-xl" />
                <span className=" text-white">
                  666 road, broklyn street new york 600
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:px-10">
            <h1 className=" text-3xl text-white font-bold">Links</h1>
            <ul className=" flex flex-col flex-wrap h-40 gap-y-3 mt-5 text-white">
              {navigationData.map((dt, index) => (
                <li className=" hover:underline" key={index}>
                  <Link href={dt.link}>{dt.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pb-5 mt-3 container mx-auto px-5 text-center">
          <p className=" text-sm text-white/30">
            © 2024 Crisop. Trademarks and brands are the property of their
            respective owners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
