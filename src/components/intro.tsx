import Link from "next/link";

export default function Intro() {
  return (
    <section className={"bg-slate-100 p-4 border-l-2 border-l-slate-400"}>
      <h2 className={"text-xl font-semibold mb-3"}>Hi! I'm Ignacio. I'm a software developer and entrepreneur.</h2>
      <p>
        I like building cool apps, contributing to open source and writing about software development and
        entrepreneurship.
      </p>
      <p className={"mb-3"}>
        I'm especially interested in <span className={"font-semibold"}>startups</span>.
      </p>
      <Link className={"underline"} href={"/about"}>
        More about me
      </Link>
    </section>
  );
}
