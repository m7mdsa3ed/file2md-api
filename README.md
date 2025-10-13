# FileToMarkdown API

A Node.js/Express API that converts various file formats to Markdown using the [filetomarkdown](https://www.npmjs.com/package/filetomarkdown) library.

## Features

- 🔄 Converts multiple file formats to Markdown
- 📁 Saves uploaded files to `/tmp` directory
- 🚀 RESTful API endpoint
- 📦 Ready for Vercel deployment
- 🎯 ES6 modules support

## Supported File Formats

The API supports various file formats including:
- PDF documents
- Word documents (.docx)
- PowerPoint presentations (.pptx)
- Excel spreadsheets (.xlsx)
- Images (with OCR capabilities)
- And more...

## Installation

### Manual Setup

1. Create and navigate to the project directory:
```bash
mkdir filetomarkdown-api && cd filetomarkdown-api
```

2. Initialize Node.js project:
```bash
npm init -y
```

3. Install dependencies:
```bash
npm install express multer filetomarkdown
```

## Usage

### Running Locally

```bash
node index.js
```

The server will start on port 3010 (or use the `PORT` environment variable).

### API Endpoints

#### POST /api/convert

Converts an uploaded file to Markdown.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: File upload with field name `file`

**Response:**
```json
{
  "markdown": "# Converted content\n\nYour file content converted to Markdown..."
}
```

**Example using cURL:**
```bash
curl -X POST -F "file=@example.pdf" http://localhost:3010/api/convert
```

**Example using JavaScript:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/convert', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data.markdown));
```

#### GET /

Health check endpoint.

**Response:**
```
FileToMarkdown API is running ✅
```

## File Processing

1. Files are temporarily saved to `/tmp` directory
2. The `convertToMarkdown` function receives the file path as a string
3. The converted Markdown content is returned in the response

## Deployment

### Vercel

The project is configured for Vercel deployment with the included `vercel.json` file.

```bash
vercel --prod
```

## Dependencies

- **express**: Web framework for Node.js
- **multer**: Middleware for handling file uploads
- **filetomarkdown**: Library for converting files to Markdown

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400`: No file uploaded
- `500`: Internal server error (file processing issues)

## Environment Variables

- `PORT`: Server port (default: 3010)

## License

ISC