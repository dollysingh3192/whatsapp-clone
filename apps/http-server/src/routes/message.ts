import express from "express";
import auth from "../middlewares/auth";
import { prisma } from '@repo/database';  // Import the Prisma singleton instance

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { chatId, content, sentAt } = req.body;
    const senderId = req.userId.id;

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            }
        });
        
        if (!chat) {
            return res.status(400).json({ message: 'Invalid chat ID' });
        }

        const newMessage = await prisma.message.create({
            data: {
                chat: {
                    connect: {
                        id: chatId
                    }
                },
                sender: {
                    connect: {
                        id: senderId
                    }
                },
                content,
                sentAt,
                deliveredAt: new Date() // when the message is successfully stored in the database and broadcasted to the recipient(s). It ensures consistency
            }
        });

        const updateChat = await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                lastMessageAt: new Date()
            },
        });

        res.status(201).json({ newMessage });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});
    

//get route to get all messages in a chat
router.get('/:chatId', auth, async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await prisma.message.findMany({
            where: {
                chatId
            },
            orderBy: {
                sentAt: 'desc'
            }
        });

        messages.sort((a, b) => {
			if (a.createdAt && b.createdAt) {
				return a.createdAt.getTime() - b.createdAt.getTime();
			}
			return 0;
		});

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;