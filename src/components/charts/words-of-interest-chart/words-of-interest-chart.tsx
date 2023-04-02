import React from "react";
import useSWR from "swr";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { fetcher } from "@/fetch-helpers";
import { wordsOfInterestCount } from "@/routes";
import { Loading } from "@/components/charts/loading/loading";
import { Pie } from "react-chartjs-2";
import { WordOfInterestCount } from "@/domain/message-data/data.types";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { colorArray } from "@/components/charts/words-of-interest-chart/colors";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function getRandomColor() {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "right" as const,
    },
    datalabels: {
      display: "auto",
      align: "end" as const,
      backgroundColor: "#ccc",
      offset: 100,
      borderRadius: 3,
      font: {
        size: 18,
      },
    },
    title: {
      display: true,
      text: "Words of Interest over last 30 days",
    },
  },
};

export function WordsOfInterestChart() {
  let { data, isLoading } = useSWR<WordOfInterestCount>(
    wordsOfInterestCount,
    fetcher
  );

  if (isLoading || data === undefined) {
    return <Loading />;
  }

  let bkgColors: string[] = [];

  for (let i = 0; i < Object.values(data).length; i++) {
    let rand = getRandomColor();
    while (bkgColors.includes(rand)) {
      rand = getRandomColor();
    }

    bkgColors.push(rand);
  }

  let parseData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: bkgColors,
      },
    ],
  };

  return (
    <>
      <Pie options={options} data={parseData} />
    </>
  );
}
