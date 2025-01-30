import { FunctionComponent } from "react";

export type Footer1Type = {
  className?: string;
};

const Footer1: FunctionComponent<Footer1Type> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end py-0 px-[135px] box-border max-w-full text-left text-9xl text-main font-sequel-sans mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[67px] mq750:pr-[67px] mq750:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start py-0 pl-9 pr-0 box-border relative gap-[30px] max-w-full lg:flex-wrap lg:pl-5 lg:pr-5 lg:pb-5 lg:box-border">
        <div className="h-full w-full absolute !m-[0] top-[609px] right-[-1170px] bottom-[-609px] left-[1170px] rounded-md bg-aliceblue-100 [transform:_rotate(180deg)] [transform-origin:0_0]" />
        <div className="flex flex-col items-start justify-start pt-[29px] px-0 pb-0 box-border min-w-[534px] max-w-full lg:flex-1 mq1050:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-4">
            <h2 className="m-0 w-[189px] relative text-inherit leading-[38px] font-normal font-[inherit] inline-block z-[1] mq450:text-3xl mq450:leading-[30px]">
              Trending News
            </h2>
            <div className="self-stretch flex flex-row items-start justify-start gap-5 text-3xs text-gray-300 font-dm-sans mq750:flex-wrap">
              <div className="w-[234px] flex flex-col items-start justify-start gap-5 mq750:flex-1">
                <img
                  className="self-stretch flex-1 relative rounded-md max-w-full overflow-hidden max-h-full object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/racehose-1@2x.png"
                />
                <img
                  className="self-stretch flex-1 relative rounded-md max-w-full overflow-hidden max-h-full object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/cyclistleadsactionfrontviewmanridingbicycleracingroad-1@2x.png"
                />
                <img
                  className="self-stretch flex-1 relative rounded-md max-w-full overflow-hidden max-h-full object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/emptyboxingarenawaitingnewrounddrenderillustration-1@2x.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start pt-3.5 px-0 pb-0 box-border min-w-[182px]">
                <div className="self-stretch flex flex-col items-start justify-start gap-[35.5px] mq450:gap-[18px]">
                  <div className="w-[245px] flex flex-col items-start justify-start gap-3">
                    <div className="self-stretch flex flex-col items-start justify-start gap-1">
                      <div className="relative leading-[100.9%] font-medium z-[1]">
                        Race98 - 03 June 2023
                      </div>
                      <div className="relative text-lg leading-[136.9%] font-sequel-sans text-main z-[1]">
                        6-Year-Old Horse Dies at Belmont Park After Race Injury
                      </div>
                    </div>
                    <div className="relative text-xs leading-[123.9%] text-dimgray z-[1]">
                      NEW YORK—A 6-year-old horse died after being injured in a
                      race at Belmont Park ahead of next week’s
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[13px]">
                    <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-0">
                      <div className="h-px flex-1 relative border-silver border-t-[1px] border-solid box-border z-[2]" />
                    </div>
                    <div className="w-[245px] flex flex-col items-start justify-start gap-1">
                      <div className="relative leading-[100.9%] font-medium z-[1]">
                        Jony.Ls - 03 June 2023
                      </div>
                      <div className="relative text-lg leading-[136.9%] capitalize font-sequel-sans text-main z-[1]">
                        Savilia Blunk Embraces Longer Season with World Cup
                      </div>
                    </div>
                    <div className="w-[239px] relative text-xs leading-[123.9%] text-dimgray inline-block z-[1]">
                      Last year, Savilia Blunk took a more conservative approach
                      to her first season as an Elite Class athlete, skipping
                      some
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[11.5px]">
                    <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-0">
                      <div className="h-px flex-1 relative border-silver border-t-[1px] border-solid box-border z-[2]" />
                    </div>
                    <div className="w-[245px] flex flex-col items-start justify-start gap-1">
                      <div className="relative leading-[100.9%] font-medium z-[1]">
                        King.F - 03 June 2023
                      </div>
                      <div className="relative text-lg leading-[136.9%] font-sequel-sans text-main z-[1]">
                        Ryan Garcia is fighting again, this time on social media
                      </div>
                    </div>
                    <div className="w-[239px] relative text-xs leading-[123.9%] text-dimgray inline-block z-[1]">
                      Boxing star Ryan Garcia and his promoter, Hall of Fame
                      fighter Oscar De La Hoya, reignited their war of words via
                      Twitter on
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-md flex flex-col items-start justify-start pt-[30.7px] pb-[9px] pl-9 pr-[25px] box-border relative gap-[393.2px] bg-[url('/public/sportsmandrinkingwatertrainingstationarybike-1@2x.png')] bg-cover bg-no-repeat bg-[top] min-w-[370px] max-w-full z-[1] text-xl text-aliceblue-100 font-dm-sans mq450:gap-[98px] mq750:gap-[197px] mq750:min-w-full">
          <img
            className="w-[570px] h-[609px] relative rounded-md object-cover hidden max-w-full z-[0]"
            alt=""
            src="/sportsmandrinkingwatertrainingstationarybike-1@2x.png"
          />
          <div className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-md bg-gray-200 z-[1]" />
          <div className="rounded-10xs border-aliceblue-100 border-[1px] border-solid flex flex-row items-start justify-start pt-1 pb-[3px] pl-[18px] pr-[17px] z-[2]">
            <div className="relative capitalize font-medium mq450:text-base">
              Cycling
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[14.2px] text-lg text-white">
            <div className="w-[273.4px] relative leading-[100.9%] inline-block shrink-0 z-[2]">
              Debits - 03 June 2023
            </div>
            <h1 className="m-0 h-28 relative text-17xl capitalize font-normal font-sequel-sans inline-block shrink-0 z-[2] mq450:text-3xl mq750:text-10xl">
              DISCOVER THE MEMBER BENEFITS OF USA CYCLING!
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer1;
