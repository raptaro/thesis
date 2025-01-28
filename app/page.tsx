import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-64 h-dvh text-center">
      <div className="flex justify-center">

        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="mx-auto max-w-2xl">
              <p className="">Elevate your projects</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Malibiran Medical Clinic
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Over 10+ fully responsive, UI blocks you can drop into your
                  Shadcn UI projects and customize to your heart&apos;s content.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 flex justify-center gap-3">
                <Link className={buttonVariants({ variant: "default" })} href="/patient">Patient</Link>
                <Link className={buttonVariants({ variant: "default" })} href="/admin">Admin</Link>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>

      </div>
    </main>

  );
}
