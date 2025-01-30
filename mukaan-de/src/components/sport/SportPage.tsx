import { FunctionComponent } from "react";
import Content from "./components/content";
import Body from "./components/body";
import Footer1 from "./components/footer1";
import FrameComponent2 from "./components/frame-component2";
import FrameComponent from "./components/frame-component";
import FrameComponent1 from "./components/frame-component1";
import NewsletterContainer from "./components/newsletter-container";
import Footer from "./components/footer";

const SportPage: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-whitesmoke overflow-hidden flex flex-col items-end justify-start pt-0 px-0 pb-[77px] box-border gap-[80.6px] leading-[normal] tracking-[normal] text-left text-3xl text-main font-dm-sans mq450:gap-5 mq750:gap-10">
      <section className="self-stretch flex flex-col items-start justify-start gap-5 max-w-full">
        <Content />
        <Body />
      </section>
      <Footer1 />
      <div className="relative leading-[29px] font-sequel-sans hidden max-w-full mq450:text-lg mq450:leading-[23px]">
        <p className="m-0">
          5 Exercises Basketball Players Should Be Using To Develop Strength
        </p>
      </div>
      <div className="relative text-base leading-[123.9%] font-medium text-dimgray hidden max-w-full">
        This article was written by Jake Willhoite from Healthlisted.com
        Strength in basketball isn’t all about a massive body mass or ripped
        muscles.
      </div>
      <div className="relative text-sm leading-[100.9%] font-medium text-gray-300 hidden min-w-[92px]">
        04 June 2023
      </div>
      <FrameComponent2 />
      <section className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <div className="w-[1170px] flex flex-col items-start justify-start gap-4 max-w-full">
          <FrameComponent />
          <FrameComponent1 />
        </div>
      </section>
      <section className="self-stretch flex flex-row items-start justify-center py-0 pl-[22px] pr-5 box-border max-w-full">
        <div className="flex flex-col items-start justify-start gap-[42.6px] max-w-full mq750:gap-[21px]">
          <NewsletterContainer />
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default SportPage;
