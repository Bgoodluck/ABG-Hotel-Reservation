import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
  accessToken: null
};

function reducer(state, action) {
  switch (action.type) {
    case "setToken":
      return { ...state, accessToken: action.payload };
    case "logout":
      return { ...state, accessToken: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children, defaultState = initialState }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      dispatch({ type: "setToken", payload: token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};