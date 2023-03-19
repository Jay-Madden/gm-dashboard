import style from "./loading.module.scss";
import React from "react";

export function Loading() {
  return (
    <>
      <span className={style.loader}></span>
    </>
  );
}
