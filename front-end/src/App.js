import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import AccordionUsage from "./components/Accordion";
import ResponseStructure from "./components/ResponseStructure";


const mockJsonResponse = {
  folders: [
    { id: "folder1", name: "Folder One" },
    { id: "folder2", name: "Folder Two" },
    { id: "file1", name: "File One" },
    { id: "file2", name: "File Two" },
  ]
};

const HttpRequestForm = () => {
  const [formValues, setFormValues] = useState({
    baseUrl: "",
    endpointUrl: "",
    httpMethod: "GET",
    authMethod: "None",
  });

  const [data, setData] = useState(null);
  const [folderID, setFolderID] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [queryString, setQueryString] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formValues);
  };
  const [value, setValue] = React.useState('one');
  const [nextEndpoint, setNextEndpoint] = React.useState(false);
  const [primaryKey, setPrimaryKey] = React.useState('');

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFolderChange = (type) => {
    if(type === 'folder'){
      if(folderID){
        setFormValues((prevValues) => ({
          ...prevValues,
          endpointUrl: `${formValues.endpointUrl}/folders/${folderID}`,
        }));
      }
    } else {
      if(folderID){
        setFormValues((prevValues) => ({
          ...prevValues,
          endpointUrl: `${formValues.endpointUrl}/file/${folderID}`,
        }));
      }
    }
    setFolderID('');
  };

  const handleFetchDetails = () => {
    setExpanded('');
    setShowResponse(true);
  }

  useEffect(() => {
    const { baseUrl, endpointUrl } = formValues;
    if (baseUrl && endpointUrl) {
      setData(mockJsonResponse); 
    } else {
      setData(null);
    }
  }, [formValues.baseUrl, formValues.endpointUrl, formValues]);

  const [expanded, setExpanded] = React.useState('panel1');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if(queryString){
      setFormValues((prevValues) => ({
        ...prevValues,
        endpointUrl: `${formValues.endpointUrl}?${queryString}`,
      }));
    }
  }, [queryString])

  return (
    <>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <TextField
        label="Base URL"
        variant="outlined"
        name="baseUrl"
        value={formValues.baseUrl}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Endpoint URL"
        variant="outlined"
        name="endpointUrl"
        value={formValues.endpointUrl}
        onChange={handleChange}
        fullWidth
      />
      {nextEndpoint && <TextField
        label="Primary Key"
        variant="outlined"
        name="primaryKey"
        value={primaryKey}
        onChange={(e) => setPrimaryKey(e.target.value)}
        fullWidth
      />}
      <AccordionUsage folderID={folderID} 
        setFolderID ={setFolderID} 
        handleFolderChange={handleFolderChange} 
        formValues={formValues} 
        handleChange={handleChange} 
        handleTabsChange={handleTabsChange} 
        value={value}
        handleAccordionChange={handleAccordionChange}
        expanded={expanded}
        setExpanded={setExpanded}
        setQueryString={setQueryString}/>
     
     <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between'}}>
      <Button type="submit" variant="contained" color="primary" onClick={handleFetchDetails}>
        Fetch Data
      </Button>
      {showResponse && <Button type="submit" variant="contained" color="primary" onClick={() => setNextEndpoint(true)}>
        Add Next Endpoint
      </Button>}
      </div>
    </Box>
    {showResponse && <ResponseStructure primaryKey={primaryKey}/>}
    </>
  );
};

export default HttpRequestForm;
