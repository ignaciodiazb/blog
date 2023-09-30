import Link from "next/link";
import { Fragment } from "react";

export default function AboutPage() {
  return (
    <Fragment>
      <h2 className={"text-3xl font-medium mb-3"}>About</h2>
      <p className={"mb-2"}>
        I'm a software developer and entrepreneur with professional background in IT consulting and the real estate
        sector
      </p>
      <p className={"mb-2"}>
        In 2021 I built an MVP for my project&nbsp;
        <Link className={"underline"} href={"https://eparkk.netlify.app/"} target={"_blank"}>
          eparkk
        </Link>
        &#59; an application that helped drivers find and book parking. However I decided to shut down eparkk after a
        few months due to poor results.
      </p>
      <p className={"mb-2"}>
        In 2022 I joined&nbsp;
        <Link className={"underline"} href={"https://www.movelab.cl/home"} target={"_blank"}>
          Move Lab
        </Link>
        &nbsp; full time as Full Stack Developer. I worked mainly in projects of the real estate industry.
      </p>
      <p>
        Currently I'm working as freelance developer. My areas of interest are web/mobile development, and machine
        learning.
      </p>
    </Fragment>
  );
}
