import requests

BASE_URL = "http://127.0.0.1:5000"  # URL of the Flask server

def get_folders():
    """Get the list of folders"""
    response = requests.get(f"{BASE_URL}/")
    if response.status_code == 200:
        folders = response.json()
        print("Folders:", folders)
    else:
        print("Error fetching folders:", response.status_code)

def get_lists_in_folder(folder):
    """Get the lists in the given folder"""
    response = requests.get(f"{BASE_URL}/{folder}")
    if response.status_code == 200:
        lists = response.json()
        print(f"Lists in {folder}:")
        for list_id, items in lists.items():
            print(f"  {list_id}: {items}")
    else:
        print(f"Error fetching lists in {folder}: {response.status_code}")

def get_list_values(folder, list_id):
    """Get the values of a specific list"""
    response = requests.get(f"{BASE_URL}/{folder}/{list_id}")
    if response.status_code == 200:
        items = response.json()
        print(f"Items in {list_id} of {folder}:")
        for key, value in items.items():
            print(f"  {key}: {value}")
    else:
        print(f"Error fetching values in {folder}/{list_id}: {response.status_code}")

def main():
    # Example usage
    get_folders()  # Fetch and display the list of folders
    folder_name = input("Enter a folder name: ")
    get_lists_in_folder(folder_name)  # Fetch and display lists in a specific folder
    list_id = input("Enter a list name: ")
    get_list_values(folder_name, list_id)  # Fetch and display the values of a list

if __name__ == "__main__":
    main()
