import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField, Tabs, Tab, Box, Paper } from '@mui/material';
import AutoAddRowTable from './AutoAddRowTable';

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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
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

function AdditionalDetails({setQueryString, setHeaders}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Headers" {...a11yProps(1)} />
          <Tab label="Body" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AutoAddRowTable type="Params" setHeadersOrParams={setQueryString}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <AutoAddRowTable type="Headers" setHeadersOrParams={setHeaders}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <TextField
          id="outlined-multiline-static"
          label="Body"
          multiline
          rows={4}
          defaultValue=""
          fullWidth
        />
      </CustomTabPanel>
    </Box>
  );
}

export default AdditionalDetails;