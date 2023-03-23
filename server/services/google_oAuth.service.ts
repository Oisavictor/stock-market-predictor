import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { open } from 'open';

const CLIENT_ID = process.env.CLIENTID; // Replace with your CLIENT_ID
const CLIENT_SECRET = process.env.CLIENTSECRET; // Replace with your CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:5000/google-signup-callback'; // Replace with your redirect URI
const SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const googleAuth = async (payload: any) => {
const getAuthUrl = () => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
};

const getUserInfo = async (code: any) => {
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const people = google.people({ version: 'v1', auth: client });
  const userInfo = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names',
  });
  return userInfo.data;
};

const createGoogleUser = async () => {
  const authUrl = getAuthUrl();
  console.log(`Please authorize this app by visiting this URL: ${authUrl}`);
  await open(authUrl);

  const code = await new Promise((resolve, reject) => {
    const server = require('http').createServer(async (req: { url: string; }, res: { end: (arg0: string) => void; }) => {
      try {
        if (req.url.indexOf('/google-signup-callback') > -1) {
          const code = req.url.split('=')[1];
          res.end('Thank you! You can now close this window.');

          server.close();

          resolve(code);
        }
      } catch (error) {
        reject(error);
      }
    }).listen(3000, () => {
      console.log('Server running on port 3000');
    });
  });

  const userInfo = await getUserInfo(code);
  console.log(`User info: ${JSON.stringify(userInfo)}`);
  // Create a new user with the user info
};

createGoogleUser();
}
