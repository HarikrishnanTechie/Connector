import React, { useState } from "react";

const TextboxForm = () => {
  // Sample JSON data
  const jsonData = [
    { id: 1, label: "Token", placeholder: "Enter Token" },
    // { id: 2, label: "Client Secret", placeholder: "Enter Client Secret" },
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
   <>
      {jsonData.map(({ id, label, placeholder }) => (
        <div key={id} style={{ marginBottom: "10px" }}>
          <label htmlFor={`textbox-${id}`} style={{ display: "block" }}>
            {label}
          </label>
          <input
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
          />
        </div>
      ))}
    </>
  );
};

export default TextboxForm;
