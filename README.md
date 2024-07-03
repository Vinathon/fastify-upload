Fastify Upload Service

This project provides a Fastify server with a route to upload files and/or text values. The uploaded files are saved in the uploads directory, and any text values are processed and included in the response.


API Endpoint
Upload a File or Text Value
URL: /upload
Method: POST
Content-Type: multipart/form-data

Directory Structure

fastify-upload/
│
├── uploads/         # Directory to store uploaded files
│
├── server.js        # Main server file
│
└── package.json     # Project dependencies and scripts


Path:
/upload

    
