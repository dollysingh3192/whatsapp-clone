import express from "express";
import auth from "../middlewares/auth";
import { prisma } from '@repo/database';  // Import the Prisma singleton instance

const router = express.Router();

router.get("/me", auth, async (req, res) => {
    const userId = req.userId.id;

    //find the user in the database
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.send({
        name: user.name
    })
})

router.get("/all", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: "Search query is required" });
        }

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive' // Case-insensitive search
                        }
                    },
                    {
                        email: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                // Add other fields you want to return
            },
            take: 10 // Limit results to 10 users
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ error: "An error occurred while searching users" });
    }
});

router.get("/chats",auth, async (req, res) => {
    const userId = req.userId.id;
    try {
		const conversations = await prisma.chat.findMany({
			orderBy: {
				lastMessageAt: "desc",
			},
			where: {
				createdBy: userId,
			},
			include: {
				participants : {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                createdAt: true,
                                updatedAt: true,
                                lastSeen: true,
                            },
                        }
                    }
				},
				messages: {
					include: {
						sender: {
							select: {
								id: true,
								email: true,
								name: true,
								createdAt: true,
								updatedAt: true,
								lastSeen: true,
							},
						}
					},
				},
			},
		});
		res.send({
            conversations
        });
	} catch (error) {
		console.log(error, "CONVERSATIONS_FETCH_ERROR");
		return [];
	}
})
   
   
export default router;