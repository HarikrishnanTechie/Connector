import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from '@mui/material';

function createData(name, display_name, type, required, description) {
  return { name, display_name, type, required, description};
}

const rows = [
  createData('Yoghurt', 234, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// {

//   "id" : "123",
//   name: "abc"
//   },
//   {
  
//   "id" : "456",
//   name: "def"
//   },
//   {
  
//   "id" : "789",
//   name: "xyz"
//   }



function ResponseTable({data}) {
  const keys = data.length > 0 && Object.keys(...data);

  console.log(keys);
  const values = data.length > 0 && Object.values(...data);

  console.log(values)
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {keys.length && keys?.map((key) => {
              return <TableCell>{key}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {values.length && values?.map((value, index) => {
              return <TableCell>{value}</TableCell>
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResponseTable;