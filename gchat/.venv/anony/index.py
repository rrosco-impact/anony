from __future__ import print_function
import os.path
import json

from flask import Flask
from google import genai
from google.genai import types
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.apps import chat_v1 as google_chat

app = Flask(__name__)

###### [ANY-30] Data Analysis Backend Server

### Gemini API Test - Unhide to use
client = genai.Client()

print("Gemini is up and running.")

@app.route("/test")
def preprocess():
    prompt = "Kaipuhan ning mayong pili-pili sa educational assistance"
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        config=types.GenerateContentConfig(
            system_instruction="You preprocess data, that translates text to english. Choose the best and most direct translation. Only output the translation."),
        contents=prompt
    )
    return response.text

###### [ANY-27] Set-up Set-up GChat Server
# If modifying these scopes, delete the file token.json.
# SCOPES = ['https://www.googleapis.com/auth/chat.spaces.readonly']


# def main():
#     """Shows basic usage of the Google Chat API.
#     """
#     creds = None
#     # The file token.json stores the user's access and refresh tokens, and is
#     # created automatically when the authorization flow completes for the first
#     # time.
#     if os.path.exists('token.json'):
#         creds = Credentials.from_authorized_user_file('gchat/flask-server-secret.json', SCOPES)
#     # If there are no (valid) credentials available, let the user log in.
#     if not creds or not creds.valid:
#         if creds and creds.expired and creds.refresh_token:
#             creds.refresh(Request())
#         else:
#             flow = InstalledAppFlow.from_client_secrets_file(
#                 'credentials.json', SCOPES)
#             creds = flow.run_local_server(port=0)
#         # Save the credentials for the next run
#         with open('token.json', 'w') as token:
#             token.write(creds.to_json())

#     try:
#         # Create a client
#         client = google_chat.ChatServiceClient(
#             credentials = creds,
#             client_options = {
#                 "scopes" : SCOPES
#             }
#         )

#         # Initialize request argument(s)
#         request = google_chat.ListSpacesRequest(
#             # Filter spaces by space type (SPACE or GROUP_CHAT or DIRECT_MESSAGE)
#             filter = 'space_type = "SPACE"'
#         )

#         # Make the request
#         page_result = client.list_spaces(request)

#         # Handle the response. Iterating over page_result will yield results and
#         # resolve additional pages automatically.
#         for response in page_result:
#             print(response)
#     except Exception as error:
#         # TODO(developer) - Handle errors from Chat API.
#         print(f'An error occurred: {error}')


# if __name__ == '__main__':
#     main()

@app.route("/")
def hello_world():
    return "Hello, World!"