import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import RequestScreen from './components/RequestScreen';
import ResponseScreen from './components/ResponseScreen';
import header from './assets/header.png';

const AppNew = () => {
    const [data, setData] = useState();
  return (
    <>
    <img src={header} alt='header' style={{width:'100%', height: '200px'}}/>
    <div style={{display:'flex', padding: '20px', gap: '20px',backgroundColor:'black'}}>
        
        <RequestScreen data={data} setData={setData}/>
        <Divider orientation="vertical" variant="middle"/>
        <ResponseScreen data={data}/>
    </div>
    </>
  )
}

export default AppNew