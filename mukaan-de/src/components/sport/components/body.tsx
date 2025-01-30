import { FunctionComponent } from "react";
import ArticleRow from "./article-row";

export type BodyType = {
  className?: string;
};

const Body: FunctionComponent<BodyType> = ({ className = "" }) => {
  return (
    <div
      className={`w-[1325px] flex flex-row items-end justify-start py-0 pl-0 pr-5 box-border gap-[30px] max-w-full text-left text-lg text-main font-dm-sans mq1050:pl-5 mq1050:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[108px] max-w-[calc(100%_-_300px)] mq750:gap-[27px] mq1050:gap-[54px] mq1050:max-w-full">
        <div className="w-[638px] h-[513px] relative max-w-full">
          <div className="absolute top-[0px] left-[-78px] w-[716px] flex flex-row items-start justify-start">
            <img
              className="h-[513px] flex-1 relative max-w-full overflow-hidden object-cover mix-blend-luminosity"
              loading="lazy"
              alt=""
              src="/basketball-sport-icon-in-minimalist-3d-render-2-1@2x.png"
            />
            <div className="w-[720px] !m-[0] absolute right-[-366px] bottom-[-126px] flex flex-row items-start justify-end pt-[463px] px-[104px] pb-[42px] box-border bg-[url('/public/basketballplayeractionsunset-1@2x.png')] bg-cover bg-no-repeat bg-[top] z-[2]">
              <img
                className="h-[580px] w-[720px] relative object-cover hidden max-w-full"
                alt=""
                src="/basketballplayeractionsunset-1@2x.png"
              />
              <div className="w-[364px] relative leading-[25px] inline-block shrink-0 max-w-full z-[3]">
                The EuroLeague Finals Top Scorer is the individual award for the
                player that gained the highest points in the EuroLeague Finals
              </div>
            </div>
          </div>
          <h1 className="m-0 absolute top-[92px] left-[135px] text-61xl leading-[75px] uppercase font-normal font-sequel-sans text-transparent !bg-clip-text [background:linear-gradient(180deg,_#262626,_#b8c2ce)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block w-[470px] z-[1] mq450:text-5xl mq450:leading-[30px] mq750:text-21xl mq750:leading-[45px]">
            Top scorer to the final match
          </h1>
        </div>
        <div className="self-stretch flex flex-row items-start justify-end max-w-full text-9xl font-sequel-sans">
          <div className="w-[890px] flex flex-col items-end justify-start py-0 pl-5 pr-0 box-border gap-20 max-w-full mq450:gap-5 mq1050:gap-10">
            <button className="cursor-pointer [border:none] py-0 px-[185px] bg-[transparent] flex flex-row items-start justify-center box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
              <div className="rounded-md bg-main flex flex-row items-start justify-start py-3 px-[30px] z-[3]">
                <b className="relative text-xl tracking-[0.09em] leading-[38px] uppercase font-dm-sans text-aliceblue-200 text-left">
                  continue reading
                </b>
              </div>
            </button>
            <div className="self-stretch flex flex-col items-start justify-start gap-4">
              <h2 className="m-0 w-[118px] relative text-inherit leading-[38px] font-normal font-[inherit] inline-block mq450:text-3xl mq450:leading-[30px]">
                Category
              </h2>
              <div className="self-stretch flex flex-row items-start justify-start flex-wrap content-start gap-[30px] text-center text-18xl mq450:grid-cols-[minmax(202px,_1fr)] mq750:justify-center mq750:grid-cols-[repeat(2,_minmax(202px,_351px))]">
                <ArticleRow
                  football="Football"
                  soccerBallGreenGrassSoccer="/soccerballgreengrasssoccerfieldgenerativeai-1@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start gap-[30px] min-w-[202px]">
                  <div className="self-stretch rounded-md bg-aliceblue-100 flex flex-row items-start justify-start">
                    <div className="self-stretch w-[270px] relative rounded-md bg-aliceblue-100 hidden" />
                    <img
                      className="h-[235px] flex-1 relative rounded-md max-w-full overflow-hidden object-cover z-[1]"
                      loading="lazy"
                      alt=""
                      src="/closeupbasketballoutdoors-1@2x.png"
                    />
                  </div>
                  <div className="self-stretch rounded-md bg-aliceblue-100 flex flex-row items-start justify-start pt-[45px] px-[21px] pb-[46px]">
                    <div className="h-[169px] w-[270px] relative rounded-md bg-aliceblue-100 hidden" />
                    <h1 className="m-0 w-[211px] relative text-inherit leading-[39px] uppercase font-normal font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#262626,_#b8c2ce)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0 z-[1] mq450:text-3xl mq450:leading-[23px] mq750:text-11xl mq750:leading-[31px]">
                      bascket ball
                    </h1>
                  </div>
                </div>
                <ArticleRow
                  categoryRowItemsPadding="38px 10px 39px 11px"
                  football="car sport"
                  soccerBallGreenGrassSoccer="/sportcarisdriftingtrackwithsmokearoundit-1@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[270px] flex flex-col items-start justify-start gap-[172px] text-3xs text-gray-300 mq450:gap-[86px] mq1050:hidden">
        <div className="self-stretch flex flex-col items-start justify-start gap-[30px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-6">
            <button className="cursor-pointer [border:none] py-1 pl-4 pr-[15px] bg-aliceblue-200 rounded-10xs flex flex-row items-start justify-start hover:bg-lightgray">
              <div className="relative text-xl capitalize font-medium font-dm-sans text-silver text-left">{`Today `}</div>
            </button>
            <div className="self-stretch flex flex-row items-start justify-start pt-[101px] px-0 pb-0 relative">
              <img
                className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-md max-w-full overflow-hidden max-h-full object-cover mix-blend-multiply"
                loading="lazy"
                alt=""
                src="/beautifulyoungafricanwomansportsclothingrunningagainstgraybackground-1@2x.png"
              />
              <div className="flex-1 rounded-md [background:linear-gradient(0deg,_#f2f2f2,_rgba(242,_242,_242,_0))] flex flex-col items-start justify-start pt-[66px] px-[18px] pb-3 gap-1 z-[1]">
                <div className="w-[270px] h-[132px] relative rounded-md [background:linear-gradient(0deg,_#f2f2f2,_rgba(242,_242,_242,_0))] hidden" />
                <div className="relative leading-[100.9%] font-medium z-[2]">
                  Race98 - 03 June 2023
                </div>
                <div className="w-[200px] relative text-base leading-[123.9%] font-sequel-sans text-main inline-block z-[2]">
                  Ethiopian runners took the top four spots.
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-md flex flex-row items-start justify-start pt-[101px] px-0 pb-0 bg-[url('/public/fastacceleratingracecarformulaoneracingamidsunsetgenerativeai-1@2x.png')] bg-cover bg-no-repeat bg-[top]">
            <img
              className="h-[233px] w-[270px] relative rounded-md object-cover hidden"
              alt=""
              src="/fastacceleratingracecarformulaoneracingamidsunsetgenerativeai-1@2x.png"
            />
            <div className="flex-1 rounded-md [background:linear-gradient(0deg,_#f2f2f2,_rgba(242,_242,_242,_0))] flex flex-col items-start justify-start pt-[66px] px-[18px] pb-3 gap-1 z-[1]">
              <div className="w-[270px] h-[132px] relative rounded-md [background:linear-gradient(0deg,_#f2f2f2,_rgba(242,_242,_242,_0))] hidden" />
              <div className="relative leading-[100.9%] font-medium z-[2]">
                INDYCAR - 03 June 2023
              </div>
              <div className="relative text-base leading-[123.9%] font-sequel-sans text-main z-[2]">
                IndyCar Detroit: Dixon quickest in second practice
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[30px] text-center text-18xl font-sequel-sans">
          <div className="self-stretch rounded-md bg-gray-100 flex flex-row items-start justify-start pt-[46px] px-0 pb-[42px]">
            <div className="h-[286px] w-[270px] relative rounded-md bg-gray-100 hidden" />
            <img
              className="h-[198px] flex-1 relative max-w-full overflow-hidden object-cover z-[1]"
              loading="lazy"
              alt=""
              src="/redpingpongracketsportsequipment-1@2x.png"
            />
          </div>
          <div className="self-stretch rounded-md bg-aliceblue-100 flex flex-row items-start justify-start py-5 pl-[30px] pr-[29px]">
            <div className="h-[118px] w-[270px] relative rounded-md bg-aliceblue-100 hidden" />
            <h1 className="m-0 flex-1 relative text-inherit leading-[39px] uppercase font-normal font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#262626,_#b8c2ce)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1] mq450:text-3xl mq450:leading-[23px] mq750:text-11xl mq750:leading-[31px]">
              Table Tennis
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
