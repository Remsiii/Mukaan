import { FunctionComponent } from "react";
import CarouselItems from "./carousel-items";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
}) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start gap-[30px] max-w-full text-left text-xs text-aliceblue-100 font-dm-sans mq1050:flex-wrap ${className}`}
    >
      <div className="w-[370px] flex flex-col items-start justify-start gap-7 max-w-full mq450:min-w-full mq1050:flex-1">
        <div className="self-stretch rounded-md flex flex-row items-start justify-end pt-3.5 px-3.5 pb-[206px] box-border bg-[url('/public/basketballequipment-1@2x.png')] bg-cover bg-no-repeat bg-[top] max-w-full">
          <img
            className="h-[248px] w-[370px] relative rounded-md object-cover hidden max-w-full"
            alt=""
            src="/basketballequipment-1@2x.png"
          />
          <div className="self-stretch rounded border-aliceblue-100 border-[0.8px] border-solid flex flex-row items-start justify-start py-[5px] pl-2.5 pr-[7px] z-[1]">
            <div className="relative capitalize">Basketball</div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[43.5px] max-w-full text-sm text-black font-roboto mq450:gap-[22px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[20.7px] max-w-full">
            <div className="w-[322px] flex flex-row items-start justify-start gap-4 max-w-full">
              <img
                className="h-11 w-11 relative rounded-xl overflow-hidden shrink-0 object-cover"
                loading="lazy"
                alt=""
                src="/imgavatar03@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
                <div className="self-stretch relative tracking-[0.1px] leading-[22px] font-medium">
                  Jake Will.
                </div>
              </div>
            </div>
            <div className="relative leading-[100.9%] font-medium font-dm-sans text-gray-300 inline-block min-w-[93px]">
              04 June 2023
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[24.7px] max-w-full text-3xl text-main font-sequel-sans">
              <h3 className="m-0 relative text-inherit leading-[29px] font-normal font-[inherit] shrink-0 mq450:text-lg mq450:leading-[23px]">
                <p className="m-0">
                  5 Exercises Basketball Players Should Be Using To Develop
                  Strength
                </p>
              </h3>
              <div className="w-[358px] h-[39px] relative text-base leading-[123.9%] font-medium font-dm-sans text-dimgray inline-block shrink-0 max-w-full z-[1]">
                This article was written by Jake Willhoite from Healthlisted.com
                Strength in basketball isn’t all about a massive body mass or
                ripped muscles.
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[30px]">
            <img
              className="h-[50px] w-[70px] relative"
              alt=""
              src="/left-button-1.svg"
            />
            <img
              className="h-[50px] w-[70px] relative"
              alt=""
              src="/right-button.svg"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-row items-start justify-start gap-[30px] min-w-[500px] max-w-full text-sm mq750:flex-wrap mq750:min-w-full">
        <CarouselItems
          hockeyPlayers1="/hockeyplayers-1@2x.png"
          hockey="hockey"
          imgavatar03="/imgavatar03-1@2x.png"
          header="Foxi.zacon"
          june2023="03 June 2023"
          goldenKnightsOutToFulfillOwner="Golden Knights out to fulfill owner's quest to win Stanley Cup in 6th year"
          theVegasGoldenKnightsWillPlay="The Vegas Golden Knights will play the Florida Panthers in the Stanley Cup Final beginning Saturday."
        />
        <CarouselItems
          carouselContentBackgroundImage="url('/threewhiteshuttlecocksbadmintonracquet-1@2x.png')"
          hockeyPlayers1="/threewhiteshuttlecocksbadmintonracquet-1@2x.png"
          hockey="badminton"
          hockeyDisplay="inline-block"
          hockeyMinWidth="62px"
          imgavatar03="/imgavatar03-2@2x.png"
          header="Bong Lozada"
          june2023="01 June 2023"
          june2023Display="inline-block"
          june2023MinWidth="89px"
          goldenKnightsOutToFulfillOwner="‘Outdoor’ Badminton Gets Support From Local Federation"
          theVegasGoldenKnightsWillPlay="The Badminton World Federation is developing Air Badminton and the country’s governing body, Philippine Badminton Association."
        />
      </div>
    </div>
  );
};

export default FrameComponent1;
