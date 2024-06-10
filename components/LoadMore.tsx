"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  endCursor: string;
  hasNextPage: boolean;
};

const LoadMore = ({ endCursor, hasNextPage }: Props) => {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === "first") {
      currentParams.delete("endcursor");
    } else if (direction === "next" && hasNextPage) {
      currentParams.set("endcursor", endCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathName = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathName);
  };
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {endCursor && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {hasNextPage && (
        <Button
          title="Next Expenses"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  );
};

export default LoadMore;
