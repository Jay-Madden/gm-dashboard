import style from "./charts.module.scss";
import React from "react";
import { TotalReactionsChart } from "@/components/charts/total-reactions-chart/total-reactions-chart";

export function Charts() {
  return (
    <>
      <div className={style.container}>
        <div className={style.reactions}>
          <TotalReactionsChart />
        </div>
        <div></div>
      </div>
    </>
  );
}
