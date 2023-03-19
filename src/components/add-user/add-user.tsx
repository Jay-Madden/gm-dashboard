import style from "./add-user.module.scss";
import React, { useState } from "react";
import { reactCounts, usersAdd } from "@/routes";
import { Methods } from "@/api-methods";
import { useSWRConfig } from "swr";

export function AddUser() {
  const { mutate } = useSWRConfig();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function submit() {
    setSubmitDisabled(true);
    setName("");
    setPhoneNumber("");

    let res = await fetch(usersAdd, {
      method: Methods.post,
      body: JSON.stringify({ name: name, phoneNumber: phoneNumber }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setStatus("Success");
    } else {
      setStatus("Failed");
    }
    setSubmitDisabled(false);

    await mutate(reactCounts);

    setTimeout(() => setStatus(""), 3000);
  }
  return (
    <>
      <div className={style.position}>
        <div className={style.formContainer}>
          <h2>If you dont see your name input it here</h2>
          <label>
            Name:{" "}
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Phone Number (Starting with 1) :
            <input
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button
            className={style.submit}
            onClick={submit}
            disabled={submitDisabled || name === "" || phoneNumber === ""}
          >
            Submit
          </button>
          {status}
        </div>
      </div>
    </>
  );
}
