import React, { useState } from "react";
import { TextField, Box} from "@mui/material";

const TextboxForm = ({handleChange, formValues, disabled}) => {
  // Sample JSON data
  const jsonData = [
    { id: 1, label: "Token", placeholder: "Enter Token" },
  ];

  // State to store form values
  const [formData, setFormData] = useState(
    jsonData.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  return (
   <Box>
      {jsonData.map(({ id, label, placeholder }) => (
        <Box key={id} style={{ marginTop: "10px" }}>
          <TextField label={placeholder} variant="outlined" name="token" size="small" value={formValues.token} onChange={handleChange} fullWidth disabled={disabled}/>
        </Box>
      ))}
    </Box>
  );
};

export default TextboxForm;
