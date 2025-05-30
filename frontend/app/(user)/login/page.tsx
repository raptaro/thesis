"use client";
import { useState, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/organisms/forms/login-form";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Left Side - Image Column */}
        <div className="relative hidden overflow-hidden bg-muted lg:block">
          <div
            className={`absolute inset-0 bg-primary/20 backdrop-blur-sm z-10 transition-opacity duration-1000 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
          />

          <Image
            src="/malibiran-medical-clinic.jpg"
            width={918}
            height={1632}
            alt="malibiran-medical-clinic"
            className={`
              absolute inset-0 h-full w-full object-cover 
              dark:brightness-[0.3] dark:grayscale
              transition-all duration-1000 ease-out 
              ${imageLoaded ? "scale-100 blur-0" : "scale-110 blur-md"}
            `}
            onLoadingComplete={() =>
              setTimeout(() => setImageLoaded(true), 300)
            }
            priority
          />

          <div className="absolute inset-0 z-10 flex flex-col justify-between p-10 text-white">
            <div></div>
            <div
              className={`max-w-md transition-all duration-1000 delay-500 ${
                imageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="mb-3 text-3xl font-bold">
                Streamline Your Medical Practice
              </h2>
              <p className="text-white/80">
                MediTrakk helps you manage patient records, appointments, and
                billing all in one place.
              </p>

              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white/20"></div>
                  <p className="text-sm text-white/70">Patient Management</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white/20"></div>
                  <p className="text-sm text-white/70">Secure Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Column */}
        <div className="flex flex-col p-6 md:p-10">
          {/* Logo Header */}
          <div
            className={`transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-80"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <span className="text-lg font-semibold">MediTrakk</span>
            </Link>
          </div>

          {/* Content Area */}
          <div className="flex flex-1 items-center justify-center">
            <div
              className={`w-full max-w-sm transition-all duration-700 delay-300 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <LoginForm />

              {/* Footer */}
              <div
                className={`mt-8 text-center text-sm text-muted-foreground transition-all duration-700 delay-700 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              >
                © 2025 MediTrakk. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
