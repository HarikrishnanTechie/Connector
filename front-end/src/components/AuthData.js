import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

const TextboxForm = () => {
  // Sample JSON data
  const jsonData = [
    { id: 1, label: "Token", placeholder: "Enter Token" },
  ];

  // State to store form values
  const [formData, setFormData] = useState(
    jsonData.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  // Handle input change
  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
   <Box>
      {jsonData.map(({ id, label, placeholder }) => (
        <Box key={id} style={{ marginTop: "10px" }}>
          
          <TextField id={`textbox-${id}`} label={placeholder} variant="outlined" name="baseUrl" size="small" value={formData[id]} onChange={(e) => handleChange(id, e.target.value)} fullWidth/>
          {/* <input
            id={`textbox-${id}`}
            type="text"
            placeholder={placeholder}
            value={formData[id]}
            onChange={(e) => handleChange(id, e.target.value)}
            style={{
              padding: "5px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          /> */}
        </Box>
      ))}
    </Box>
  );
};

export default TextboxForm;
