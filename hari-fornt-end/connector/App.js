import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [baseUrl, setBaseUrl] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [httpMethod, setHttpMethod] = useState("GET");
  const [authMethod, setAuthMethod] = useState("no_auth");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [view, setView] = useState("response"); // Default view is 'response'
  const [connectorName, setConnectorName] = useState(""); // New state for the Connector name

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = baseUrl;
    if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
      url = endpoint;
    } else if (endpoint) {
      url = `${baseUrl}${endpoint}`;
    }

    let inputJSON = {
      authentication: {},
      request: {
        httpMethod: httpMethod,
        url: url,
      },
      connector_name: connectorName, // Add the connector name to the inputJSON
    };

    if (authMethod === "basic") {
      inputJSON.authentication = {
        auth_type: "Basic",
        username: username,
        password: password,
      };
    } else if (authMethod === "bearer") {
      inputJSON.authentication = {
        auth_type: "Bearer",
        token: token,
      };
    } else if (authMethod === "oauth") {
      inputJSON.authentication = {
        auth_type: "OAuth",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      };
    }
    console.log(inputJSON)

    try {
      const response = await axios.post(`http://127.0.0.1:5001/make_request`, inputJSON);
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseData({ error: error.message });
    }
  };

  const toggleView = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="container">
      <h1 className="title">Fetch API Data</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Connector Name:</label> {/* New input for Connector Name */}
          <select
            value={connectorName}
            onChange={(e) => setConnectorName(e.target.value)}
            required
          >
            <option value="">Select Connector</option>
            <option value="SharePoint">SharePoint</option>
            <option value="GoogleDrive">Google Drive</option>
            <option value="Dropbox">Dropbox</option>
          </select>
        </div>
        <div className="input-group">
          <label>Base URL:</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="e.g., https://example.com"
            required
          />
        </div>
        <div className="input-group">
          <label>Endpoint (optional):</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="e.g., /fetch-data or https://api.example.com"
          />
        </div>
        <div className="input-group">
          <label>HTTP Method:</label>
          <select value={httpMethod} onChange={(e) => setHttpMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="input-group">
          <label>Authentication Method:</label>
          <select value={authMethod} onChange={(e) => setAuthMethod(e.target.value)}>
            <option value="no_auth">No Authentication</option>
            <option value="basic">Basic Authentication</option>
            <option value="bearer">Bearer Token</option>
            <option value="oauth">OAuth</option>
          </select>
        </div>
        {authMethod === "basic" && (
          <>
            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {authMethod === "bearer" && (
          <div className="input-group">
            <label>Bearer Token:</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
        )}
        {authMethod === "oauth" && (
          <>
            <div className="input-group">
              <label>Client ID:</label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Client Secret:</label>
              <input
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Refresh Token:</label>
              <input
                type="text"
                value={refreshToken}
                onChange={(e) => setRefreshToken(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="submit-button">Fetch Data</button>
      </form>

      <div className="view-toggle">
        <button onClick={() => toggleView("response")}>Response</button>
        <button onClick={() => toggleView("schema")}>Schema</button>
        <button onClick={() => toggleView("source_code")}>Source Code</button> {/* New button to show source code */}
      </div>

      <div className="response-section">
        {view === "response" && (
          <>
            <h2>Response</h2>
            <div className="response-box">
              {responseData ? (
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
              ) : (
                <p>No data fetched yet</p> // Default empty box
              )}
            </div>
          </>
        )}
        {view === "schema" && (
          <>
            <h2>Schema</h2>
            <div className="response-box">
              {responseData && responseData.schema ? (
                <pre>{JSON.stringify(responseData.schema, null, 2)}</pre>
              ) : (
                <p>No schema data available</p>
              )}
            </div>
          </>
        )}
        {view === "source_code" && (
          <>
            <h2>Source Code</h2>
            <div className="response-box">
              <pre>{`<Source code display here>`}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
