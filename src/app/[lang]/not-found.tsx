import Link from "next/link";

export default function notFound() {
  return (
    <div className={"py-5"}>
      <h2 className={"text-2xl font-bold text-center mb-5"}>404 - Page not found</h2>
      <p className={"text-lg"}>Sorry, we couldn't find this page. These are some reasons why you see this:</p>
      <ul className={"list-disc text-lg my-5 px-3 lg:px-0"}>
        <li>You may have mistyped the address.</li>
        <li>The page may have moved.</li>
        <li>The page may have never existed.</li>
      </ul>
      <Link className={"underline"} href={"/"}>
        &#8592; Return home
      </Link>
    </div>
  );
}
