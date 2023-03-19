import style from "./add-user.module.scss";
import React, { useState } from "react";
import { usersAdd } from "@/pages/api/routes";
import { Methods } from "@/api-methods";

export function AddUser() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false)

  async function submit() {
    setSubmitDisabled(true);
    setName("");
    setPhoneNumber("");

    let res = await fetch(usersAdd, {
      method: Methods.post,
      body: JSON.stringify({ name: name, phoneNumber: phoneNumber }),
    });

    if (res.ok) {
      setStatus("Success");
    } else {
      setStatus("Failed");
    }
    setSubmitDisabled(false);

    setTimeout(() => setStatus(""), 10000);
  }
  return (
    <>
      <div className={style.container}>
        <h2>Input your name</h2>
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
        <button className={style.submit} onClick={submit} disabled={submitDisabled}>
          Submit
        </button>
        {status}
      </div>
    </>
  );
}
