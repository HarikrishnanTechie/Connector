import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ResponseTable from './ResponseTable';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

function ResponseStructure({primaryKey}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const code = `
  function greet(name) {
    const message = \`Hello, \${name}!\`;
    console.log(message);
    return message;
  }
  
  greet("World");
  `;

  const schema = `{
  "baseUrl": "https://api.example.com/v1",
  "request": {
    "method": "GET",
    "endpoint": "/resource",
    "headers": {
      "Authorization": "Bearer <token>",
      "Content-Type": "application/json"
    },
    "queryParams": {
      "key1": "value1",
      "key2": "value2"
    },
    "body": {
      "attribute1": "value1",
      "attribute2": "value2"
    }
  }
}`

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Response" {...a11yProps(0)} />
          <Tab label="Schema" {...a11yProps(1)} />
          <Tab label="Source Code" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <ResponseTable />
       <div style={{marginTop: '20px'}}>{primaryKey && <ResponseTable />}</div>
       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <pre>{schema}</pre>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
      <code>{code}</code>
</pre>
      </CustomTabPanel>
    </Box>
  );
}

export default ResponseStructure;