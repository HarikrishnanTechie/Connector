import requests
from AuthenticationInterface import AuthInterface
from RequestInterface import GetRequestInterface, PostRequestInterface


class GetRequest(GetRequestInterface):
    def __init__(self, url: str, endpoint1_url:str, endpoint2_url:str, additional_endpoint_value:str, headers: dict, auth: AuthInterface):
        self.url = url
        self.endpoint1_url = endpoint1_url
        self.endpoint2_url = endpoint2_url
        self.additional_endpoint_value = additional_endpoint_value
        self.headers = headers
        self.auth = auth

    def make_request(self):
        """Make a GET request with the authentication headers."""
        print("GetRequestInterface")
        if self.auth:
            self.headers = self.auth.get_headers(self.headers)  # Get the appropriate authentication headers
            print(self.headers)

        try:
            if not self.additional_endpoint_value:
                endpoint1_full_url = f"{self.url}{self.endpoint1_url}"

                print(f"url {self.url} , {self.headers} \n")
                response = requests.get(endpoint1_full_url, headers=self.headers)
                return response.json()
            else:
                endpoint1_full_url = f"{self.url}{self.endpoint1_url}"
                print(f"Making First API Call to: {endpoint1_full_url}")
                response1 = requests.get(endpoint1_full_url, headers=self.headers)

                # Ensure the first response is successful
                if response1.status_code == 200:
                    res1_data = response1.json()
                    additional_value = res1_data.get(self.additional_endpoint_value)
                    if not additional_value:
                        return {"error": "First API response does not contain 'additionalEndpintvalue'."}

                    # Second API Call
                    endpoint2_full_url = f"{self.url}{self.endpoint2_url}{additional_value}"
                    print(f"Making Second API Call to: {endpoint2_full_url}")
                    response2 = requests.get(endpoint2_full_url, headers=self.headers)
                    return response2.json()
            #print(f"GET Response: {response.status_code} - {response.text}")
        except requests.RequestException as e:
            print(f"Error making GET request: {e}")


class PostRequest(PostRequestInterface):
    def __init__(self, url: str, headers: dict, data: dict, auth: AuthInterface):
        self.url = url
        self.data = data
        self.auth = auth        
        self.headers = headers

    def make_request(self):
        """Make a POST request with the authentication headers."""
        self.headers = self.auth.get_headers(self.headers)  # Get the appropriate authentication headers

        try:
            response = requests.post(self.url, json=self.data, headers=self.headers)
            print(f"POST Response: {response.status_code} - {response.text}")
        except requests.RequestException as e:
            print(f"Error making POST request: {e}")


class RequestFactory:
    @staticmethod
    def create_request(http_method: str, url: str, endpoint1_url:str, endpoint2_url:str, additional_endpoint_value:str, headers: dict = None, data: dict = None, auth: AuthInterface = None):
        """Factory method to create the correct request object based on HTTP method."""
        print("inside create_request", http_method)
        if http_method == 'GET':
            return GetRequest(url, endpoint1_url, endpoint2_url, additional_endpoint_value, headers, auth)
        elif http_method == 'POST':
            return PostRequest(url, headers, data, auth)
        # You can extend this for PUT, DELETE, etc.
        else:
            raise ValueError(f"Unsupported HTTP method: {http_method}")
