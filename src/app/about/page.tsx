import Link from "next/link";
import { Fragment } from "react";

import "./page.css";

export default function AboutPage() {
  return (
    <Fragment>
      <h2 className={"about__title"}>About</h2>
      <p className={"about__description"}>
        I'm a software developer and entrepreneur with professional background in IT consulting and the real estate
        sector
      </p>
      <p className={"about__description"}>
        In 2021 I built an MVP for my project&nbsp;
        <Link className={"about__link"} href={"https://eparkk.netlify.app/"} target={"_blank"}>
          eparkk
        </Link>
        &#59; an application that helped drivers find and book parking. However I decided to shut down eparkk after a
        few months due to poor results.
      </p>
      <p className={"about__description"}>
        In 2022 I joined&nbsp;
        <Link className={"about__link"} href={"https://www.movelab.cl/home"} target={"_blank"}>
          Move Lab
        </Link>
        &nbsp; full time as Full Stack Developer. I worked mainly in projects of the real estate industry.
      </p>
      <p className={"about__description"}>
        Currently I'm working as freelance developer. My areas of interest are web/mobile development, and machine
        learning.
      </p>
    </Fragment>
  );
}
