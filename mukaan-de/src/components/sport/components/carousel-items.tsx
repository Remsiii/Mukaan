import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type CarouselItemsType = {
  className?: string;
  hockeyPlayers1?: string;
  hockey?: string;
  imgavatar03?: string;
  header?: string;
  june2023?: string;
  goldenKnightsOutToFulfillOwner?: string;
  theVegasGoldenKnightsWillPlay?: string;

  /** Style props */
  carouselContentBackgroundImage?: CSSProperties["backgroundImage"];
  hockeyDisplay?: CSSProperties["display"];
  hockeyMinWidth?: CSSProperties["minWidth"];
  june2023Display?: CSSProperties["display"];
  june2023MinWidth?: CSSProperties["minWidth"];
};

const CarouselItems: FunctionComponent<CarouselItemsType> = ({
  className = "",
  carouselContentBackgroundImage,
  hockeyPlayers1,
  hockey,
  hockeyDisplay,
  hockeyMinWidth,
  imgavatar03,
  header,
  june2023,
  june2023Display,
  june2023MinWidth,
  goldenKnightsOutToFulfillOwner,
  theVegasGoldenKnightsWillPlay,
}) => {
  const carouselContentStyle: CSSProperties = useMemo(() => {
    return {
      backgroundImage: carouselContentBackgroundImage,
    };
  }, [carouselContentBackgroundImage]);

  const hockeyStyle: CSSProperties = useMemo(() => {
    return {
      display: hockeyDisplay,
      minWidth: hockeyMinWidth,
    };
  }, [hockeyDisplay, hockeyMinWidth]);

  const june2023Style: CSSProperties = useMemo(() => {
    return {
      display: june2023Display,
      minWidth: june2023MinWidth,
    };
  }, [june2023Display, june2023MinWidth]);

  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start gap-[15px] min-w-[240px] max-w-full text-left text-sm text-aliceblue-100 font-dm-sans ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[13px] box-border max-w-full text-xs">
        <div
          className="self-stretch flex-1 rounded-md flex flex-row items-start justify-end pt-3.5 px-3.5 pb-[206px] box-border bg-[url('/public/hockeyplayers-1@2x.png')] bg-cover bg-no-repeat bg-[top] max-w-full"
          style={carouselContentStyle}
        >
          <img
            className="h-[248px] w-[370px] relative rounded-md object-cover hidden max-w-full"
            alt=""
            src={hockeyPlayers1}
          />
          <div className="self-stretch rounded border-aliceblue-100 border-[0.8px] border-solid flex flex-row items-start justify-start py-[5px] pl-2.5 pr-[7px] z-[1]">
            <div className="relative capitalize" style={hockeyStyle}>
              {hockey}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[322px] flex flex-row items-start justify-start pt-0 px-0 pb-[5px] box-border gap-4 max-w-full text-black font-roboto">
        <img
          className="h-11 w-11 relative rounded-xl overflow-hidden shrink-0 object-cover"
          alt=""
          src={imgavatar03}
        />
        <div className="flex-1 flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
          <div className="self-stretch relative tracking-[0.1px] leading-[22px] font-medium">
            {header}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[3px] text-gray-300">
        <div
          className="relative leading-[100.9%] font-medium"
          style={june2023Style}
        >
          {june2023}
        </div>
      </div>
      <h3 className="m-0 relative text-3xl leading-[29px] font-normal font-sequel-sans text-main mq450:text-lg mq450:leading-[23px]">
        {goldenKnightsOutToFulfillOwner}
      </h3>
      <div className="w-[357px] relative text-base leading-[123.9%] font-medium text-dimgray inline-block max-w-full">
        {theVegasGoldenKnightsWillPlay}
      </div>
    </div>
  );
};

export default CarouselItems;
