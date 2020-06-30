import http from 'http';

import app from './app';

const port = process.env.PORT || 4000;

http.createServer(app).listen(port, () => {
  console.log(`Server running at ${port}`);
});
