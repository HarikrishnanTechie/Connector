import React, {useState, useEffect} from 'react';
import { TextField, Button, Box } from "@mui/material";
import AccordionUsage from "./Accordion";
import axios from 'axios';

const mockJsonResponse = [
    {"id" : "123", "name": "abc"},
    {"id" : "456","name": "def"},
    {"id" : "789","name": "xyz"}
]

const mockSchema = {
    "id" : "ID",
    "name": "NAME"
}

const RequestScreen = ({data, setData}) => {
    const [formValues, setFormValues] = useState({ baseUrl: "", endpointUrl: "", httpMethod: "GET", authentication: "None", data: {}});
    const [expanded, setExpanded] = React.useState('panel1');
    const [value, setValue] = React.useState('one');
    const [queryString, setQueryString] = useState('');
    const [headers, setHeaders] = useState([{ key: "", value: "" }]);
    const [fields, setFields] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value}));
    };

    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFetchDetails = (e) => {
       e.preventDefault();
       let query = fields.map(field => `${field.value}`).join('/');

       const fetchRequest = {
        "authentication" : formValues.authentication === "None" 
        ? {} 
        : { 
            auth_type: formValues.authentication, 
            token: formValues.token 
        },
        "request" : {
            "method" : formValues.httpMethod,
            "url" : formValues.baseUrl + formValues.endpointUrl,
            "headers" : headers,
        },
        ...(formValues.httpMethod === "POST" || formValues.httpMethod === "PUT" 
            ? { data: formValues.data } 
        : {})
       }


       axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res)
      })

       console.log(fetchRequest)
       setData(mockJsonResponse)
    }
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addTextFields = (e) => {
        e.preventDefault();
        setFields([...fields, { id: Date.now(), key: "", value: "" }]);
    };

    console.log(fields)

    const handleInputChange = (fieldId, fieldName, newValue) => {
        setFields(fields.map(field =>
          field.id === fieldId ? { ...field, [fieldName]: newValue } : field
        ));
    };

    useEffect(() => {
        if(queryString){
        formValues.endpointUrl.split('?')
          setFormValues((prevValues) => ({
            ...prevValues,
            endpointUrl: `${queryString.length > 1 ? formValues.endpointUrl.split('?')[0] : formValues.endpointUrl}?${queryString}`,
          }));
        }
    }, [queryString])

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor:'white'}}>
        Request Screen
        <TextField label="Base URL" variant="outlined" name="baseUrl" size="small" value={formValues.baseUrl} onChange={handleChange} fullWidth required/>
        <TextField label="Endpoint URL" variant="outlined" name="endpointUrl" size="small" value={formValues.endpointUrl} onChange={handleChange} fullWidth />
        {fields.length > 0 && <p style={{margin: 0, padding: 0}}>Additional Endpoints</p>}
        {fields.map((field) => (
        <Box key={field.id} sx={{display: "flex", alignItems: "center", gap: 1, mb: 0,}}>
          <TextField label="Value" variant="outlined" value={field.value} onChange={(e) => handleInputChange(field.id, "value", e.target.value)} sx={{ flex: 1 }} size='small' />
        </Box>
      ))}
        <AccordionUsage formValues={formValues} handleChange={handleChange} handleTabsChange={handleTabsChange} value={value} handleAccordionChange={handleAccordionChange}
        expanded={expanded} setExpanded={setExpanded} setQueryString={setQueryString} setHeaders={setHeaders} disabled={data.length}/>
        <Button type="submit" variant="contained" color="primary" size="small" onClick={handleFetchDetails}>Fetch Data</Button>
        {data.length > 0 && <Button type="submit" variant="contained" color="primary" size="small" onClick={addTextFields}>Add New Endpoints</Button>}
        </Box>
  )
}

export default RequestScreen;