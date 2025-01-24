from abc import ABC, abstractmethod
from datetime import datetime, timedelta
import secrets


# Interface for authentication
class AuthInterface(ABC):
    @abstractmethod
    def get_headers(self, headers):
        """Return the headers needed for authentication."""
        pass


# API Key Authentication
class ApiKeyAuth(AuthInterface):
    def __init__(self, auth_data):
        self.api_key = auth_data.get('api_key', None)

    def get_headers(self, headers):
        """Return headers with the API key."""
        if not self.api_key:
            raise ValueError("API key is missing.")
        return {'X-API-KEY': self.api_key}


# Bearer Token Authentication
class BearerTokenAuth(AuthInterface):
    def __init__(self, auth_data):
        self.token = auth_data.get('token', None)

    def get_headers(self, headers):
        """Return headers with the Bearer token."""
        if not self.token:
            raise ValueError("Token is missing.")
        headers["Authorization"] = f'Bearer {self.token}'
        return headers
