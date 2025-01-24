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

const TextboxForm = ({handleChange, formValues}) => {
  // Sample JSON data
  const jsonData = [
    { id: 1, label: "Token", placeholder: "Enter Token" },
  ];

  // State to store form values
  const [formData, setFormData] = useState(
    jsonData.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  // Handle input change
  // const handleChange = (id, value) => {
  //   setFormData((prev) => ({ ...prev, [id]: value }));
  // };

  return (
   <Box>
      {jsonData.map(({ id, label, placeholder }) => (
        <Box key={id} style={{ marginTop: "10px" }}>
          <TextField label={placeholder} variant="outlined" name="token" size="small" value={formValues.token} onChange={handleChange} fullWidth/>
        </Box>
      ))}
    </Box>
  );
};

export default TextboxForm;
