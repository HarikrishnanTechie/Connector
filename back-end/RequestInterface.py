from abc import ABC, abstractmethod
class RequestInterface(ABC):
    @abstractmethod
    def make_request(self):
        """Make the HTTP request."""
        pass

class GetRequestInterface(RequestInterface):
    @abstractmethod
    def make_request(self):
        """Make a GET request."""
        pass

class PostRequestInterface(RequestInterface):
    @abstractmethod
    def make_request(self):
        """Make a POST request."""
        pass
