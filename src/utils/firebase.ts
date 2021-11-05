import { initializeApp, credential } from 'firebase-admin';
import { join } from 'path';

const app = initializeApp({
  credential: credential.cert(join(process.cwd(), 'google-services.json')),
  databaseURL: 'https://e-commerce-site-19c7a.firebaseio.com',
});

export default app;
