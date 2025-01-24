import {React, useState} from 'react';
import { Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import JsonSyntaxHighlighter from './JsonSyntaxHighlighter';

function ResponseTable({data}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
    });
  };

  return (
  <>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2px' }}>
        <Tooltip title={copySuccess ? "Copied!" : "Copy to clipboard"}>
          <IconButton size='small' onClick={handleCopy}>
            <ContentCopyIcon fontSize="small"/>
          </IconButton>
        </Tooltip>
        </div>
    
        {/* <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{JSON.stringify(data, null, 2)}</pre> */}
        <JsonSyntaxHighlighter data={data} />
    </>
  );
}

export default ResponseTable;