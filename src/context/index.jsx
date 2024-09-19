import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { db } from "../utils/dbConfig";
import { Users } from "../utils/schema";
import { eq } from "drizzle-orm";
import { usePrivy } from "@privy-io/react-auth";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user: privyUser } = usePrivy();

  const fetchUser = useCallback(async (privyUserId) => {
    console.log("Fetching user for ID:", privyUserId);
    setIsLoading(true);
    try {
      const result = await db.select().from(Users).where(eq(Users.createdBy, privyUserId)).execute();
      console.log("Fetch result:", result);
      if (result.length > 0) {
        setUser(result[0]);
      } else {
        // If no user found, create a default user
        const defaultUser = {
          username: `User-${privyUserId.slice(-6)}`,
          createdBy: privyUserId,
        };
        const newUser = await db.insert(Users).values(defaultUser).returning().execute();
        setUser(newUser[0]);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (privyUserId, profileData) => {
    console.log("Updating user:", privyUserId, profileData);
    try {
      const result = await db
        .update(Users)
        .set(profileData)
        .where(eq(Users.createdBy, privyUserId))
        .returning()
        .execute();
      console.log("Update result:", result);
      if (result.length > 0) {
        setUser(result[0]);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }, []);

  useEffect(() => {
    if (privyUser?.id) {
      fetchUser(privyUser.id);
    } else {
      setIsLoading(false);
    }
  }, [privyUser, fetchUser]);

  console.log("Current user in context:", user);

  return (
    <StateContext.Provider value={{ user, isLoading, updateUser, fetchUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
