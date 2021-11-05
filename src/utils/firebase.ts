import { initializeApp, credential } from 'firebase-admin';
import { join } from 'path';

const app = initializeApp({
  credential: credential.cert(
    join('/Users/danielemmanuel/Documents/google-services.json'),
  ),
  databaseURL: 'https://e-commerce-site-19c7a.firebaseio.com',
});

export default app;
