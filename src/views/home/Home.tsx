import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col h-full lg:pt-14 flex-1">
      <h1>Landing page</h1>
      <Link to="/auth/login">Login link</Link>
      <Link to="/auth/register">Register link</Link>
    </div>
  );
}

export default Home;
