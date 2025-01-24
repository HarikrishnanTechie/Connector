import React, {useState, useEffect} from 'react';
import { TextField, Button, Box } from "@mui/material";
import AccordionUsage from "./Accordion";
import axios from 'axios';

const mockResponse = {
  "generated_code": "sample code",
  "response": {
      "data": [
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1734034059_1734034090.csv",
              "createdDate": "2024-12-12T20:08:11.332Z",
              "folder": false,
              "id": "b8d93200-5b68-4c59-82b8-acfd12d077fc",
              "modifiedDate": "2024-12-12T20:08:11.59Z",
              "name": "IntegrationTestFile_1734034059_1734034090.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#l8KSWmMgqrGiSoMpi15uz98KTig8QGM3zimAB5fe824",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1730143857_1730143889.csv",
              "createdDate": "2024-10-28T19:31:29.736Z",
              "folder": false,
              "id": "2c896800-a9c8-4468-9c96-081839836dc6",
              "modifiedDate": "2024-10-28T19:31:29.989Z",
              "name": "IntegrationTestFile_1730143857_1730143889.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#Jptm_mpSd2pJmnGtNhpFlLSvxEhJDIa5ImrEKRU_9Tc",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1729683791_1729683822.csv",
              "createdDate": "2024-10-23T11:43:42.867Z",
              "folder": false,
              "id": "18709500-fc47-4759-9ab0-b249e166dbbe",
              "modifiedDate": "2024-10-23T11:43:43.119Z",
              "name": "IntegrationTestFile_1729683791_1729683822.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#H_Q1AIMP9-o8D9ns9FIjj-jRtRsJXAT9y2b36uHXAxs",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1730289080_1730289111.csv",
              "createdDate": "2024-10-30T11:51:51.908Z",
              "folder": false,
              "id": "c7459e00-0f9f-4274-804d-4a728ab3efcc",
              "modifiedDate": "2024-10-30T11:51:52.253Z",
              "name": "IntegrationTestFile_1730289080_1730289111.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#fq4zcLmusZSdvA813PfiNH2vkrmL3qqzx0zQS8AijEU",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1737375391.csv",
              "createdDate": "2025-01-20T12:16:34.238Z",
              "folder": false,
              "id": "a1d9b600-692b-437c-975b-eb80e063fc6c",
              "modifiedDate": "2025-01-20T12:17:04.019Z",
              "name": "IntegrationTestFile_1737375391.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#17gLRbc4Xy3SziDli6Euuuin94EEywg5DxyjSM0Z7s0",
              "size": 244379
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1730321074_1730321105.csv",
              "createdDate": "2024-10-30T20:45:05.596Z",
              "folder": false,
              "id": "a70fce00-ae4d-4e42-b7ec-22d501d2f7bf",
              "modifiedDate": "2024-10-30T20:45:05.879Z",
              "name": "IntegrationTestFile_1730321074_1730321105.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#p_SYlNxIoSOls3sUd6o7yQyv-wvISUVT2Xbv5NyUMkY",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1730285480.csv",
              "createdDate": "2024-10-30T10:51:29.508Z",
              "folder": false,
              "id": "c423f600-6092-4a6d-b950-cd164e5de1df",
              "modifiedDate": "2024-10-30T10:51:29.768Z",
              "name": "IntegrationTestFile_1730285480.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#jgIt_BDBLpiZHySu7Bn2bfDHcmnSr0Ck6sJNN5AIVvE",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1729690469_1729690500.csv",
              "createdDate": "2024-10-23T13:35:01.354Z",
              "folder": false,
              "id": "cc2e2d01-674f-4343-988f-0867cc467e00",
              "modifiedDate": "2024-10-23T13:35:01.707Z",
              "name": "IntegrationTestFile_1729690469_1729690500.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#TLUbcN0pISgI_kWCgJ9ZNDMUfbxtamYa65EtQPpy9yA",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFiles_1737119254.csv",
              "createdDate": "2025-01-17T13:08:46.114Z",
              "folder": false,
              "id": "b6863001-7e34-4c05-903b-228626dc01aa",
              "modifiedDate": "2025-01-17T13:09:40.402Z",
              "name": "IntegrationTestFiles_1737119254.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#EK1DWkGFVQTlgWCHntzu3TyeZR0S87-MFhkFhwqsIbI",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1736344504_1736344538.csv",
              "createdDate": "2025-01-08T13:55:38.87Z",
              "folder": false,
              "id": "50895801-72db-4c5b-a3a0-383ae042f1b9",
              "modifiedDate": "2025-01-08T13:55:39.242Z",
              "name": "IntegrationTestFile_1736344504_1736344538.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#ubAjoDxmlnXqgcApFs4_Bz6E2Y3MyKfxvrgpRjSLUEU",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1729800396_1729800427.csv",
              "createdDate": "2024-10-24T20:07:08.251Z",
              "folder": false,
              "id": "ef046301-c807-4935-9e00-7633db4601f7",
              "modifiedDate": "2024-10-24T20:07:08.494Z",
              "name": "IntegrationTestFile_1729800396_1729800427.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#5blQH6qA2daFUM4Pn9nm62ow-ot4oOf2WAHZU1F6pkQ",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1736512547_1736512614.csv",
              "createdDate": "2025-01-10T12:36:54.826Z",
              "folder": false,
              "id": "4ddc9101-c547-417f-bd77-48094aef639e",
              "modifiedDate": "2025-01-10T12:36:55.066Z",
              "name": "IntegrationTestFile_1736512547_1736512614.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#TLMyRC_bZ_DIRUqZdp1tI7XfJVCJnUEadHl8kUiPDWI",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1729798947.csv",
              "createdDate": "2024-10-24T19:42:53.375Z",
              "folder": false,
              "id": "c2a4aa01-6be5-4a81-a4ce-646ea8e2ee21",
              "modifiedDate": "2024-10-24T19:43:06.461Z",
              "name": "IntegrationTestFile_1729798947.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#-E9PcENbdM6qcpccOT4ga9jivNTPLrVosJntSp1gHFs",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1729600344.csv",
              "createdDate": "2024-10-22T12:32:34.52Z",
              "folder": false,
              "id": "e13dd201-ec84-4410-b358-8147061bc472",
              "modifiedDate": "2024-10-22T12:32:34.791Z",
              "name": "IntegrationTestFile_1729600344.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#8EnYNbLunpQkWc1YGm1XxzEgFO2NCYWypCrYeyPI4Mc",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1729749638_1729749669.csv",
              "createdDate": "2024-10-24T06:01:10.59Z",
              "folder": false,
              "id": "c339dd01-2efd-400d-8b7b-f771b18b3634",
              "modifiedDate": "2024-10-24T06:01:10.884Z",
              "name": "IntegrationTestFile_1729749638_1729749669.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#IosvH6yxpQHvmRYmmwtOj7naGDzLSMVn1Uza505leVo",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1733491967_1733491992.csv",
              "createdDate": "2024-12-06T13:33:13.072Z",
              "folder": false,
              "id": "7ea4e001-6be0-4bb6-832c-cbc413d05174",
              "modifiedDate": "2024-12-06T13:33:13.356Z",
              "name": "IntegrationTestFile_1733491967_1733491992.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#dhOeRWFoZ--S9PnU28Xsou7uH6uf4vhmYlr5X_jU-5o",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1730820827.csv",
              "createdDate": "2024-11-05T15:33:49.889Z",
              "folder": false,
              "id": "38d20e02-68af-4e74-ad9c-1ee3aa2aaefe",
              "modifiedDate": "2024-11-05T15:33:55.813Z",
              "name": "IntegrationTestFile_1730820827.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#7GXOQkpx0kr1ZWb5LXy8jSJw9C0VK5ujd08Gw9Sk1Gs",
              "size": 715
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1729683694_1729683725.csv",
              "createdDate": "2024-10-23T11:42:06.323Z",
              "folder": false,
              "id": "07a71602-4fc7-4ed2-83cd-abee26e2b6b7",
              "modifiedDate": "2024-10-23T11:42:06.588Z",
              "name": "IntegrationTestFile_1729683694_1729683725.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#1tFH09E2vBQLrPOc9uwpkCus2kPolsjgLGCr7Pd6bc8",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1731405058.csv",
              "createdDate": "2024-11-12T09:51:23.322Z",
              "folder": false,
              "id": "63da3802-1d73-4ba9-8c92-2cd9b30cd0d2",
              "modifiedDate": "2024-11-12T09:51:36.875Z",
              "name": "IntegrationTestFile_1731405058.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#rk_po0ma3q88C76VdvaCBO40udSwvjDTJzP6J1PoZMI",
              "size": 314
          },
          {
              "actions": [
                  "read",
                  "update",
                  "delete",
                  "list",
                  "change_owner",
                  "change_space"
              ],
              "baseName": "IntegrationTestFile_1734670355_1734670385.csv",
              "createdDate": "2024-12-20T04:53:06.066Z",
              "folder": false,
              "id": "295d4002-04ab-42fe-a52b-f5327ec9dd92",
              "modifiedDate": "2024-12-20T04:53:06.346Z",
              "name": "IntegrationTestFile_1734670355_1734670385.csv",
              "ownerId": "66276585eec29458fbd4df37",
              "qri": "qri:qdf:user://ngAhpUW3rGlHe3HtW53-ESGWHRd_sFrT7KK1Kxwmfig#jembNZfZ4WC2M_xNDP6vntm5MBP0k3pRASGemplP9pQ",
              "size": 314
          }
      ],
      "links": {
          "next": {
              "href": "https://k86r2hasnxwgm67.us.qlikcloud.com:443/api/v1/data-files?page=Mjk1ZDQwMDItMDRhYi00MmZlLWE1MmItZjUzMjdlYzlkZDky"
          },
          "prev": {},
          "self": {
              "href": "https://k86r2hasnxwgm67.us.qlikcloud.com:443/api/v1/data-files"
          }
      }
  },
  "schema": {
      "$schema": "http://json-schema.org/schema#",
      "properties": {
          "data": {
              "items": {
                  "properties": {
                      "actions": {
                          "items": {
                              "type": "string"
                          },
                          "type": "array"
                      },
                      "baseName": {
                          "type": "string"
                      },
                      "createdDate": {
                          "type": "string"
                      },
                      "folder": {
                          "type": "boolean"
                      },
                      "id": {
                          "type": "string"
                      },
                      "modifiedDate": {
                          "type": "string"
                      },
                      "name": {
                          "type": "string"
                      },
                      "ownerId": {
                          "type": "string"
                      },
                      "qri": {
                          "type": "string"
                      },
                      "size": {
                          "type": "integer"
                      }
                  },
                  "required": [
                      "actions",
                      "baseName",
                      "createdDate",
                      "folder",
                      "id",
                      "modifiedDate",
                      "name",
                      "ownerId",
                      "qri",
                      "size"
                  ],
                  "type": "object"
              },
              "type": "array"
          },
          "links": {
              "properties": {
                  "next": {
                      "properties": {
                          "href": {
                              "type": "string"
                          }
                      },
                      "required": [
                          "href"
                      ],
                      "type": "object"
                  },
                  "prev": {
                      "type": "object"
                  },
                  "self": {
                      "properties": {
                          "href": {
                              "type": "string"
                          }
                      },
                      "required": [
                          "href"
                      ],
                      "type": "object"
                  }
              },
              "required": [
                  "next",
                  "prev",
                  "self"
              ],
              "type": "object"
          }
      },
      "required": [
          "data",
          "links"
      ],
      "type": "object"
  }
}

