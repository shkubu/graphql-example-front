import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { onLogin } from "../ApolloProvider";

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      loginCount
    }
  }
`;

export const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    update: (_, res) => {
      const { accessToken, refreshToken, loginCount } = res.data.login;
      onLogin(accessToken, refreshToken, loginCount);
      navigate("/home");
    },
    onError: (err) => console.log(err),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      variables: {
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
      <h2>Login</h2>
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
        Login
      </button>
      <Link to={"/signup"}>Sign up</Link>
    </form>
  );
};
