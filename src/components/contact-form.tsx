"use client";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { useRef } from "react";

import SubmitButton from "./submit-button";
import { createContact } from "@/actions/contact";

const initialState = {
  message: null,
  success: null,
};

export default function ContactForm() {
  const [state, formAction] = useFormState(createContact, initialState);
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await formAction(formData);
        ref.current?.reset();
      }}
      ref={ref}>
      <div className={"mb-6"}>
        <label className={"text-sm font-medium text-gray-900"} htmlFor={"name"}>
          Name
        </label>
        <input
          className={"bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md block w-full p-2.5"}
          id={"name"}
          maxLength={60}
          name={"name"}
          required
          type={"text"}
        />
      </div>
      <div className={"mb-6"}>
        <label className={"text-sm font-medium text-gray-900"} htmlFor={"email"}>
          Email
        </label>
        <input
          className={"bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md block w-full p-2.5"}
          id={"email"}
          maxLength={60}
          name={"email"}
          required
          type={"email"}
        />
      </div>
      <div className={"mb-6"}>
        <label className={"text-sm font-medium text-gray-900"} htmlFor={"message"}>
          Message
        </label>
        <textarea
          className={"bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md block w-full p-2.5"}
          id={"message"}
          maxLength={500}
          name={"message"}
          required
          rows={5}
        />
      </div>
      <SubmitButton />
      <button
        className={
          "text-black bg-white hover:bg-slate-50 border font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        }
        onClick={() => {
          ref.current?.reset();
        }}>
        Reset
      </button>
      <p aria-live={"polite"} className={"mt-3"}>
        {state?.message}
      </p>
    </form>
  );
}
