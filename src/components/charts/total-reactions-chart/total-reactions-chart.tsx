import React from "react";
import useSWR from "swr";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetcher } from "@/fetch-helpers";
import { reactCounts } from "@/routes";
import { Loading } from "@/components/charts/loading/loading";
import { ReactionCounts } from "@/domain/message-data/data.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Reactions given over the past 30 days",
    },
  },
};

export function TotalReactionsChart() {
  let { data, isLoading } = useSWR<ReactionCounts[]>(reactCounts, fetcher);

  if (isLoading || data === undefined) {
    return <Loading />;
  }

  data.sort((a, b) => (a.count < b.count ? 1 : -1));

  let parseData = {
    labels: data.map((x) => x.author || x.phoneNumber),
    datasets: [
      {
        label: "Reactions",
        data: data.map((x) => x.count),
        backgroundColor: "rgba(45, 85, 255, 0.9)",
      },
    ],
  };
  return (
    <>
      <Bar options={options} data={parseData} />
    </>
  );
}
