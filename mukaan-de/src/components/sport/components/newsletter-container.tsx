import { FunctionComponent } from "react";

export type NewsletterContainerType = {
  className?: string;
};

const NewsletterContainer: FunctionComponent<NewsletterContainerType> = ({
  className = "",
}) => {
  return (
    <div
      className={`self-stretch h-[385px] rounded-md bg-aliceblue-100 flex flex-row items-end justify-start pt-[83.6px] pb-0 pl-[68px] pr-0 box-border max-w-full z-[2] text-left text-41xl font-sequel-sans lg:pl-[34px] lg:box-border mq750:h-auto mq750:pt-[54px] mq750:box-border ${className}`}
    >
      <div className="h-[385px] w-[1168px] relative rounded-md bg-aliceblue-100 hidden max-w-full" />
      <div className="w-[561.1px] flex flex-col items-start justify-start pt-0 px-0 pb-20 box-border max-w-[calc(100%_-_539px)] mq1050:hidden mq1050:max-w-full">
        <div className="flex flex-col items-start justify-start gap-[43.4px] max-w-[110%] mq750:gap-[22px]">
          <h1 className="m-0 w-[615px] relative text-inherit tracking-[0.01em] leading-[60px] uppercase font-normal font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#262626,_#b8c2ce)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block z-[5] mq450:text-17xl mq450:leading-[36px] mq750:text-29xl mq750:leading-[48px]">
            Newsletter Subscription
          </h1>
          <div className="w-[514px] rounded-md border-main border-[1px] border-solid box-border flex flex-row items-start justify-start py-0 pl-[22px] pr-0 gap-[56.9px] max-w-full z-[3] mq750:gap-7 mq750:flex-wrap mq750:pl-5 mq750:pr-5 mq750:pb-5 mq750:box-border">
            <div className="self-stretch w-[514px] relative rounded-md border-main border-[1px] border-solid box-border hidden max-w-full" />
            <input
              className="w-[calc(100%_-_39px)] [border:none] [outline:none] bg-[transparent] h-[33.9px] flex-1 flex flex-col items-start justify-start pt-[13.6px] px-0 pb-0 box-border font-dm-sans text-2xl text-gray-400 min-w-[233px] max-w-full"
              placeholder="shovon.khan0099@gmail.com"
              type="text"
            />
            <div className="h-[58px] w-[74.1px] rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-main flex flex-row items-start justify-start relative z-[1]">
              <div className="self-stretch w-[74.1px] relative rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-main hidden z-[0]" />
              <img
                className="h-[17px] w-[17px] absolute !m-[0] top-[20.4px] left-[28.5px] object-contain z-[2]"
                alt=""
                src="/arrow-4-1.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[427.4px] w-[538.9px] relative max-w-[calc(100%_-_561px)] mq1050:hidden mq1050:max-w-full">
        <img
          className="absolute top-[0px] left-[0px] w-[357.8px] h-[337.5px] object-contain z-[3]"
          alt=""
          src="/abstract-shape.svg"
        />
        <img
          className="absolute top-[42.4px] left-[18.9px] w-[520px] h-[385px] object-cover z-[4]"
          loading="lazy"
          alt=""
          src="/americanfootballplayerposingwithballwhite-1@2x.png"
        />
      </div>
    </div>
  );
};

export default NewsletterContainer;
