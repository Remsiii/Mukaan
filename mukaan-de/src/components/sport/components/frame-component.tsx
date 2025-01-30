import { FunctionComponent } from "react";
import Post from "./post";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start gap-[30px] max-w-full text-left text-9xl text-main font-sequel-sans mq1050:flex-wrap ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-4 min-w-[370px] max-w-full mq450:min-w-full">
        <h2 className="m-0 w-[167px] relative text-inherit leading-[38px] font-normal font-[inherit] inline-block mq450:text-3xl mq450:leading-[30px]">
          Recent News
        </h2>
        <div className="self-stretch flex flex-col items-start justify-start gap-[72px] text-3xs text-aliceblue-100 font-dm-sans mq450:gap-[18px] mq750:gap-9">
          <div className="self-stretch flex flex-row items-start justify-start gap-[30px] mq750:flex-wrap">
            <div className="flex-1 rounded-md flex flex-row items-start justify-start pt-[218px] px-0 pb-0 box-border bg-[url('/public/karatefighters-1@2x.png')] bg-cover bg-no-repeat bg-[top] min-w-[175px]">
              <img
                className="h-[300px] w-[270px] relative rounded-md object-cover hidden"
                alt=""
                src="/karatefighters-1@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start pt-4 px-[18px] pb-3 relative gap-1">
                <img
                  className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-t-none rounded-b-md max-w-full overflow-hidden max-h-full object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/card@2x.png"
                />
                <div className="relative leading-[100.9%] font-medium z-[2]">
                  Day 5 Highlights
                </div>
                <div className="relative text-base leading-[123.9%] font-sequel-sans z-[2]">
                  Baku 2023 World Taekwondo Championships
                </div>
              </div>
            </div>
            <div className="flex-[0.9222] flex flex-col items-start justify-start pt-3.5 pb-[17px] pl-3.5 pr-[7px] box-border relative gap-[11px] min-w-[175px] text-gray-300 mq450:flex-1">
              <div className="w-full h-full absolute !m-[0] top-[300px] right-[-270px] bottom-[-300px] left-[270px] rounded-md bg-aliceblue-100 [transform:_rotate(180deg)] [transform-origin:0_0]" />
              <div className="self-stretch flex flex-col items-start justify-start gap-2.5 z-[1]">
                <Post
                  image="/image@2x.png"
                  pollar8712July2023="#Pollar. 87 - 12 July 2023"
                  bakuTaekwondoChampionships="Baku 2023 Taekwondo Championships"
                />
                <Post
                  image="/image-1@2x.png"
                  pollar8712July2023="#Goft. Toni - 20 July 2023"
                  bakuTaekwondoChampionships="Open Championship Royal Liverpool Golf"
                />
                <Post
                  image="/image-2@2x.png"
                  pollar8712July2023="#Cricket. Toni - 27 July 2023"
                  bakuTaekwondoChampionships="Ireland Tour of England Test 2023"
                />
              </div>
              <button className="cursor-pointer [border:none] py-0 pl-[82px] pr-[87px] bg-[transparent] self-stretch flex flex-row items-start justify-center mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="flex-1 rounded-10xs bg-silver flex flex-row items-start justify-start py-1.5 px-[7px] gap-1 z-[1]">
                  <div className="h-4 w-12 relative text-sm tracking-[0.01em] leading-[16px] font-medium font-dm-sans text-white text-center flex items-center justify-center shrink-0">
                    More
                  </div>
                  <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0">
                    <img
                      className="w-2.5 h-[7.4px] relative"
                      alt=""
                      src="/arrow-4.svg"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
          <h2 className="m-0 w-[173px] relative text-9xl leading-[38px] font-normal font-sequel-sans text-main inline-block mq450:text-3xl mq450:leading-[30px]">{`Sports Article `}</h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start gap-4 min-w-[370px] max-w-full mq450:min-w-full">
        <h2 className="m-0 relative text-inherit leading-[38px] font-normal font-[inherit] mq450:text-3xl mq450:leading-[30px]">
          Clubs Ranking
        </h2>
        <div className="self-stretch rounded-md bg-aliceblue-100 flex flex-col items-end justify-start pt-[19px] px-0 pb-3 box-border gap-[7.9px] max-w-full text-base">
          <div className="self-stretch h-[300px] relative rounded-md bg-aliceblue-100 hidden" />
          <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[31px] pr-[23px] box-border max-w-full">
            <div className="flex-1 flex flex-row items-start justify-start gap-[72px] max-w-full mq450:gap-[18px] mq750:gap-9 mq750:flex-wrap">
              <div className="w-[162px] flex flex-col items-start justify-start pt-px px-0 pb-0 box-border">
                <div className="self-stretch flex flex-col items-start justify-start gap-[23px]">
                  <div className="w-[45px] relative capitalize inline-block z-[1]">
                    club
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[8.8px] text-smi">
                    <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                      <div className="relative capitalize inline-block min-w-[8.9px] z-[1]">
                        1
                      </div>
                    </div>
                    <img
                      className="h-6 w-[23.6px] relative object-cover z-[1]"
                      loading="lazy"
                      alt=""
                      src="/imgteam09@2x.png"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                      <div className="self-stretch relative capitalize z-[1]">
                        Manchester City
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[26px] min-w-[276px]">
                <div className="self-stretch flex flex-row items-start justify-between gap-5 mq450:flex-wrap">
                  <div className="relative capitalize inline-block min-w-[25px] z-[1]">
                    GP
                  </div>
                  <div className="relative capitalize z-[1] mq450:w-full mq450:h-4">
                    w
                  </div>
                  <div className="relative capitalize z-[1] mq450:w-full mq450:h-3">
                    d
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1">
                    <div className="relative capitalize z-[1]">l</div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[9px]">
                    <div className="relative capitalize z-[1]">F</div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[3px]">
                    <div className="relative capitalize z-[1]">A</div>
                  </div>
                  <div className="relative capitalize inline-block min-w-[26px] z-[1]">
                    GD
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0.5 pr-1 text-center">
                  <div className="w-[276.1px] flex flex-row items-start justify-start gap-[27.2px]">
                    <div className="flex-1 relative capitalize inline-block min-w-[19.7px] z-[1]">
                      38
                    </div>
                    <div className="flex-1 relative capitalize inline-block min-w-[19.7px] z-[1]">
                      29
                    </div>
                    <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                      6
                    </div>
                    <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                      3
                    </div>
                    <div className="flex-1 relative capitalize inline-block min-w-[19.7px] z-[1]">
                      99
                    </div>
                    <div className="flex-1 relative capitalize inline-block min-w-[19.7px] z-[1]">
                      26
                    </div>
                    <div className="flex-1 relative capitalize inline-block min-w-[19.7px] z-[1]">
                      73
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[38px] bg-aliceblue-100 flex flex-col items-end justify-start pt-0 px-0 pb-0 box-border gap-[7px] max-w-full z-[1] text-smi mq750:h-auto">
            <div className="self-stretch h-[38px] relative bg-aliceblue-100 hidden" />
            <div className="self-stretch h-[0.5px] relative border-silver border-t-[0.5px] border-solid box-border z-[2]" />
            <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[31px] pr-[26px] box-border max-w-full">
              <div className="flex-1 flex flex-row items-start justify-start gap-[74px] max-w-full mq450:gap-[18px] mq750:gap-[37px] mq750:flex-wrap">
                <div className="w-[162.2px] flex flex-row items-start justify-start gap-[8.4px]">
                  <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                    <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                      2
                    </div>
                  </div>
                  <img
                    className="h-6 w-[23.6px] relative object-cover z-[1]"
                    loading="lazy"
                    alt=""
                    src="/imgteam07@2x.png"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0">
                    <div className="self-stretch relative capitalize z-[1]">
                      Liverpool
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[270px] text-center text-base">
                  <div className="self-stretch flex flex-row items-start justify-between gap-5">
                    <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                      38
                    </div>
                    <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                      28
                    </div>
                    <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                      8
                    </div>
                    <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                      2
                    </div>
                    <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                      94
                    </div>
                    <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                      26
                    </div>
                    <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                      68
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[0.5px] relative border-silver border-t-[0.5px] border-solid box-border z-[2]" />
          </div>
          <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[31px] pr-[26px] box-border max-w-full text-smi">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq750:flex-wrap">
              <div className="w-[145.2px] flex flex-row items-start justify-start gap-[8.4px]">
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                    3
                  </div>
                </div>
                <img
                  className="h-6 w-[23.6px] relative object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/imgteam06@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <div className="self-stretch relative capitalize z-[1]">
                    Chelsea
                  </div>
                </div>
              </div>
              <div className="w-[276.1px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border text-center text-base">
                <div className="self-stretch flex flex-row items-start justify-between gap-5">
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[5px]">
                    <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                      38
                    </div>
                  </div>
                  <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                    21
                  </div>
                  <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                    11
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1">
                    <div className="self-stretch relative capitalize inline-block min-w-[10.8px] z-[1]">
                      6
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[5px]">
                    <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                      76
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
                    <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                      33
                    </div>
                  </div>
                  <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                    43
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[38.5px] bg-aliceblue-100 flex flex-col items-end justify-start pt-0 px-0 pb-[0.5px] box-border gap-[7px] max-w-full z-[1] text-center mq750:h-auto">
            <div className="self-stretch h-[38px] relative bg-aliceblue-100 hidden" />
            <div className="self-stretch h-[0.5px] relative border-silver border-t-[0.5px] border-solid box-border z-[2]" />
            <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[31px] pr-[26px] box-border max-w-full">
              <div className="flex-1 flex flex-row items-start justify-start gap-[28.4px] max-w-full mq750:flex-wrap">
                <div className="w-[207.8px] flex flex-row items-start justify-start py-0 pl-0 pr-[13px] box-border gap-[8.4px] text-left text-smi">
                  <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                    <div className="relative capitalize inline-block min-w-[10.8px] z-[2]">
                      4
                    </div>
                  </div>
                  <img
                    className="h-6 w-[23.6px] relative object-cover z-[2]"
                    loading="lazy"
                    alt=""
                    src="/imgteam05@2x.png"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
                    <div className="self-stretch relative capitalize z-[2]">
                      Tottenham Hotspur
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[224px]">
                  <div className="self-stretch flex flex-row items-start justify-between gap-5">
                    <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[5px]">
                      <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[2]">
                        38
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[3px]">
                      <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[2]">
                        22
                      </div>
                    </div>
                    <div className="relative capitalize inline-block min-w-[10.8px] z-[2]">
                      5
                    </div>
                    <div className="relative capitalize inline-block min-w-[19.7px] z-[2]">
                      11
                    </div>
                    <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[5px]">
                      <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[2]">
                        69
                      </div>
                    </div>
                    <div className="relative capitalize inline-block min-w-[19.7px] z-[2]">
                      40
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                  <div className="w-[19.7px] relative capitalize inline-block z-[2]">
                    29
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[0.5px] relative border-silver border-t-[0.5px] border-solid box-border z-[2]" />
          </div>
          <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[31px] pr-[26px] box-border max-w-full text-smi">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq750:flex-wrap">
              <div className="w-[127.2px] flex flex-row items-start justify-start gap-[8.4px]">
                <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                  <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                    5
                  </div>
                </div>
                <img
                  className="h-6 w-[23.6px] relative object-cover z-[1]"
                  alt=""
                  src="/imgteam04@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                  <div className="self-stretch relative capitalize z-[1]">
                    Arsenal
                  </div>
                </div>
              </div>
              <div className="w-[276.1px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border text-center text-base">
                <div className="self-stretch flex flex-row items-start justify-between gap-5">
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[5px]">
                    <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                      38
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[3px]">
                    <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                      22
                    </div>
                  </div>
                  <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                    3
                  </div>
                  <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                    13
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[5px]">
                    <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                      61
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
                    <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                      48
                    </div>
                  </div>
                  <div className="relative capitalize inline-block min-w-[19.7px] z-[1]">
                    13
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch bg-aliceblue-100 overflow-x-auto flex flex-row items-start justify-start py-[7px] px-[30px] gap-[27.5px] z-[2] text-center">
            <div className="h-[0.5px] w-[570.5px] relative border-silver border-t-[0.5px] border-solid box-border shrink-0 hidden" />
            <div className="h-[38px] w-[570px] relative bg-aliceblue-100 shrink-0 hidden" />
            <div className="w-[208.7px] shrink-0 flex flex-row items-start justify-start py-0 pl-0 pr-3.5 box-border gap-[8.4px] text-left text-smi">
              <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                <div className="relative capitalize inline-block min-w-[10.8px] z-[1]">
                  6
                </div>
              </div>
              <img
                className="h-6 w-[23.6px] relative object-cover z-[1]"
                alt=""
                src="/imgteam08@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0">
                <div className="self-stretch relative capitalize z-[1]">
                  Manchester United
                </div>
              </div>
            </div>
            <div className="w-[182.8px] shrink-0 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
              <div className="self-stretch flex flex-row items-start justify-start gap-[18.7px]">
                <div className="flex-[0.7091] flex flex-col items-start justify-start py-0 pl-0 pr-2">
                  <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                    38
                  </div>
                </div>
                <div className="flex-[0.907] flex flex-col items-start justify-start py-0 pl-0 pr-0.5">
                  <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                    16
                  </div>
                </div>
                <div className="flex-1 relative capitalize inline-block min-w-[19.7px] z-[1]">
                  10
                </div>
                <div className="flex-[0.9074] flex flex-col items-start justify-start py-0 pl-0 pr-0.5">
                  <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                    12
                  </div>
                </div>
                <div className="flex-1 relative capitalize inline-block min-w-[19.7px] z-[1]">
                  57
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-0.5 pb-0 pl-0 pr-1">
              <div className="self-stretch relative capitalize inline-block min-w-[19.7px] z-[1]">
                57
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
              <div className="w-[10.8px] relative capitalize inline-block z-[1]">
                0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
