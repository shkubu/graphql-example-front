import axios from "axios";

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

class ApiWrapper {
  client;
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Methods":
          "POST, PUT, DELETE, GET, PATCH, OPTIONS",
      },
    });
  }

  GET(url, config) {
    return this.client.get(url, config);
  }

  POST(url, data, config) {
    return this.client.post(url, data, config);
  }

  PUT(url, data, config) {
    return this.client.put(url, data, config);
  }

  PATCH(url, data, config) {
    return this.client.patch(url, data, config);
  }

  DELETE(url, config) {
    return this.client.delete(url, config);
  }
}

class Api {
  req = new ApiWrapper();
  accessToken = "";
  refreshToken = "";
  exp = 0;

  constructor() {
    this.accessToken = localStorage.getItem("access_token") || "";
    this.refreshToken = localStorage.getItem("refresh_token") || "";
    if (this.accessToken) {
      this.setAccessToken(this.accessToken);
    }
    if (this.refreshToken) {
      this.setRefreshToken(this.refreshToken);
    }
  }

  graphQl(schema) {
    this.req.POST("graphql", schema);
  }

  setAccessToken = (token) => {
    this.accessToken = token;
    localStorage.setItem("access_token", token);
    this.req.client.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
    this.exp = parseJwt(token);
  };

  setRefreshToken = (token) => {
    this.refreshToken = token;
    localStorage.setItem("refresh_token", token);
  };
}

export const API = new Api();
