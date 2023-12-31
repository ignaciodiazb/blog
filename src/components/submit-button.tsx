"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className={
        "text-white bg-black hover:bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 text-center dark:outline dark:outline-1 dark:outline-slate-300"
      }
      type={"submit"}>
      {text}
    </button>
  );
}
