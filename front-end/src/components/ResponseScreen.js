import React from 'react';
import {Box, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types';
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

const ResponseScreen = ({data}) => {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor:'white'}}>
        Response Screen
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Response" {...a11yProps(0)} />
          <Tab label="Schema" {...a11yProps(1)} />
          <Tab label="Source Code" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <ResponseTable data={data?.response?.data}/>
       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}> 
          {data?.response?.data?.length > 0 && <pre>{JSON.stringify(data?.schema, null, 2)}</pre>}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      {data && data?.response?.data.length > 0 && <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
      <code>{data?.generated_code}</code>
</pre>}
      </CustomTabPanel>
    </Box>
  )
}

export default ResponseScreen