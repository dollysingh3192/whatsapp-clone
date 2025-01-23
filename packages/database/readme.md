Table Contents
1. Users Table
Tracks individual users.

id	name	email	lastSeen	createdAt	updatedAt
user1	Alice	alice@example.com	2025-01-11T12:00:00Z	2025-01-01T10:00:00Z	2025-01-11T12:00:00Z
user2	Bob	bob@example.com	2025-01-11T12:05:00Z	2025-01-01T11:00:00Z	2025-01-11T12:05:00Z
user3	Charlie	charlie@example.com	2025-01-11T11:00:00Z	2025-01-02T10:00:00Z	2025-01-11T11:00:00Z

2. Chats Table
Stores metadata for each chat.

id	isGroup	name	createdAt	lastMessageAt
chat1	false	NULL	2025-01-05T10:00:00Z	2025-01-11T12:01:00Z
chat2	true	Friends Group	2025-01-06T10:00:00Z	2025-01-11T12:10:00Z

3. ChatParticipants Table
Tracks the users participating in each chat.

id	chatId	userId	joinedAt
cp1	chat1	user1	2025-01-05T10:00:00Z
cp2	chat1	user2	2025-01-05T10:00:00Z
cp3	chat2	user1	2025-01-06T10:00:00Z
cp4	chat2	user2	2025-01-06T10:00:00Z
cp5	chat2	user3	2025-01-06T10:00:00Z


4. Messages Table
Tracks the messages sent in each chat.

id	chatId	senderId	content	sentAt	deliveredAt	seenAt
1	chat1	user1	Hi Bob!	2025-01-11T12:00:00Z	2025-01-11T12:00:05Z	2025-01-11T12:00:10Z
2	chat1	user2	Hello Alice!	2025-01-11T12:01:00Z	2025-01-11T12:01:05Z	2025-01-11T12:01:10Z
3	chat2	user1	Hey everyone!	2025-01-11T12:10:00Z	2025-01-11T12:10:05Z	NULL


Relationships
1. User → ChatParticipant (1:M)
A User can participate in many Chats via the ChatParticipant table.
A ChatParticipant belongs to one User.
Example:

Alice (user1) is part of both chat1 and chat2.
Bob (user2) is also in both chats.


2. Chat → ChatParticipant (1:M)
A Chat can have many participants via the ChatParticipant table.
A ChatParticipant belongs to one Chat.
Example:

chat2 (Friends Group) has three participants: Alice, Bob, and Charlie.


3. Chat → Message (1:M)
A Chat can have many Messages.
A Message belongs to one Chat.
Example:

chat1 has two messages: Hi Bob! and Hello Alice!.


4. User → Message (1:M)
A User can send many Messages.
A Message is sent by one User.
Example:

Alice (user1) sent two messages: Hi Bob! (in chat1) and Hey everyone! (in chat2).


5. Chat (M:M) User (via ChatParticipant)
The many-to-many (M:M) relationship between Users and Chats is handled by the ChatParticipant table.

A User can participate in many Chats.
A Chat can have many Users.
Example:

Alice is part of both chat1 and chat2.
chat2 has three participants: Alice, Bob, and Charlie.


Command	Description
\l	List all databases.
\c dbname	Connect to a specific database.
\dt	List all tables in the current database.
\d tablename	Describe the structure of a table.
SELECT * FROM table;	View all rows in a table.
\q	Exit the PostgreSQL shell.

docker exec -it f4e0721d20cecb8fadbfcce5a469f18da1aea852b495c6c28b93e1c06d0d129b /bin/sh
psql -h localhost -U admin -d whatsapp

npx prisma migrate dev
npm run generate