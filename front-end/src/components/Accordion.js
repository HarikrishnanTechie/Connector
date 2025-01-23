import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RequestDetails from './RequestDetails';

export default function AccordionUsage({folderID, setFolderID, handleFolderChange, formValues, handleChange, handleTabsChange, value, expanded, setExpanded , handleAccordionChange, setQueryString}) {
    
  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Request Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RequestDetails folderID={folderID} setFolderID={setFolderID} handleFolderChange={handleFolderChange} formValues={formValues} handleChange={handleChange} handleTabsChange={handleTabsChange} value={value} handleAccordionChange={handleAccordionChange}
        expanded={expanded}
        setExpanded={setExpanded}
        setQueryString={setQueryString}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
