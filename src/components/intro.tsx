import Link from "next/link";

import "./intro.css";

export default function Intro() {
  return (
    <section className={"intro"}>
      <h2 className={"intro__title"}>Hi! I'm Ignacio. I'm a software developer and entrepreneur.</h2>
      <p className={"intro__description"}>
        I like building cool apps, contributing to open source and writing about software development and
        entrepreneurship.
      </p>
      <p className={"intro__description"}>I'm especially interested in startups.</p>
      <Link className={"intro__link"} href={"/about"}>
        More about me
      </Link>
    </section>
  );
}
