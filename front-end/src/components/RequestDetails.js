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

const RequestDetails = ({folderID, setFolderID, handleFolderChange, formValues, handleChange, handleTabsChange, value, expanded, setExpanded , handleAccordionChange, setQueryString}) => {
  return (
    <div> 
        {/* {formValues.endpointUrl && <><p>Folder/File Details</p>
        <TextField
        label="Folder/File"
        variant="outlined"
        name="folder/file"
        value={folderID}
        onChange={(e) => setFolderID(e.target.value)}
        fullWidth
      />
      <div style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>
      <Button onClick={() => handleFolderChange('folder')}>Add Folder</Button>
      <Button onClick={() => handleFolderChange('file')}>Add File</Button>
      </div></>} */}
      
      <FormControl fullWidth>
        <InputLabel>HTTP Method</InputLabel>
        <Select
          name="httpMethod"
          value={formValues.httpMethod}
          onChange={handleChange}
          label="HTTP Method"
        >
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
          <MenuItem value="PUT">PUT</MenuItem>
          <MenuItem value="DELETE">DELETE</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth style={{marginTop: '20px'}}>
        <InputLabel>Authentication Method</InputLabel>
        <Select
          name="authMethod"
          value={formValues.authMethod}
          onChange={handleChange}
          label="Authentication Method"
        >
          <MenuItem value="None">No Auth</MenuItem>
          <MenuItem value="Bearer">Bearer</MenuItem>
        </Select>
        {formValues.authMethod === "Bearer" && <TextboxForm />}
        <p>Additional Details</p>
      <AdditionalDetails setQueryString={setQueryString}/>
      </FormControl></div>
  )
}

export default RequestDetails