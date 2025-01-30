import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type ArticleRowType = {
  className?: string;
  football?: string;
  soccerBallGreenGrassSoccer?: string;

  /** Style props */
  categoryRowItemsPadding?: CSSProperties["padding"];
};

const ArticleRow: FunctionComponent<ArticleRowType> = ({
  className = "",
  categoryRowItemsPadding,
  football,
  soccerBallGreenGrassSoccer,
}) => {
  const categoryRowItemsStyle: CSSProperties = useMemo(() => {
    return {
      padding: categoryRowItemsPadding,
    };
  }, [categoryRowItemsPadding]);

  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start gap-[30px] min-w-[202px] text-center text-18xl font-sequel-sans ${className}`}
    >
      <div
        className="self-stretch flex flex-row items-start justify-start pt-5 pb-[21px] pl-[34px] pr-8 relative"
        style={categoryRowItemsStyle}
      >
        <div className="h-full w-full absolute !m-[0] top-[116px] right-[-270px] bottom-[-116px] left-[270px] rounded-md bg-aliceblue-100 [transform:_rotate(180deg)] [transform-origin:0_0]" />
        <h1 className="m-0 flex-1 relative text-inherit leading-[75px] uppercase font-normal font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#262626,_#b8c2ce)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1] mq450:text-3xl mq450:leading-[45px] mq750:text-11xl mq750:leading-[60px]">
          {football}
        </h1>
      </div>
      <div className="self-stretch h-72 relative">
        <div className="absolute top-[288px] left-[270px] rounded-md bg-aliceblue-100 w-full h-full [transform:_rotate(180deg)] [transform-origin:0_0]" />
        <img
          className="absolute top-[0px] left-[0px] rounded-md w-full h-full object-cover z-[1]"
          loading="lazy"
          alt=""
          src={soccerBallGreenGrassSoccer}
        />
      </div>
    </div>
  );
};

export default ArticleRow;
