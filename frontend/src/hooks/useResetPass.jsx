import { useState } from "react";
import { URL } from "../App";

export const useResetPass = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetPass = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${URL}/api/user/forgotpassword/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error || "Failed to send reset email.");
      }
      setIsLoading(false);
      return response.ok;
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Network error.");
      return false;
    }
  };

  return { resetPass, error, isLoading };
};