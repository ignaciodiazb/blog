import { Fragment } from "react";

import Post from "@/components/post";

import "./page.css";

export default function BlogPage() {
  return (
    <Fragment>
      <h2 className={"posts__title"}>Blog</h2>
      <ul className={"posts__list"}>
        <li className={"posts__item"}>
          <Post
            date={"June 30, 2022"}
            intro={
              "create-react-app is a great tool but sometimes we want to know what is under the hood or add custom configuration. Either way, this is a good starting point."
            }
            readingTime={10}
            slug={"react-application-basic-setup"}
            title={"React application basic setup"}
            key={"react-application-basic-setup"}
          />
        </li>
        <li className={"posts__item"}>
          <Post
            date={"April 28, 2022"}
            intro={
              "Bulma is a great CSS framework that comes with components ready to use. However some components like the navbar require a small JavaScript implementation in order to work as expected."
            }
            readingTime={5}
            slug={"bulma-javascript-navbar"}
            title={"How to add JavaScript behavior to Bulma navbar in a React app"}
            key={"bulma-javascript-navbar"}
          />
        </li>
        <li className={"posts__item"}>
          <Post
            date={"January 31, 2022"}
            intro={
              "Hosting is one of those concepts that are very important to master in order to understand how functions and variables work, and to approach programming in a way that resembles how engines look at our code."
            }
            readingTime={10}
            slug={"javascript-variable-hoisting"}
            title={"Understanding variable hoisting in JavaScript"}
            key={"javascript-variable-hoisting"}
          />
        </li>
      </ul>
    </Fragment>
  );
}
