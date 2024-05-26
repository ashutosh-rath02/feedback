import SectionContainer from "@/components/SectionContainer";
import Image from "next/image";
import { Icons } from "../../public/icons";
import FeedbackContainer from "@/components/FeedbackContainer";

export default function Home() {
  return (
    <section className="min-h-screen bg-grid-zinc-50">
      <SectionContainer className="relative pb-24 pt-10 sm:pb-32 lg:pt-25 xl:pt-32 lg:pb-52">
        <div className="hidden lg:block absolute inset-0 top-8">
          {/* Background */}
        </div>
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center flex flex-col items-center">
            <h1
              className="relative leading-snug w-fit tracking-tight
text-balance mt—16 font-bold text—gray-900 text-5xl md:text—6xl"
            >
              What do you{" "}
              <span className="whitespace-nowrap">
                th
                <span className="relative">
                  i
                  <span className="absolute inset-x—0 -top-2 -translate-x-3">
                    <Icons.brain className="h-7 w-7 md:h-8 md:w-8" />
                  </span>
                </span>
                nk
              </span>{" "}
              about...
            </h1>

            <FeedbackContainer />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
