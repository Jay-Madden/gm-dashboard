import style from "./loading.module.scss";
import React from "react";

export function Loading() {
  return (
    <>
      <section>
        <div className={style.loading + " " + style.loading08}>
          <span data-text="L">L</span>
          <span data-text="O">O</span>
          <span data-text="A">A</span>
          <span data-text="D">D</span>
          <span data-text="I">I</span>
          <span data-text="N">N</span>
          <span data-text="G">G</span>
        </div>
      </section>
    </>
  );
}
