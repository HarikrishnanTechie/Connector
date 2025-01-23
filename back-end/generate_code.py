import json
from jinja2 import Environment, FileSystemLoader

# Load the JSON configuration (API details)
with open("api_config.json", "r") as file:
    api_details = json.load(file)

# Set up the Jinja2 environment to look in the current directory
env = Environment(loader=FileSystemLoader("."), trim_blocks=True, lstrip_blocks=True) # Use '.' to search in the current directory
template = env.get_template('api_template.jinja')

# Render the template with the API details from the JSON file
generated_code = template.render(api_details)

# Save the generated Python code to a file
with open("generated_api_code.py", "w") as file:
    file.write(generated_code)

print("Python code generated and saved to generated_api_code.py")
