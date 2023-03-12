import style from "./pin-of-shame.module.scss"
export function PinOfShame() {
  return (
    <>
      <div>
        <h1 className={style.title}>📌 Pin of shame 📌</h1>
        <div className={style.imessage}>
          <div className={style.person}>Emily</div>
          <p className={style.fromthem}>
            nah he never smelt like unwashed balls around me sadly{" "}
          </p>
          <div className={style.person}>Chris</div>
          <p className={style.fromthem}>
            That’s so cap lmao I routinely left 4-5 days of funk and scum layers
            for u. Stop lying for ur friends lol.{" "}
          </p>
        </div>
      </div>
    </>
  )
}
