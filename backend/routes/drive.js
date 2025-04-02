const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = decoded.user; // Expecting { profile, accessToken } here
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

router.post('/upload', verifyToken, async (req, res) => {
  try {
    // Log the authenticated user details for debugging
    console.log('Authenticated user:', req.user);

    // Destructure title and letterContent from request body
    const { title, letterContent } = req.body;

    // Check if letter content exists
    if (!letterContent) {
      return res.status(400).json({ error: 'Missing letter content' });
    }

    // Get the access token from the user object
    const accessToken = req.user && req.user.accessToken;
    if (!accessToken) {
      console.error('Access token missing in user data.');
      return res.status(400).json({ error: 'Missing access token in user data' });
    }

    // Configure OAuth2 client with the user's access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Initialize the Drive API client
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Prepare file metadata for a Google Doc
    const fileMetadata = {
      name: title || 'Untitled Letter',
      mimeType: 'application/vnd.google-apps.document'
    };

    // Create the new Google Doc
    const file = await drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    });

    console.log('File created with ID:', file.data.id);

    // Initialize the Docs API client
    const docs = google.docs({ version: 'v1', auth: oauth2Client });

    // Replace the default newline in the document with your letter content
    await docs.documents.batchUpdate({
      documentId: file.data.id,
      requestBody: {
        requests: [
          {
            replaceAllText: {
              containsText: {
                text: '\n',  // This matches the default newline in a new document
                matchCase: true
              },
              replaceText: letterContent
            }
          }
        ]
      }
    });

    console.log('Content successfully inserted into the document.');
    res.status(200).json({ fileId: file.data.id });
  } catch (error) {
    // Log full error details for debugging purposes
    if (error.response) {
      console.error('Error uploading letter:', error.response.data);
      res.status(500).json({ error: 'Failed to upload letter', details: error.response.data });
    } else {
      console.error('Error uploading letter:', error.message);
      res.status(500).json({ error: 'Failed to upload letter', details: error.message });
    }
  }
});

module.exports = router;




