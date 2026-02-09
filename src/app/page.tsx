"use client";

import Link from "next/link";
import Header from "./Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Link href="/editor">Go to Editor</Link>
    </div>
  );
};

export default HomePage;
