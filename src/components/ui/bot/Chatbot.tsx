"use client";

import Image from "next/image";
import { closeChatbot } from "@/redux/features/bot/chatbotSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Leaf,
  Send,
  Sparkles,
  Bot,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSendMessageMutation } from "@/redux/features/bot/chatbot.api";
import ProductCarousel from "./ChatBotProductCarousel";

type FormValues = {
  prompt: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  formattedPrice?: string;
  description?: string;

  category?: {
    name: string;
  };

  stock?: {
    quantity: number;
  };

  images?: {
    url: string;
  }[];
};

type Message = {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
};

export default function Chatbot() {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => state.chatbot.isOpen
  );

  const [messages, setMessages] = useState<Message[]>(
    []
  );

  const [suggestions, setSuggestions] = useState([
    "Fresh fish",
    "Chicken breast",
    "Healthy foods",
    "Vegetables",
    "Protein diet foods",
  ]);

  const [sendMessage, { isLoading }] =
    useSendMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormValues>();

  const bottomRef = useRef<HTMLDivElement>(null);

  const isFirstChat = messages.length === 0;

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const onSubmit = async (data: FormValues) => {
    if (!data.prompt.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: data.prompt,
    };

    setMessages((prev) => [...prev, userMsg]);

    reset();

    try {
      const res = await sendMessage({
        message: data.prompt,
      }).unwrap();

      console.log(res);

      const botMsg: Message = {
        role: "assistant",
        content:
          res?.data?.data?.message ||
          "Sorry, I couldn't process your request.",

        products:
          res?.data?.data?.products || [],
      };

      setMessages((prev) => [...prev, botMsg]);

      if (
        res?.data?.meta?.analysis?.suggestions
          ?.length
      ) {
        setSuggestions(
          res.data.meta.analysis.suggestions
        );
      }
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            fixed bottom-5 right-5 z-50
            w-[400px] h-[85vh]
            bg-white
            rounded-[30px]
            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            border border-green-100
            overflow-hidden
            flex flex-col
          "
        >
          {/* HEADER */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0f9f5f] via-emerald-500 to-lime-500 p-4 text-white">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="
                    w-11 h-11 rounded-2xl
                    bg-white/20
                    backdrop-blur-md
                    flex items-center justify-center
                    border border-white/20
                  "
                >
                  <Leaf size={20} />
                </motion.div>

                <div>
                  <h2 className="font-semibold text-[15px]">
                    Crisop AI
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <span className="w-2 h-2 rounded-full bg-lime-300 animate-pulse" />
                    Grocery Sales Assistant
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 90 }}
                onClick={() =>
                  dispatch(closeChatbot())
                }
                className="
                  w-9 h-9 rounded-xl
                  bg-white/10 hover:bg-white/20
                  flex items-center justify-center
                "
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-[#f8fffb] to-white">
            {/* WELCOME */}
            {isFirstChat && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  relative overflow-hidden
                  bg-white
                  border border-green-100
                  rounded-3xl
                  p-5
                  shadow-sm
                "
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full blur-3xl opacity-50" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center">
                      <Bot size={18} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Welcome to Crisop AI
                      </h3>

                      <p className="text-xs text-gray-500">
                        Smart Grocery Assistant
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    Discover fresh groceries,
                    healthy foods, fish, meat,
                    vegetables and personalized
                    product recommendations instantly.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {[
                      "Fresh Fish",
                      "Healthy Foods",
                      "Smart Search",
                      "Fast Discovery",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="
                          bg-green-50
                          border border-green-100
                          rounded-xl
                          px-3 py-2
                          text-xs
                          text-green-700
                          font-medium
                        "
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* CHAT */}
            <div className="space-y-4 mt-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {/* USER */}
                  {msg.role === "user" ? (
                    <div
                      className="
                        max-w-[80%]
                        bg-gradient-to-r
                        from-green-500
                        to-emerald-500
                        text-white
                        px-4 py-3
                        rounded-[22px]
                        rounded-br-md
                        text-sm
                        shadow-md
                      "
                    >
                      {msg.content}
                    </div>
                  ) : (
                    <div className="flex gap-2 max-w-[90%]">
                      {/* AI ICON */}
                      <div
                        className="
                          w-9 h-9 min-w-[36px]
                          rounded-2xl
                          bg-gradient-to-r
                          from-green-500
                          to-emerald-500
                          text-white
                          flex items-center justify-center
                          shadow-sm
                        "
                      >
                        <Leaf size={16} />
                      </div>

                      {/* AI CONTENT */}
                      <div className="space-y-3 w-full">
                        {/* MESSAGE */}
                        <div
                          className="
                            bg-white
                            border border-gray-100
                            text-gray-700
                            px-4 py-3
                            rounded-[22px]
                            rounded-tl-md
                            text-sm
                            shadow-sm
                            leading-relaxed
                          "
                        >
                          {msg.content}
                        </div>

                        {/* PRODUCTS */}
                        {msg.products &&
                          msg.products.length > 0 && (
                            <ProductCarousel
                              products={msg.products}
                            />
                          )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* TYPING */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 mt-4"
              >
                <div
                  className="
                    w-9 h-9 rounded-2xl
                    bg-gradient-to-r
                    from-green-500
                    to-emerald-500
                    flex items-center justify-center
                    text-white
                  "
                >
                  <Leaf size={16} />
                </div>

                <div
                  className="
                    bg-white border border-gray-100
                    px-4 py-3 rounded-2xl
                    flex items-center gap-1
                    shadow-sm
                  "
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce delay-150" />
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce delay-300" />

                  <span className="ml-2 text-sm text-gray-500">
                    Thinking...
                  </span>
                </div>
              </motion.div>
            )}

            {/* SUGGESTIONS */}
            {!isLoading &&
              suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles
                      size={15}
                      className="text-green-600"
                    />

                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                      Suggestions
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <motion.button
                        key={i}
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        type="button"
                        onClick={() =>
                          setValue("prompt", s)
                        }
                        className="
                          px-3 py-2
                          rounded-full
                          bg-white
                          border border-green-100
                          hover:border-green-300
                          hover:bg-green-500
                          hover:text-white
                          text-xs
                          font-medium
                          text-gray-700
                          shadow-sm
                          transition-all
                        "
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
              p-4 border-t border-gray-100
              bg-white
            "
          >
            <div className="relative">
              <textarea
                {...register("prompt")}
                rows={2}
                placeholder="Ask Crisop AI about groceries..."
                className="
                  w-full resize-none
                  rounded-2xl
                  border border-green-100
                  bg-[#f8fffb]
                  px-4 py-3 pr-14
                  text-sm
                  text-gray-700
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-400
                  focus:border-transparent
                "
              />

              {/* SEND */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                type="submit"
                disabled={isLoading}
                className="
                  absolute right-2 bottom-2
                  w-10 h-10
                  rounded-xl
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-500
                  text-white
                  flex items-center justify-center
                  shadow-lg
                "
              >
                {isLoading ? (
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <ShoppingCart size={16} />
                  </motion.div>
                ) : (
                  <Send size={16} />
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}