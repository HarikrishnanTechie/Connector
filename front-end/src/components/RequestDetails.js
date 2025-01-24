import React from "react";
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
import TextboxForm from "./AuthData";
import AutoAddRowTable from "./AutoAddRowTable";
import AdditionalDetails from "./AdditionalDetails";

const RequestDetails = ({formValues, handleChange, handleTabsChange, value, expanded, setExpanded , handleAccordionChange, setQueryString, setHeaders, disabled}) => {
  return (
    <div>       
      <FormControl fullWidth>
        <InputLabel>HTTP Method</InputLabel>
        <Select
          name="httpMethod"
          value={formValues.httpMethod}
          onChange={handleChange}
          size="small"
          label="HTTP Method"
        >
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
          <MenuItem value="PUT">PUT</MenuItem>
          <MenuItem value="DELETE">DELETE</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth style={{marginTop: '20px'}} disabled={disabled}>
        <InputLabel>Authentication Method</InputLabel>
        <Select
          name="authentication"
          value={formValues.authentication}
          onChange={handleChange}
          label="Authentication Method"
          size="small"
        >
          <MenuItem value="None">No Auth</MenuItem>
          <MenuItem value="Bearer">Bearer</MenuItem>
        </Select>
        {formValues.authentication === "Bearer" && <TextboxForm handleChange={handleChange} formValues={formValues}/>}
        <p>Additional Details</p>
      <AdditionalDetails setQueryString={setQueryString} setHeaders={setHeaders}/>
      </FormControl></div>
  )
}

export default RequestDetails