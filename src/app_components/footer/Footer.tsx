"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Mail } from "lucide-react";

function Footer() {
  return (
    <footer>
      <div
        className="flex flex-col md:flex-row items-center justify-between px-20 py-10 text-white gap-10 md:gap-0 mb-10 lg:mb-0"
        style={{
          backgroundColor: "#3F4245",
        }}
      >
        <div className="flex flex-col">
          <div className="relative">
            <Link
              href="/watch/trang-chu"
              className="absolute text-3xl left-[30px] text-transparent"
              tabIndex={-1}
            >
              Home
            </Link>
            <div className="flex items-center justify-center">
              <Image
                src="/logo_name.png"
                alt="logo name"
                className="w-[150px] select-none cursor-pointer"
                width={100}
                height={100}
                priority
              />
            </div>
            <div>Copyright © 2025 LetWatch</div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold text-yellow-400">
            Mọi thông tin liên hệ:
          </h1>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Mail />
              <h1>thienmacro1234@gmail.com</h1>
            </div>
            <div className="flex gap-2">
              <Link href="https://www.facebook.com/ddthien12" target="_blank">
                <Facebook className="text-blue-500 cursor-pointer" />
              </Link>
              <h1>Doan Thien</h1>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
