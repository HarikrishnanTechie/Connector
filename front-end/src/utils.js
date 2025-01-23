export const getQueryString = (rows) => {
    
    const filteredRows = rows.filter((row) => row.key && row.value); // Only include non-empty pairs
    const lastRow = filteredRows[filteredRows.length - 1];
    // const queryString = filteredRows
    //   .map((row) => `${encodeURIComponent(row.key)}=${encodeURIComponent(row.value)}`)
    //   .join("&");
    let newParam
    if (lastRow?.key && lastRow?.value){
        newParam = `${encodeURIComponent(lastRow.key)}=${encodeURIComponent(lastRow.value)}`; 
    }
    return newParam;
   
  };