import { FunctionComponent } from "react";

export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: FunctionComponent<FrameComponent2Type> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end py-0 px-[136px] box-border max-w-full text-left text-xl text-aliceblue-100 font-dm-sans mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[68px] mq750:pr-[68px] mq750:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-end justify-start pt-0 px-0 pb-5 box-border relative gap-5 max-w-full">
        <div className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-md bg-aliceblue-300" />
        <div className="self-stretch flex flex-col items-start justify-start pt-[31px] px-12 pb-[45px] box-border relative gap-[221.9px] max-w-full mq450:gap-[55px] mq750:pt-5 mq750:pb-[29px] mq750:box-border mq1050:gap-[111px] mq1050:pl-6 mq1050:pr-6 mq1050:box-border">
          <div className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-t-md rounded-b-none bg-gray-200 z-[2]" />
          <div className="rounded-10xs border-aliceblue-100 border-[1px] border-solid flex flex-row items-start justify-start pt-[3px] pb-1 pl-[15px] pr-3.5 z-[3]">
            <div className="relative capitalize font-medium inline-block min-w-[77px] mq450:text-base">
              Football
            </div>
          </div>
          <div className="w-[760px] flex flex-col items-start justify-start max-w-full text-lg text-whitesmoke">
            <div className="self-stretch flex flex-col items-start justify-start gap-2.5 max-w-full">
              <div className="w-[376px] relative leading-[100.9%] inline-block max-w-full z-[3]">
                Agence France-Presse - 04 June 2023
              </div>
              <h1 className="m-0 h-28 relative text-17xl leading-[43px] uppercase font-normal font-sequel-sans inline-block shrink-0 z-[3] mq450:text-3xl mq450:leading-[26px] mq750:text-10xl mq750:leading-[34px]">
                Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club
                Confirms
              </h1>
            </div>
            <div className="w-[697px] relative text-xl leading-[28px] font-medium text-white inline-block max-w-full z-[4] mt-[-8px] mq450:text-base mq450:leading-[22px]">
              The EuroLeague Finals Top Scorer is the individual award for the
              player that gained the highest points in the EuroLeague Finals
            </div>
          </div>
        </div>
        <img
          className="w-full h-[518px] absolute !m-[0] top-[0px] right-[0px] left-[0px] rounded-t-md rounded-b-none max-w-full overflow-hidden shrink-0 object-cover z-[1]"
          loading="lazy"
          alt=""
          src="/twoopposingplayersgivehandshakeendgame-1@2x.png"
        />
        <div className="w-[520px] flex flex-row items-start justify-end py-0 px-[25px] box-border max-w-full text-5xl text-gray-500 font-sequel-sans">
          <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq450:flex-wrap">
            <div className="h-[55px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
              <img
                className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full z-[1]"
                loading="lazy"
                alt=""
                src="/left-button.svg"
              />
            </div>
            <div className="h-[60px] w-[35px] relative text-aliceblue-100">
              <div className="absolute top-[13px] left-[0px] rounded-[50%] bg-main w-[35px] h-[35px] z-[1]" />
              <div className="absolute top-[0px] left-[13px] tracking-[0.01em] leading-[60px] uppercase inline-block min-w-[13px] z-[2] mq450:text-lgi mq450:leading-[48px]">
                1
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[13px]">
              <div className="relative tracking-[0.01em] leading-[60px] uppercase z-[1] mq450:text-lgi mq450:leading-[48px]">
                2
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[13px]">
              <div className="relative tracking-[0.01em] leading-[60px] uppercase inline-block min-w-[14px] z-[1] mq450:text-lgi mq450:leading-[48px]">
                3
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[13px]">
              <div className="relative tracking-[0.01em] leading-[60px] uppercase inline-block min-w-[14px] z-[1] mq450:text-lgi mq450:leading-[48px]">
                4
              </div>
            </div>
            <div className="h-[55px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
              <img
                className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full z-[1]"
                loading="lazy"
                alt=""
                src="/right-button.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent2;
