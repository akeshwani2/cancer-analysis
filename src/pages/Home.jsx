import React, { useEffect } from "react";
import { DisplayInfo } from "../components";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";

const Home = () => {
  const { user, isLoading } = useStateContext();
  const { user: privyUser } = usePrivy();

  useEffect(() => {
    console.log("StateContext user:", user);
    console.log("Privy user:", privyUser);
    console.log("Is loading:", isLoading);
  }, [user, privyUser, isLoading]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        Dashboard
      </h1>
      <DisplayInfo />
    </div>
  );
};

export default Home;