import React, {useState} from 'react';
import {Box, Tabs, Tab, Tooltip, IconButton } from "@mui/material";
import PropTypes from 'prop-types';
import ResponseTable from './ResponseTable';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import JsonSyntaxHighlighter from './JsonSyntaxHighlighter';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const ResponseScreen = ({data}) => {
  const [value, setValue] = useState(0);
  const [copySchemaSuccess, setCopySchemaSuccess] = useState(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCopy = (text, setMethod) => {
    navigator.clipboard.writeText(text).then(() => {
      setMethod(true)
      setTimeout(() => setMethod(false), 2000); // Reset success message after 2 seconds
    });
  };

  const temp = data?.response?.data?.length > 0 ? data?.response?.data : data?.response;

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor:'white'}}>
        Response Screen
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{
          style: {
            backgroundColor: "#1976d2", // Highlight the active tab with blue underline
            height: "3px",
          },
        }}>
          <Tab label="Response" {...a11yProps(0)} />
          <Tab label="Schema" {...a11yProps(1)} />
          <Tab label="Source Code" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} style={
    data && data.response
      ? { border: 'solid 0.5px #00000033', borderRadius: '4px' }
      : undefined
  }>
       {data && data.response && <ResponseTable data={temp}/>}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}  style={
    data && data.response
      ? { border: 'solid 0.5px #00000033', borderRadius: '4px' }
      : undefined}>
        {data && data.response && <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4px' }}>
        <Tooltip title={copySchemaSuccess ? "Copied!" : "Copy to clipboard"}>
          <IconButton size='small' onClick={() => handleCopy(JSON.stringify(data?.schema), setCopySchemaSuccess)}>
            <ContentCopyIcon fontSize="small"/>
          </IconButton>
        </Tooltip>
        </div>}
        {data && data.response && 
          <JsonSyntaxHighlighter data={data?.schema} />
        // <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        //   {JSON.stringify(data?.schema, null, 2)}
        // </pre>
        }
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
      
      {data && data.response && <pre style={{ 
        backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px", whiteSpace: 'pre-wrap', wordWrap: 'break-word',
        
          backgroundColor: '#2d2d2d', // Dark background
          color: '#f8f8f2', // Light text color
          padding: '12px',
          borderRadius: '8px',
          overflowX: 'auto', // Horizontal scroll for long lines
          fontFamily: '"Fira Code", monospace', // Code editor-like font
          fontSize: '14px',
          lineHeight: '1.5',
      
        }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
        <Tooltip title={copyCodeSuccess ? "Copied!" : "Copy to clipboard"}>
          <IconButton size='small' onClick={() => handleCopy(data?.generated_code, setCopyCodeSuccess)}>
            <ContentCopyIcon fontSize="small" style={{ color: 'grey' }}/>
          </IconButton>
        </Tooltip>
        </div>
      <code>{data?.generated_code}</code>
      </pre>}
      </CustomTabPanel>
    </Box>
  )
}

export default ResponseScreen