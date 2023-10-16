"use client";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { useRef } from "react";

import SubmitButton from "./submit-button";
import { createContact } from "@/actions/contact";

interface FormActions {
  reset: string;
  submit: string;
}

interface FormLabels {
  email: string;
  message: string;
  name: string;
}

const initialState = {
  message: null,
  success: null,
};

export default function ContactForm({ actions, labels }: { actions: FormActions; labels: FormLabels }) {
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
          {labels.name}
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
          {labels.email}
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
          {labels.message}
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
      <SubmitButton text={actions.submit} />
      <button
        className={
          "text-black bg-white hover:bg-slate-50 border font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        }
        onClick={() => {
          ref.current?.reset();
        }}>
        {actions.reset}
      </button>
      <p aria-live={"polite"} className={"mt-3"}>
        {state?.message}
      </p>
    </form>
  );
}