const RequestScreen = ({data, setData}) => {
    const [formValues, setFormValues] = useState({ baseUrl: "", endpointUrl: "", httpMethod: "GET", authentication: "None", token: "", data: {}});
    const [expanded, setExpanded] = React.useState('panel1');
    const [value, setValue] = React.useState('one');
    const [queryString, setQueryString] = useState('');
    const [headers, setHeaders] = useState([{ key: "", value: "" }]);
    const [fields, setFields] = useState([]);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");

    const baseUrlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/)?$/;

    const handleChange = (e) => {

        const { name, value } = e.target;
        // Validate the URL
        if(name === 'baseUrl'){
          if(formValues.baseUrl === ''){
            setError(false);
            setHelperText("");
          }
          if (!baseUrlRegex.test(formValues.baseUrl)) {
            setError(true);
            setHelperText("Please enter a valid base URL (e.g., https://example.com/)");
          } else {
          setError(false);
          setHelperText(""); // Clear the error if valid
          }
        }
        setFormValues((prevValues) => ({ ...prevValues, [name]: value}));
    };

    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFetchDetails = async(e, type) => {
       e.preventDefault();

       const fetchRequest = {
        authentication : formValues.authentication === "None" 
        ? {} 
        : { 
            auth_type: formValues.authentication, 
            token: formValues.token 
        },
        request : {
            httpMethod : formValues.httpMethod,
            url : formValues.baseUrl,
            type: type,
            endpoint1Url: formValues.endpointUrl,
            endpoint2Url: fields[0]?.additional,
            additionalEndpointValue: fields[0]?.value,
        },
        ...(formValues.httpMethod === "POST" || formValues.httpMethod === "PUT" 
            ? { data: formValues.data } 
        : {})
       }

      console.log('Fetch', fetchRequest)

      // const response = await axios.post(`http://127.0.0.1:5001/make_request`, fetchRequest)
      // setData(response.data)
      setData(mockResponse)
    }

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addTextFields = (e) => {
        e.preventDefault();
        setFields([...fields, { id: Date.now(), key: "", value: "" }]);
    };

    const handleInputChange = (fieldId, fieldName, newValue) => {
        setFields(fields.map(field =>
          field.id === fieldId ? { ...field, [fieldName]: newValue } : field
        ));
    };

    useEffect(() => {
        if(queryString){
        formValues.endpointUrl.split('?')
          setFormValues((prevValues) => ({
            ...prevValues,
            endpointUrl: `${queryString.length > 1 ? formValues.endpointUrl.split('?')[0] : formValues.endpointUrl}?${queryString}`,
          }));
        }
    }, [queryString])

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor:'white'}}>
        Request Screen
        <TextField label="Base URL" variant="outlined" name="baseUrl" size="small" value={formValues.baseUrl} onChange={handleChange} fullWidth required 
          error={error}
          helperText={helperText}/>
        <TextField label="Endpoint URL" variant="outlined" name="endpointUrl" size="small" value={formValues.endpointUrl} onChange={handleChange} fullWidth />
        {fields.length > 0 && <p style={{margin: 0, padding: 0}}>Additional Endpoints</p>}
        {fields.map((field) => (
        <Box key={field.id} sx={{display: "flex", alignItems: "center", gap: 1, mb: 0,}}>
          <TextField label="Endpoint" variant="outlined" value={field.additional} onChange={(e) => handleInputChange(field.id, "additional", e.target.value)} sx={{ flex: 1 }} size='small' />
          <TextField label="Value" variant="outlined" value={field.value} onChange={(e) => handleInputChange(field.id, "value", e.target.value)} sx={{ flex: 1 }} size='small' />
        </Box>
      ))}
        <AccordionUsage formValues={formValues} handleChange={handleChange} handleTabsChange={handleTabsChange} value={value} handleAccordionChange={handleAccordionChange}
        expanded={expanded} setExpanded={setExpanded} setQueryString={setQueryString} setHeaders={setHeaders} disabled={data?.response}/>
        <Button type="submit" variant="contained" color="primary" size="small" onClick={(e) => handleFetchDetails(e, 'GenAI')}>Fetch Data using GenAI</Button>
        <Button type="submit" variant="contained" color="primary" size="small" onClick={(e) => handleFetchDetails(e, 'Jinga')}>Fetch Data using Jinja2 Template</Button>
        {data && data?.response && <Button type="submit" variant="contained" color="primary" size="small" onClick={addTextFields}>Add New Endpoints</Button>}
        </Box>
  )
}

export default RequestScreen;