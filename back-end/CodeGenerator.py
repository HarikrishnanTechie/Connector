import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up your OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY') 

class CodeGenerator:
    def __init__(self, url, headers=None, http_method="GET",payload=None, params=None):
        """
        Initialize the Code Generator for HTTP requests.
        
        :param url: str - The API endpoint URL.
        :param headers: dict - Custom headers for the request.
        :param http_method: str - The HTTP method (GET, POST, PUT, DELETE, etc.).
        :param payload: dict - The request body (for POST, PUT, etc.).
        """
        self.url = url
        self.headers = headers if headers else {}
        self.http_method = http_method.upper()
        self.payload = payload
        self.params = params

    def generate_python_code(self):
        """Generates Python code for making API calls using the provided details."""
        print("inside generate_python_code")
        prompt = (
            f"Generate Python code for making an API call.\n"
            f"URL: {self.url}\n"
            f"Headers: {self.headers}\n"
            f"Params: {self.params}\n"
            f"HTTP Method: {self.http_method}\n"
        )

        print(f"prompt: {prompt}")
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
        print(f"response: {response}")

        response = response.choices[0].message.content.strip()
        print(f" code gen response: {response}")
        
        return response


    def extract_code_from_gpt_model(self):
        """Extracts the generated Python code from the OpenAI response."""
        print("inside extract_code_from_gpt_model")
        messages = self.generate_python_code()
        #messages = response.choices[0].message['content']
        print(f"messages: {messages}")
        code = messages.split("```")[1].strip()
        print(f"code: {code}")
        return code

    def generate_code(self):
        """
        Generates Python code for the HTTP request based on the provided parameters.
        
        :return: str - The generated Python code.
        """
        headers_code = f"headers = {self.headers}" if self.headers else "headers = {}"
        payload_code = f"data = {self.payload}" if self.payload else ""
        
        if self.http_method in ["POST", "PUT", "PATCH"]:
            request_code = (
                f"response = requests.{self.http_method.lower()}(url, headers=headers, json=data)"
            )
        elif self.http_method == "GET":
            request_code = "response = requests.get(url, headers=headers)"
        elif self.http_method == "DELETE":
            request_code = "response = requests.delete(url, headers=headers)"
        else:
            request_code = f"response = requests.{self.http_method.lower()}(url, headers=headers)"
        
        # Generate the full code block
        generated_code = f"""
# Auto-Generated Python Code for HTTP Request
import requests

url = "{self.url}"
{headers_code}
{payload_code}

try:
    {request_code}
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)
except requests.RequestException as e:
    print("Error making the request:", e)
"""
        return generated_code


# # Example Usage
# url = "https://api.example.com/data"
# headers = {"Authorization": "Bearer your_token_here"}
# http_method = "POST"
# payload = {"key": "value"}

# # Create the CodeGenerator instance
# generator = CodeGenerator(url, headers, http_method, payload)

# # Generate the Python code
# generated_code = generator.generate_code()

# # Print the generated code
# print(generated_code)
