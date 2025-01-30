import { FunctionComponent } from "react";

export type ContentType = {
  className?: string;
};

const Content: FunctionComponent<ContentType> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-white flex flex-row items-end justify-center pt-[23px] px-5 pb-[25px] box-border gap-[84px] top-[0] z-[99] sticky max-w-full text-left text-23xl text-black1 font-darkline mq450:gap-[21px] mq750:gap-[42px] ${className}`}
    >
      <div className="h-[92px] w-[1440px] relative bg-white hidden max-w-full" />
      <div className="w-[154px] flex flex-col items-start justify-end pt-0 px-0 pb-0.5 box-border">
        <a className="[text-decoration:none] self-stretch h-[42px] relative tracking-[0.01em] leading-[42px] text-[inherit] flex items-end shrink-0 z-[1]">
          Sport News
        </a>
      </div>
      <div className="w-[748px] flex flex-row items-start justify-between py-0 pl-0 pr-[53px] box-border gap-5 max-w-full text-mini text-gray-300 font-dm-sans mq750:pr-[26px] mq750:box-border mq1050:hidden">
        <a className="[text-decoration:none] relative tracking-[0.01em] leading-[42px] font-bold text-main z-[1]">
          Home
        </a>
        <a className="[text-decoration:none] relative tracking-[0.01em] leading-[42px] text-[inherit] z-[1]">
          Category
        </a>
        <a className="[text-decoration:none] relative tracking-[0.01em] leading-[42px] text-[inherit] z-[1]">
          Trending News
        </a>
        <a className="[text-decoration:none] relative tracking-[0.01em] leading-[42px] text-[inherit] z-[1]">
          Recent News
        </a>
        <a className="[text-decoration:none] relative tracking-[0.01em] leading-[42px] text-[inherit] z-[1]">
          Clubs Ranking
        </a>
        <a className="[text-decoration:none] relative tracking-[0.01em] leading-[42px] text-[inherit] z-[1]">
          Sports Article
        </a>
      </div>
      <button className="cursor-pointer [border:none] pt-0 px-0 pb-1 bg-[transparent] flex flex-col items-start justify-end">
        <div className="h-[35px] rounded-md bg-silver flex flex-row items-start justify-start py-0 pl-[13px] pr-2 box-border z-[1]">
          <img
            className="mt-[-2px] h-[39px] w-[39px] relative overflow-hidden shrink-0"
            alt=""
            src="/search-icon.svg"
          />
          <a className="mt-[-3.5px] [text-decoration:none] relative text-sm tracking-[0.01em] leading-[42px] font-dm-sans text-white text-left inline-block min-w-[52px] z-[1] ml-[-12px]">
            Search
          </a>
        </div>
      </button>
    </header>
  );
};

export default Content;
