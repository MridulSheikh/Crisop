"use client";

import { Button } from "@/components/ui/button";
import ReactLoading from "react-loading";
import { motion, useInView } from "framer-motion";
import {
  AlertCircle,
  CircleX,
  Mail,
  MailCheck,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
};

type responseType = {
  data: Inputs;
  message: string;
  statusCode: number;
  success: boolean;
};

const FakeContactData = [
  {
    address: "+880 1883992408",
    icon: <Phone className=" text-gray-600" />,
  },
  {
    address: "info@crisop.com",
    icon: <Mail className=" text-gray-600" />,
  },
  {
    address: "24/12 Dhanmondi, Dhaka, Bangladesh",
    icon: <MapPin className="text-gray-600" />,
  },
];

const leftVariant = {
  hidden: { x: -150, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const rightVariant = {
  hidden: { x: 150, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const ref = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<responseType | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [responseError, setResponseError] = useState<any>(null);
  const inView = useInView(ref, {
    once: true,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setResponseError(null);
    setResponse(null);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/contact/email", data)
      .then(function (response) {
        setResponse(response.data);
      })
      .catch(function (error) {
        setResponse(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="overflow-hidden">
      <div className=" h-48 relative overflow-hidden">
        <Image
          src={"/img/contact-us/fresh-food-banner.jpg"}
          fill
          alt="banner_image"
          className=" object-cover object-center"
        />
        <div className=" w-full h-full bg-black/70 absolute top-0 right-0 flex justify-center items-center">
          <h2 className=" text-2xl text-white">Home / Contact us</h2>
        </div>
      </div>
      <div className=" mt-10 max-w-screen-xl px-5 mx-auto">
        <div className=" grid lg:grid-cols-2 gap-x-7">
          <motion.div
            ref={ref}
            variants={leftVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            className=" flex flex-col">
            <div>
              <h1 className=" text-xl font-bold">Contact Us</h1>
              <p className="text-[#566B84] font-normal text-[18px] mt-[24px]">
                Ut posuere felis arcu tellus tempus in in ultricies. Gravida id
                nibh ornare viverra.Ut posuere felis arcu tellus tempus in in
                ultricies.
              </p>
            </div>
            <div className=" mt-10">
              {FakeContactData.map((dt) => (
                <div
                  key={dt.address}
                  className="flex gap-x-3 items-center font-normal text-[18px] mt-4">
                  <div className="bg-[#e3f7da] rounded-full w-10 h-10 flex justify-center items-center">
                    {dt.icon}
                  </div>
                  <div className="">
                    <span>{dt.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            ref={ref}
            variants={rightVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              ease: "easeInOut",
              delay: 0.5,
              duration: 0.5,
            }}
            className=" flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-[30px] rounded-[20px] w-full bg-[#e3f7da] mt-20 lg:mt-0">
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="" className=" text-sm font-normal  block">
                    First Name
                  </label>
                  <input
                    disabled={loading}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    type="text"
                    placeholder="John"
                    className=" mt-1 text-base p-2 border rounded-md w-full outline-none focus:outline-green-300 focus:border-none"
                  />
                </div>
                <div>
                  <label htmlFor="" className=" text-sm font-normal  block">
                    Last Name
                  </label>
                  <input
                    disabled={loading}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    type="text"
                    placeholder="Doie"
                    className=" mt-1 text-base p-2 border rounded-md w-full outline-none focus:outline-green-300 focus:border-none"
                  />
                </div>
                <div>
                  <label htmlFor="" className=" text-sm font-normal  block">
                    Email
                  </label>
                  <input
                    disabled={loading}
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="example@gmail.com"
                    className=" mt-1 text-base p-2 border rounded-md w-full outline-none focus:outline-green-300 focus:border-none"
                  />
                </div>
                <div>
                  <label htmlFor="" className=" text-sm font-normal  block">
                    Phone Number
                  </label>
                  <input
                    disabled={loading}
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                    })}
                    type="text"
                    placeholder="+880 1XXXXXXXXX"
                    className=" mt-1 text-base p-2 border rounded-md w-full outline-none focus:outline-green-300 focus:border-none"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label htmlFor="" className=" text-sm font-normal  block">
                    Subject
                  </label>
                  <input
                    disabled={loading}
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    type="text"
                    placeholder="e.g."
                    className=" mt-1 text-base p-2 border rounded-md w-full outline-none focus:outline-green-300 focus:border-none"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label htmlFor="" className=" text-sm font-normal  block">
                    Your message
                  </label>
                  <textarea
                    disabled={loading}
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className=" mt-1 h-48 text-base p-2 border rounded-md w-full outline-none focus:outline-green-300 focus:border-none resize-none"
                  />
                </div>
              </div>
              {responseError && (
                <div className=" gap-x-4 flex items-center mt-5 px-3 rounded-md border-2 text-red-500 border-red-500 py-2">
                  <CircleX />
                  Faild to send message
                </div>
              )}
              {response && (
                <div className=" gap-x-4 flex items-center mt-5 px-3 rounded-md border-2 text-green-500 border-green-500 py-2">
                  <MailCheck />
                  {response.message}
                </div>
              )}
              {loading && (
                <div className=" gap-x-4 flex items-center mt-5 px-3 rounded-md border-2 text-gray-500 border-gray-500 py-2">
                  <ReactLoading
                    width={20}
                    height={20}
                    type={"spin"}
                    color="#6b7280"
                  />
                  sending...
                </div>
              )}
              {(errors.firstName ||
                errors.lastName ||
                errors.email ||
                errors.phoneNumber ||
                errors.subject ||
                errors.message) && (
                <div className=" gap-x-4 flex items-center mt-5 px-3 rounded-md border-2 text-yellow-500 border-yellow-500 py-2">
                  <AlertCircle />
                  {errors.firstName?.message ||
                    errors.lastName?.message ||
                    errors.email?.message ||
                    errors.phoneNumber?.message ||
                    errors.subject?.message ||
                    errors.message?.message}
                </div>
              )}
              <div className=" flex justify-start mt-5">
                <Button
                  disabled={loading}
                  className="w-full lg:w-36 text-lg font-medium">
                  Send
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
