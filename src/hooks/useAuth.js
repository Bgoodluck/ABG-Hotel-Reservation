import { useState, useEffect, useCallback } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/user/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user information");
      }

      if (data.success) {
        setUser(data.user);
      } else {
        throw new Error(data.message || "User fetch was not successful");
      }
    } catch (error) {
      console.error("Error fetching user information", error);
      setError(error.message);
      localStorage.removeItem("auth-token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  console.log(user);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("auth-token");
    setUser(null);
    setError(null);
  }, []);

  return { user, error, loading, logout, fetchUser };
};

export default useAuth;