import Link from "next/link";

import "./latest-posts.css";

export default function LatestPosts() {
  return (
    <section className={"latest-posts"}>
      <h2 className={"latest-posts__title"}>Latest posts</h2>
      <ul className={"latest-posts__list"}>
        <li className={"latest-posts__item"}>
          <article className={"post"}>
            <h3 className={"post__title"}>
              <Link className={"post__link"} href={"/blog/1"}>
                React application basic setup
              </Link>
            </h3>
            <p className={"post__details"}>
              <time className={"post__date"} dateTime={"2022-06-30"}>
                June 30, 2022
              </time>{" "}
              &middot; 10 min read
            </p>
            <p className={"post__intro"}>
              create-react-app is a great tool but sometimes we want to know what is under the hood or add custom
              configuration. Either way, this is a good starting point.
            </p>
          </article>
        </li>
        <li className={"latest-posts__item"}>
          <article className={"post"}>
            <h3 className={"post__title"}>
              <Link className={"post__link"} href={"/blog/1"}>
                How to add JavaScript behavior to Bulma navbar in a React app
              </Link>
            </h3>
            <p className={"post__details"}>
              <time className={"post__date"} dateTime={"2022-06-30"}>
                April 28, 2022
              </time>{" "}
              &middot; 5 min read
            </p>
            <p className={"post__intro"}>
              Bulma is a great CSS framework that comes with components ready to use. However some components like the
              navbar require a small JavaScript implementation in order to work as expected.
            </p>
          </article>
        </li>
        <li className={"latest-posts__item"}>
          <article className={"post"}>
            <h3 className={"post__title"}>
              <Link className={"post__link"} href={"/blog/1"}>
                Understanding variable hoisting in JavaScript
              </Link>
            </h3>
            <p className={"post__details"}>
              <time className={"post__date"} dateTime={"2022-06-30"}>
                January 31, 2022
              </time>{" "}
              &middot; 5 min read
            </p>
            <p className={"post__intro"}>
              Hosting is one of those concepts that are very important to master in order to understand how functions
              and variables work, and to approach programming in a way that resembles how engines look at our code.
            </p>
          </article>
        </li>
      </ul>
      <Link className={"latest-posts__link"} href={"/blog"}>
        View all posts
      </Link>
    </section>
  );
}
