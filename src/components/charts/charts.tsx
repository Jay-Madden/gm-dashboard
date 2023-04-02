import style from "./charts.module.scss";
import React from "react";
import { TotalReactionsChart } from "@/components/charts/total-reactions-chart/total-reactions-chart";
import { WordsOfInterestChart } from "@/components/charts/words-of-interest-chart/words-of-interest-chart";

export function Charts() {
  return (
    <>
      <div className={style.container}>
        <div className={style.reactions}>
          <TotalReactionsChart />
        </div>
        <div className={style.wordOfInterest}>
          <WordsOfInterestChart />
        </div>
      </div>
    </>
  );
}
