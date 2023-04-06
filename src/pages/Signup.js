import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { gql, useMutation } from "@apollo/client";
import { LOGIN } from "./Login";
import { onLogin } from "../ApolloProvider";

const SIGN_UP = gql`
  mutation Mutation($userName: String!, $password: String!, $email: String!) {
    registerUser(userName: $userName, password: $password, email: $email) {
      email
    }
  }
`;

export const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [login] = useMutation(LOGIN, {
    update: (_, res) => {
      const { accessToken, refreshToken, loginCount } = res.data.login;
      onLogin(accessToken, refreshToken, loginCount);
      navigate("/home");
    },
    onError: (err) => console.log(err),
  });

  const [registerUser] = useMutation(SIGN_UP, {
    update: (_, res) =>
      login({
        variables: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      }),
    onError: (err) => console.log(err),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser({
      variables: {
        userName: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <h2>Sign up</h2>
      <div
        style={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <label htmlFor="username" style={{ marginBottom: 10 }}>
          Username
        </label>
        <input
          ref={usernameRef}
          type="text"
          id="username"
          style={{ height: 30 }}
        />
      </div>
      <div
        style={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <label htmlFor="email" style={{ marginBottom: 10 }}>
          Email
        </label>
        <input ref={emailRef} type="text" id="email" style={{ height: 30 }} />
      </div>
      <div
        style={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <label htmlFor="password" style={{ marginBottom: 10 }}>
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          style={{ height: 30 }}
        />
      </div>
      <button
        type="submit"
        style={{ marginTop: 20, height: 30, width: 300, marginBottom: 10 }}
      >
        Sign up
      </button>
      <Link to={"/login"}>Login</Link>
    </form>
  );
};
