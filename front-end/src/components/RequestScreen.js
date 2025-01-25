import React, {useState, useEffect} from 'react';
import { TextField, Button, Box } from "@mui/material";
import AccordionUsage from "./Accordion";
import axios from 'axios';
import SimpleBackdrop from './SimpleBackdrop';

const RequestScreen = ({data, setData}) => {
    const [formValues, setFormValues] = useState({ baseUrl: "", endpointUrl: "", httpMethod: "GET", authentication: "None", token: "", data: {}});
    const [expanded, setExpanded] = React.useState('panel1');
    const [value, setValue] = React.useState('one');
    const [queryString, setQueryString] = useState('');
    const [headers, setHeaders] = useState([{ key: "", value: "" }]);
    const [fields, setFields] = useState([]);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    const baseUrlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/)?$/;

    const handleChange = (e) => {

        const { name, value } = e.target;
        // Validate the URL
        if(name === 'baseUrl'){
          if(formValues.baseUrl === ''){
            setError(false);
            setHelperText("");
          }
          if (!baseUrlRegex.test(formValues.baseUrl)) {
            setError(true);
            setHelperText("Please enter a valid base URL (e.g., https://example.com/)");
          } else {
          setError(false);
          setHelperText(""); // Clear the error if valid
          }
        }
        setFormValues((prevValues) => ({ ...prevValues, [name]: value}));
    };

    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFetchDetails = async(e, type) => {
       e.preventDefault();
       handleOpen()
       const fetchRequest = {
        authentication : formValues.authentication === "None" 
        ? {} 
        : { 
            auth_type: formValues.authentication, 
            token: formValues.token 
        },
        request : {
            httpMethod : formValues.httpMethod,
            url : formValues.baseUrl,
            type: type,
            endpoint1Url: formValues.endpointUrl,
            endpoint2Url: fields[0]?.additional,
            additionalEndpointValue: fields[0]?.value,
        },
        ...(formValues.httpMethod === "POST" || formValues.httpMethod === "PUT" 
            ? { data: formValues.data } 
        : {})
       }

      setData()
      console.log('Fetch', fetchRequest)

      // const response = await axios.post(`http://127.0.0.1:5001/make_request`, fetchRequest)
      // setData(response.data)
      // if(mockResponse.response){
      //   handleClose()
      // }

      try{
        const response = await axios.post(`http://127.0.0.1:5001/make_request`, fetchRequest)
        setData(response.data)
      }catch(err){
        setData({response: 'Bad response received', schema: '', generated_code: '' })
      }finally{
        handleClose()
      }

    }

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addTextFields = (e) => {
        e.preventDefault();
        setFields([...fields, { id: Date.now(), key: "", value: "" }]);
    };

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
        <TextField label="Base URL" variant="outlined" name="baseUrl" size="small" value={formValues.baseUrl} onChange={handleChange} fullWidth required 
          error={error}
          helperText={helperText}/>
        <TextField label="Endpoint URL" variant="outlined" name="endpointUrl" size="small" value={formValues.endpointUrl} onChange={handleChange} fullWidth />
        {fields.length > 0 && <p style={{margin: 0, padding: 0}}>Additional Endpoints</p>}
        {fields.map((field) => (
        <Box key={field.id} sx={{display: "flex", alignItems: "center", gap: 1, mb: 0,}}>
          <TextField label="Endpoint" variant="outlined" value={field.additional} onChange={(e) => handleInputChange(field.id, "additional", e.target.value)} sx={{ flex: 1 }} size='small' />
          <TextField label="Value" variant="outlined" value={field.value} onChange={(e) => handleInputChange(field.id, "value", e.target.value)} sx={{ flex: 1 }} size='small' />
        </Box>
      ))}
        <SimpleBackdrop open={open}/>
        <AccordionUsage formValues={formValues} handleChange={handleChange} handleTabsChange={handleTabsChange} value={value} handleAccordionChange={handleAccordionChange}
        expanded={expanded} setExpanded={setExpanded} setQueryString={setQueryString} setHeaders={setHeaders} disabled={data?.response}/>
        <Button type="submit" variant="contained" color="primary" size="small" onClick={(e) => handleFetchDetails(e, 'GenAI')}>Fetch Data using GenAI</Button>
        <Button type="submit" variant="contained" color="primary" size="small" onClick={(e) => handleFetchDetails(e, 'Jinga')}>Fetch Data using Jinja2 Template</Button>
        {data && data?.response && <Button type="submit" variant="contained" color="primary" size="small" onClick={addTextFields}>Add New Endpoints</Button>}
        </Box>
  )
}

export default RequestScreen;