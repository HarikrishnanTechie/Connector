import React, { useState } from "react";
import { getQueryString } from "../utils";

const AutoAddRowTable = ({setQueryString}) => {
  // Initial table data
  const [rows, setRows] = useState([{ key: "", value: "" }]);

  // Handle change in key or value
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    setQueryString(getQueryString(updatedRows));
    // Check if the last row has data and add a new row
    if (index === rows.length - 1 && (updatedRows[index].key || updatedRows[index].value)) {
      addRow();
    }
  };

  console.log(rows)
  // Add a new row
  const addRow = () => {
    setRows((prevRows) => [...prevRows, { key: "", value: "" }]);
  };

  // Remove a row
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const nonEmptyRows = rows.filter((row) => row.key || row.value); // Filter out empty rows
    console.log("Table Data:", nonEmptyRows);
  };

  return (
    
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>Key</th>
            <th style={{ padding: "10px" }}>Value</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Key"
                  value={row.key}
                  onChange={(e) => handleChange(index, "key", e.target.value)}
                  style={{ width: '95%', padding: "5px"  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) => handleChange(index, "value", e.target.value)}
                  style={{ width: "95%", padding: "5px" }}
                />
              </td>
              <td>
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    style={{
                      padding: "5px 10px",
                      background: "#ff4d4d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
  );
};

export default AutoAddRowTable;
