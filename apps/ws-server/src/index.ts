import { log } from "@repo/logger";
import { createServer } from "./server";

const port = process.env.PORT || 5002;
// const server = createServer();

import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from '@repo/backend-common/config';
import { prisma } from "@repo/database";

const wss = new WebSocketServer({ port: 8080 });

const users = new Map<string, WebSocket>();

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.id) {
      return null;
    }

    return decoded.id;
  } catch (e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  let userId = null;

  ws.on('message', async function message(message) {
    
    const data = JSON.parse(message.toString());
    
    switch (data.type) {
      case 'auth':
        userId = checkUser(data.token);
        if (userId == null) {
          ws.close()
          return null;
        }
        users.set(userId, ws);
        break;
        
      case 'new_chat':
        const targetWs = users.get(data.targetUserId);
        if (targetWs) {
          targetWs.send(JSON.stringify({
            type: 'chat_request',
            from: {
              id: userId,
              name: data.name
            }
          }));
        }
        break;
        
      case 'message':
        const chatParticipants = await prisma.chatParticipant.findMany({
          where: {
            chatId: data.chatId  
          },
          include: {
            user: true
          }
        });
        chatParticipants.forEach(participant => {
          if (participant.userId !== userId) { // Ensure we do not send to the sender
            const recipientWs = users.get(participant.userId);
            if (recipientWs) {
              recipientWs.send(JSON.stringify({
                type: 'new_message',
                message: data.message,
                chatId: data.chatId,
                senderId: userId,
                timestamp: new Date().toISOString()
              }));
            }
          }
        });
        break;
    }
        

  });

  ws.on('close', () => {
    if (userId) {
      users.delete(userId);
    }
  });

});

// server.listen(port, () => {
//   log(`api running on ${port}`);
// });
