import React from "react";
import { FaPhoneSquareAlt, FaFacebook } from "react-icons/fa";
import { FaLocationDot, FaTelegram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const fakeSocialLink = [
  { icon: FaFacebook, link: "#" },
  { icon: AiFillInstagram, link: "#" },
  { icon: FaXTwitter, link: "#" },
  { icon: FaTelegram, link: "#" },
];

const navigationData = [
  { name: "Home", link: "/" },
  { name: "Categories", link: "/categories" },
  { name: "Products", link: "/products" },
  { name: "Flash Sale", link: "/flash-sale" },
  { name: "About us", link: "/about-us" },
  { name: "Contact us", link: "/contact-us" },
];

const Footer = () => {
  return (
    <footer className="relative bg-[#0f1f14] text-white overflow-hidden">

      {/* 🌿 background glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[120px] top-0 left-0" />
      <div className="absolute w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] bottom-0 right-0" />

      <div className="max-w-screen-2xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

        {/* ABOUT */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Crisop <span className="text-[#86a628]">Market</span>
          </h1>

          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Fresh groceries delivered to your doorstep with premium quality
            and fastest service. We ensure organic, healthy, and safe products.
          </p>

          {/* social */}
          <div className="mt-6 flex gap-4">
            {fakeSocialLink.map((dt, index) => (
              <a
                key={index}
                href={dt.link}
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#86a628] transition"
              >
                {React.createElement(dt.icon, {
                  className: "text-lg",
                })}
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h1 className="text-xl font-semibold mb-5">Contact</h1>

          <div className="space-y-4 text-sm text-white/80">

            <div className="flex items-center gap-3">
              <FaPhoneSquareAlt className="text-[#86a628]" />
              +880 1883992408
            </div>

            <div className="flex items-center gap-3">
              <MdEmail className="text-[#86a628]" />
              needhelp@company.com
            </div>

            <div className="flex items-start gap-3">
              <FaLocationDot className="text-[#86a628] mt-1" />
              666 Road, Brooklyn Street, New York 600
            </div>

          </div>
        </div>

        {/* LINKS */}
        <div>
          <h1 className="text-xl font-semibold mb-5">Quick Links</h1>

          <ul className="grid grid-cols-2 gap-y-3 text-sm text-white/80">
            {navigationData.map((dt, index) => (
              <li key={index}>
                <Link
                  href={dt.link}
                  className="hover:text-[#86a628] transition"
                >
                  {dt.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* bottom */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © 2026 Crisop Market. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;