from flask import Flask, request, jsonify
from flask_cors import CORS
from AuthenticationInterface import BearerTokenAuth, ApiKeyAuth
from CodeGenerator import CodeGenerator
from Request import RequestFactory
import logging
import json
from genson import SchemaBuilder
import openai
import os
from dotenv import load_dotenv
import json
from jinja2 import Environment, FileSystemLoader

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default


# Load environment variables from .env file
load_dotenv()

# Set up your OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY') 


def extract_code_from_gpt_model(messages):
    """Extracts the generated Python code from the OpenAI response."""
    #messages = response.choices[0].message['content']
    code = messages.split("```")[1].strip()
    return code


# Function to generate test cases for Python code using OpenAI API

def generate_python_code(url, headers, auth_type, params, http_method):
    """Generates Python code for making API calls using the provided details."""
    prompt = (
        f"Generate Python code for making an API call.\n"
        f"URL: {url}\n"
        f"Headers: {headers}\n"
        f"Auth Type: {auth_type}\n"
        f"Params: {params}\n"
        f"HTTP Method: {http_method}\n"
    )
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant that generates Python code for making API calls."
                ),
            },
            {"role": "user", "content": prompt}
        ],
        max_tokens=1000,
        temperature=0.7
    )

    print(response)
        
    return response.choices[0].message.content.strip()


def generate_python_code_with_additional_endpoint(url, endpoint1_url, endpoint2_url, additional_endpoint_value, headers, auth, params, http_method):
    """Generates Python code for making API calls using the provided details."""
    prompt = (
        f"First, make a GET request to an API constructed with a base URL and the first endpoint (base_url + endpoint1Url). Check if the response is successful, and then extract a key called {additional_endpoint_value} from the JSON response. If this key is missing or the request fails, handle the error gracefully with appropriate messages.\n"
        f"Use the extracted additionalEndpintvalue to construct the second API URL (base_url + endpoint2Url + additionalEndpintvalue) and make a second GET request. Print the JSON response from this request if successful. If this request fails, handle the error gracefully with the HTTP status code and details.\n"
        f"base_url: {url}\n"
        f"endpoint1Url: {endpoint1_url}\n"
        f"endpoint2Url: {endpoint2_url}\n"
        f"additionalEndpintvalue: {additional_endpoint_value}\n"
        f"auth type: {auth}\n"
        f"Headers: {headers}\n"
        f"Params: {params}\n"
        f"HTTP Method: {http_method}\n"
    )
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant that generates Python code for making API calls."
                ),
            },
            {"role": "user", "content": prompt}
        ],
        max_tokens=1000,
        temperature=0.7
    )

    print(response)
        
    return response.choices[0].message.content.strip()


def parse_request_config(data):
    try:
        # Authentication setup
        auth_data = data.get('authentication', {})
        auth_type = auth_data.get('auth_type', None)
        auth = None
        if auth_type == 'API_KEY':
            auth = ApiKeyAuth(auth_data)
        elif auth_type == 'Bearer':
            auth = BearerTokenAuth(auth_data)

        print(f"auth: {auth}")
        # Request setup
        request_data = data.get('request', {})
        print(f"request_data: {request_data}")
        #url = request_data.get('url', None)
        base_url = request_data.get("url", None)
        print(f"url: {base_url}")
        endpoint1_url = request_data.get("endpoint1Url", None)
        endpoint2_url = request_data.get("endpoint2Url", None)
        additional_endpoint_value = request_data.get("additionalEndpointValue", None)
        http_method = request_data.get('httpMethod', None)
        print(f"http_method: {http_method}")
        params = request_data.get('params', {})
        print(f"params: {params}")
        type=request_data.get('type', None)

        # Handle optional URL and endpoint logic
        # if not base_url:
        #     raise ValueError("Missing 'url' in the request configuration.")
        # if not http_method:
        #     raise ValueError("Missing 'httpMethod' in the request configuration.")
        # if url.startswith(("http://", "https://")):
        #     base_url, endpoint = url, ""
        # else:
        #     base_url = data.get("base_url", "")
        #     endpoint = url
        #     url = f"{base_url.rstrip('/')}/{endpoint.lstrip('/')}"

        auth, base_url, params, http_method, endpoint1_url, endpoint2_url, additional_endpoint_value, type = (
            auth or '',
            base_url or '',
            params or {},
            http_method or '',
            endpoint1_url or '',
            endpoint2_url or '',
            additional_endpoint_value or '',
            type or 'Jinja'
        )
        print(f"auth: {auth}, base_url: {base_url}, params: {params}, http_method: {http_method}")
        return auth, base_url, params, http_method, endpoint1_url, endpoint2_url, additional_endpoint_value
    except Exception as e:
        raise ValueError(f"Error parsing request configuration: {str(e)}")

