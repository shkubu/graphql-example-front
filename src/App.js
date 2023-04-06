import "./App.css";
import { PageRoutes } from "./pages";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./ApolloProvider";

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <PageRoutes />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
