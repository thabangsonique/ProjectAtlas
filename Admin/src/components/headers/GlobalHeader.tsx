import React from "react";

type Props = {
  name: string;
  isSmallText?: boolean;
  buttonComponent?: any;
};

export default function GlobalHeader({
  name,
  isSmallText,
  buttonComponent,
}: Props) {
  return (
    <div className="w-full flex justify-between items-center">
      {/* text */}
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>

      {/* button */}
      {buttonComponent}
    </div>
  );
}
