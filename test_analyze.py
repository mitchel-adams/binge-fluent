import requests
import os
import webbrowser

# Path to the file in the Downloads folder
file_path = os.path.expanduser('~/Downloads/bluey-spanish.txt')

# Read the content of the file
with open(file_path, 'r') as file:
    content = file.read()

# Define the endpoint of the Flask server
url = 'http://127.0.0.1:5001/analyze'

# Create the payload
payload = {
    'content': content,
    'language': 'es'  # Specify the language of the content
}

# Send a POST request to the Flask server to analyze the content
response = requests.post(url, json=payload)

# Open the results in a web browser if the request was successful
if response.status_code == 200:
    webbrowser.open('http://127.0.0.1:5001/results', new=2)
else:
    print(f"Error: {response.json()}")
