import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';

import { Server } from 'socket.io';
import { routes } from './routes';

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => { 
  console.log(`Usuario conectado no socket ${socket.id}`);
});

app.use(express.json());
app.use(routes);

app.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/singin/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };


//  credinciais para web
//  GITHUB_CLIENT_SECRET=f742b70d58efc345912c1d0e3f5c4f7d986e1d5c
// GITHUB_CLIENT_ID=6ae5d22a0d4119e0e2cc

// JWT_SECRET=a94e2f163028707b79df499d49d95a2b