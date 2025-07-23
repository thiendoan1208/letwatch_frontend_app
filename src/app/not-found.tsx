"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 relative overflow-hidden">
      <div className="absolute top-6 left-6">
        <Image
          src="/logo_name.png"
          alt="logo name"
          className="w-[150px] select-none"
          width={150}
          height={100}
          priority
        />
      </div>

      <div className="absolute w-[400px] h-[400px] bg-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse -z-10"></div>

      <motion.h1
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 "
      >
        404
      </motion.h1>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Trang không tồn tại.</h2>
        <p className="text-lg mb-6 text-gray-300">
          Có thể bạn đã nhập sai đường dẫn hoặc trang đã bị xoá.
        </p>
        <Link
          href="/watch/trang-chu"
          className="px-6 py-3 bg-yellow-500 hover:bg-orange-500 transition-colors rounded-lg text-black font-medium"
        >
          Quay lại trang chủ
        </Link>
      </motion.div>
    </div>
  );
}
