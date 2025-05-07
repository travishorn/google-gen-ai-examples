# Google Gen AI Examples

A collection of examples demonstrating various features and capabilities of the
Google Generative AI API.

These examples were derived from the [Gemini API
Docs](https://ai.google.dev/gemini-api/docs) and modified for the tools,
techniques, and styles I am more comfortable with.

## Overview

- Text generation and conversations
- Image generation and editing
- Video generation and understanding
- Audio understanding
- Document processing
- Function calling
- Structured output
- And more

## Prerequisites

- Node.js (Latest LTS version recommended)
- An [API key for Google AI Studio](https://aistudio.google.com/apikey)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/travishorn/google-gen-ai-examples.git
```

2. Change into the directory:

```bash
cd google-gen-ai-examples
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your API key:

```
GOOGLE_API_KEY=your_api_key_here
```

## Examples

The repository includes numerous examples organized by feature:

### Text Generation

- `00-text-generation.js` - Basic text generation
- `01-system-instructions.js` - Using system instructions
- `02-override-parameters.js` - Customizing model parameters

### Conversations

- `04-streaming-responses.js` - Streaming responses
- `05-multi-turn-conversations.js` - Multi-turn conversations
- `06-streaming-multi-turn.js` - Streaming multi-turn conversations

### Image Generation and Editing

- `07-image-generation.js` - Basic image generation
- `08-image-editing.js` - Image editing capabilities
- `09-image-generation-imagen.js` - Using Imagen for image generation

### Video Generation

- `10-video-from-image.js` - Generating video from images
- `11-video-generation.js` - Video generation
- `18-video-understanding.js` - Video understanding

### Advanced Features

- `12-structured-output.js` - Getting structured output
- `13-thinking-models.js` - Using thinking models
- `14-function-calling.js` - Function calling capabilities
- `15-document-understanding.js` - Document understanding
- `16-large-documents.js` - Processing large documents
- `17-image-understanding.js` - Image understanding
- `19-youtube.js` - YouTube integration
- `20-audio-understanding.js` - Audio understanding
- `21-grounding-google-search.js` - Grounding with Google Search

## Running Examples

To run any example, use Node.js:

```bash
node examples/00-text-generation.js
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

This project uses ESLint and Prettier for code formatting. Before submitting any
pull requests, please...

1. Lint the code:

```bash
npm run lint
```

2. Format the code:

```bash
npm run format
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE)
file for details.
