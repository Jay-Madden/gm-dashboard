import styles from "@/components/title-bar/TitleBar.module.scss";
import useSWR from "swr";
import { fetcher } from "@/fetch-helpers";

export function TitleBar() {
  const { data, error, isLoading } = useSWR("/api/test", fetcher);
  return (
    <h1 className={styles.title}>
      GM Dashboard<div>{data}</div>
    </h1>
  );
}
