const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs');
const util = require('util');
const pump = util.promisify(require('stream').pipeline);

// Register the multipart plugin
fastify.register(require('fastify-multipart'), {
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limit
  }
});

// Define a route to upload a file and handle text input
fastify.post('/upload', async (req, reply) => {
  const parts = req.parts();

  let fileData;
  let textData = {};

  for await (const part of parts) {
    if (part.file) {
      // Handle file upload
      const filePath = path.join(__dirname, 'uploads', part.filename);
      if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
        fs.mkdirSync(path.join(__dirname, 'uploads'));
      }
      await pump(part.file, fs.createWriteStream(filePath));
      fileData = { filename: part.filename, filepath: filePath };
    } else {
      // Handle text fields
      textData[part.fieldname] = part.value;
    }
  }

  reply.send({
    status: 'Data processed successfully',
    file: fileData || null,
    text: textData
  });
});

// Start the server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
