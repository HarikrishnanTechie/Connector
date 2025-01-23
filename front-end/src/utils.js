export const getQueryString = (rows, type="Params") => {
    
    const filteredRows = rows.filter((row) => row.key && row.value); // Only include non-empty pairs
    // const lastRow = filteredRows[filteredRows.length - 1];
    if(type == 'Headers'){
        const headers = `{${filteredRows.map((row) => `"${row.key}":"${row.value}"`).join(",")}}`;
        return headers
    }
    const queryString = filteredRows
      .map((row) => `${encodeURIComponent(row.key)}=${encodeURIComponent(row.value)}`)
      .join("&");
    return queryString;
    // let newParam
    // if (lastRow?.key && lastRow?.value){
    //     newParam = `${encodeURIComponent(lastRow.key)}=${encodeURIComponent(lastRow.value)}`; 
    // }
    // return newParam;
   
  };