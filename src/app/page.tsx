import { Fragment } from "react";

import Intro from "@/components/intro";
import LatestPosts from "@/components/latest-posts";

import "./page.css";

export default function HomePage() {
  return (
    <Fragment>
      <Intro />
      <LatestPosts />
    </Fragment>
  );
}