def generate_schema(data):
    """Generate JSON Schema from the input data."""
    schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {},
        "required": list(data.keys())
    }

    for key, value in data.items():
        schema["properties"][key] = {"type": get_type(value)}

    return schema

def get_type(value):
    """Determine the type of a value for schema generation."""
    if isinstance(value, str):
        return "string"
    elif isinstance(value, int):
        return "integer"
    elif isinstance(value, float):
        return "number"
    elif isinstance(value, bool):
        return "boolean"
    elif isinstance(value, list):
        return "array"
    elif isinstance(value, dict):
        return "object"
    return "null"

@app.route('/make_request', methods=['GET', 'POST'])
def handle_request():
    try:
        logging.debug("Received request")    
        # Validate and parse JSON input
        data = request.get_json()
        logging.debug("Received request", data)
        print(f"Data: {data}")
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400
        
        #data= {'authentication': {'auth_type': 'Bearer', 'token':'eyJhbGciOiJFUzM4NCIsImtpZCI6IjM3Y2QyMzc2LTE4NGYtNGEzZi1iM2VkLTI4ZDU0MDdjOTllMiIsInR5cCI6IkpXVCJ9.eyJzdWJUeXBlIjoidXNlciIsInRlbmFudElkIjoicUNjMi1zRXJLWDBpTlYwQUlrTUFhUUY0RTcwdVRmYnkiLCJqdGkiOiIzN2NkMjM3Ni0xODRmLTRhM2YtYjNlZC0yOGQ1NDA3Yzk5ZTIiLCJhdWQiOiJxbGlrLmFwaSIsImlzcyI6InFsaWsuYXBpL2FwaS1rZXlzIiwic3ViIjoiNjYyNzY1ODVlZWMyOTQ1OGZiZDRkZjM3In0.VCiEOT67krliI_smMAMtrNLempsVZT6FiZTgHIIJYxBu41k8y3gq14UZ2Pt4eiX0wjR8SXoLtEMBjOnoBcM2ZjlkTpoN9a8nGLGbbFNA3N5RFcPCFG0Ldx69rso6On60'}, 'request': {'httpMethod': 'GET', 'url': 'https://k86r2hasnxwgm67.us.qlikcloud.com/api/v1/data-files'}}

        # Parse the request configuration
        auth, url, params, http_method, endpoint1_url, endpoint2_url, additional_endpoint_value, type = parse_request_config(data)
        print(f"auth: {auth}, url: {url}, params: {params}, http_method: {http_method}")

        # Create and execute the API request
        req = RequestFactory.create_request(http_method, url, endpoint1_url, endpoint2_url, additional_endpoint_value, params, None, auth)
        response = req.make_request()
        print(f"Response: {response}")

        
        builder = SchemaBuilder()
        # Add sample data to infer schema
        builder.add_object(response)

        # Generate schema
        schema = builder.to_schema()

        # Print the schema
        #print(json.dumps(schema, indent=4))
        headers=auth
        payload=None
        # Create the CodeGenerator instance
        code = ""
        if type == 'GenAI':
            if additional_endpoint_value:
                code = generate_python_code_with_additional_endpoint(url, endpoint1_url, endpoint2_url, additional_endpoint_value, headers, auth, params, http_method)
            else:
                url = f"{url}{endpoint1_url}"
                code = generate_python_code(url, headers, auth, params, http_method)
            #code = generate_python_code(url, headers, params, http_method, payload)
            code = extract_code_from_gpt_model(code)
        else:
            env = Environment(loader=FileSystemLoader("."), trim_blocks=True, lstrip_blocks=True) # Use '.' to search in the current directory
            template = env.get_template('api_template_single_request.jinja')
            template2 = env.get_template('api_template_nested_request.jinja')
            if additional_endpoint_value:
                code = template2.render(data)
            else:
                code = template.render(data)
                
        #generated_code = generator.extract_code_from_gpt_model()
        # print(f"generated_code: {generated_code}")
        
        # # schema = {
        # #     "type": "object",
        # #     "properties": {key: {"type": type(value).__name__} for key, value in response.text.items()}
        # # }
        
        # # schema = generate_schema(response.json())
        #code =""
        generated_code = code

        # Return the response along with the schema
        return jsonify({
            "response": response,
            "schema": schema,
            "generated_code": generated_code
        }), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001,debug=True)
