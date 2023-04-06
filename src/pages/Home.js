import { gql, useQuery, useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const USERS_COUNT_SUBSCRIPTION = gql`
  subscription Subscription {
    usersCount
  }
`;

const INITIAL_USERS_COUNT = gql`
  query Query {
    usersCount
  }
`;
export const Home = () => {
  const navigate = useNavigate();

  const [usersCount, setUsersCount] = useState(0);
  const [loginCount, setLoginCount] = useState(0);

  const { loading } = useQuery(INITIAL_USERS_COUNT, {
    fetchPolicy: "network-only",
    onCompleted: (data) => setUsersCount(data.usersCount),
  });

  const { data } = useSubscription(USERS_COUNT_SUBSCRIPTION);

  useEffect(() => {
    console.log(data);
    if (!!data) {
      setUsersCount(data.usersCount);
    }
  }, [data]);

  useEffect(() => {
    if (usersCount === 3) {
      alert("You are lucky person");
    }
  }, [usersCount]);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const count = +localStorage.loginCount;
    setLoginCount(count);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 100,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Home</h1>
      {loginCount === 1 && <h3>Welcome To you</h3>}
      <h3>
        It’s your <span style={{ color: "green" }}>{loginCount}</span>th login
      </h3>
      {usersCount > 0 && (
        <h3>
          Total users count is{" "}
          <span style={{ color: "blue" }}>{usersCount}</span>
        </h3>
      )}
      <button
        onClick={logOut}
        style={{ position: "fixed", top: 10, right: 10 }}
      >
        Log out
      </button>
    </div>
  );
};
