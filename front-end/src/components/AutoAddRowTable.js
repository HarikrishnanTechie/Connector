import React, { useState } from "react";
import { getQueryString } from "../utils";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

const AutoAddRowTable = ({type, setHeadersOrParams}) => {
  // Initial table data
  const [rows, setRows] = useState([{ key: "", value: "" }]);

  // Handle change in key or value
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    setHeadersOrParams(getQueryString(updatedRows, type))
    
    // Check if the last row has data and add a new row
    if (index === rows.length - 1 && (updatedRows[index].key || updatedRows[index].value)) {
      addRow();
    }
  };
  // Add a new row
  const addRow = () => {
    setRows((prevRows) => [...prevRows, { key: "", value: "" }]);
  };

  // Remove a row
  const removeRow = (index) => {
    if(index === 0) {
      setRows([{ key: "", value: "" }]);
      return;
    }
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    setHeadersOrParams(getQueryString(updatedRows, type))
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const nonEmptyRows = rows.filter((row) => row.key || row.value); // Filter out empty rows
    console.log("Table Data:", nonEmptyRows);
  };


  return (
    <TableContainer component={Paper} style={{ borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Table>
        <TableHead style={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>Key</TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>Value</TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "16px", color: "#333", textAlign: "center" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9", // Zebra striping
              }}
            >
              <TableCell style={{ padding: "10px 10px", fontSize: "12px" }}>
                <TextField size="small" onChange={(e) => handleChange(index, "key", e.target.value)}/>
              </TableCell>
              <TableCell style={{ padding: "10px 10px", fontSize: "12px" }}>
                <TextField size="small" onChange={(e) => handleChange(index, "value", e.target.value)}/>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
               
                {rows.length > 1 && <IconButton size="small" style={{ color: "#d32f2f", marginLeft: "8px" }} onClick={() => removeRow(index)}>
                  <Delete />
                </IconButton> }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
      // <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      //   <thead>
      //     <tr>
      //       <th style={{ padding: "10px" }}>Key</th>
      //       <th style={{ padding: "10px" }}>Value</th>
      //       <th style={{ padding: "10px" }}>Actions</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {rows.map((row, index) => (
      //       <tr key={index}>
      //         <td>
      //           <input
      //             type="text"
      //             placeholder="Key"
      //             value={row.key}
      //             onChange={(e) => handleChange(index, "key", e.target.value)}
      //             style={{ width: '95%', padding: "5px"  }}
      //           />
      //         </td>
      //         <td>
      //           <input
      //             type="text"
      //             placeholder="Value"
      //             value={row.value}
      //             onChange={(e) => handleChange(index, "value", e.target.value)}
      //             style={{ width: "95%", padding: "5px" }}
      //           />
      //         </td>
      //         <td>
      //           {rows.length > 1 && (
      //             <button
      //               type="button"
      //               onClick={() => removeRow(index)}
      //               style={{
      //                 padding: "5px 10px",
      //                 background: "#ff4d4d",
      //                 color: "#fff",
      //                 border: "none",
      //                 borderRadius: "3px",
      //                 cursor: "pointer",
      //               }}
      //             >
      //               Delete
      //             </button>
      //           )}
      //         </td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
 
  );
};

export default AutoAddRowTable;
