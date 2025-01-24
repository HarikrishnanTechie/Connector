class CodeGenerator:
    def __init__(self, url, headers=None, http_method="GET", payload=None):
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
