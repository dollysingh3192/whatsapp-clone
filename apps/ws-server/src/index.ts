import { log } from "@repo/logger";
import { createServer } from "./server";

const port = process.env.PORT || 5002;
const server = createServer();

import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from '@repo/backend-common/config';
import { prisma } from "@repo/database";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;

  if (!url) {
    return;
  }
  
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close()
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws
  })

  ws.on('message', async function message(data) {
    


  });

});

server.listen(port, () => {
  log(`api running on ${port}`);
});
