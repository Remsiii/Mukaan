import { FunctionComponent } from "react";

export type PostType = {
  className?: string;
  image?: string;
  pollar8712July2023?: string;
  bakuTaekwondoChampionships?: string;
};

const Post: FunctionComponent<PostType> = ({
  className = "",
  image,
  pollar8712July2023,
  bakuTaekwondoChampionships,
}) => {
  return (
    <div
      className={`self-stretch flex flex-row items-end justify-start gap-3 text-left text-3xs text-gray-300 font-dm-sans ${className}`}
    >
      <img
        className="h-[70px] w-[70px] relative rounded-10xs object-cover"
        loading="lazy"
        alt=""
        src={image}
      />
      <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-1.5">
        <div className="self-stretch flex flex-col items-start justify-start gap-1">
          <div className="relative leading-[100.9%] font-medium">
            {pollar8712July2023}
          </div>
          <div className="relative text-base leading-[123.9%] font-sequel-sans text-main">
            {bakuTaekwondoChampionships}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
