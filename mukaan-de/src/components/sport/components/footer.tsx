import { FunctionComponent } from "react";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start flex-wrap content-start gap-[21px] max-w-full text-left text-5xl text-aliceblue-100 font-sequel-sans ${className}`}
    >
      <div className="w-[49px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
        <div className="self-stretch h-[50px] relative rounded bg-main">
          <div className="absolute top-[0px] left-[0px] rounded bg-main w-full h-full hidden" />
          <img
            className="absolute top-[2.6px] left-[2px] w-[43.9px] h-[44.8px] z-[1]"
            loading="lazy"
            alt=""
            src="/group.svg"
          />
        </div>
      </div>
      <div className="w-[50px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
        <div className="self-stretch h-[50px] relative rounded bg-main">
          <div className="absolute top-[0px] left-[0px] rounded bg-main w-full h-full hidden" />
          <img
            className="absolute top-[1px] left-[1.4px] w-[47px] h-[48.1px] z-[1]"
            alt=""
            src="/group-1.svg"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border min-w-[348px] max-w-full mq450:min-w-full">
        <div className="w-[49px] h-[50px] relative rounded bg-main">
          <div className="absolute top-[0px] left-[0px] rounded bg-main w-full h-full hidden" />
          <img
            className="absolute top-[1px] left-[1.3px] w-[47px] h-[48.1px] z-[1]"
            alt=""
            src="/group-2.svg"
          />
        </div>
      </div>
      <div className="h-[55px] flex flex-col items-start justify-start pt-[5px] pb-0 pl-0 pr-[22px] box-border">
        <img
          className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full"
          alt=""
          src="/left-button.svg"
        />
      </div>
      <div className="h-[60px] w-[57px] relative">
        <div className="absolute top-[13px] left-[0px] rounded-[50%] bg-main w-[35px] h-[35px]" />
        <div className="absolute top-[0px] left-[13px] tracking-[0.01em] leading-[60px] uppercase inline-block min-w-[13px] z-[1] mq450:text-lgi mq450:leading-[48px]">
          1
        </div>
      </div>
      <div className="w-[188px] flex flex-row items-start justify-between py-0 pl-0 pr-[35px] box-border gap-5 text-gray-500">
        <div className="relative tracking-[0.01em] leading-[60px] uppercase mq450:text-lgi mq450:leading-[48px]">
          2
        </div>
        <div className="relative tracking-[0.01em] leading-[60px] uppercase inline-block min-w-[14px] mq450:text-lgi mq450:leading-[48px]">
          3
        </div>
        <div className="relative tracking-[0.01em] leading-[60px] uppercase inline-block min-w-[14px] mq450:text-lgi mq450:leading-[48px]">
          4
        </div>
      </div>
      <div className="h-[55px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
        <img
          className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full"
          alt=""
          src="/right-button.svg"
        />
      </div>
    </div>
  );
};

export default Footer;
