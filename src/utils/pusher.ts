import * as Pusher from 'pusher';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const pusher = new Pusher({
  appId: process.env.PS_APP_ID,
  key: process.env.PS_KEY,
  secret: process.env.PS_SECRET,
  cluster: process.env.PS_CLUSTER,
});

export default pusher;
