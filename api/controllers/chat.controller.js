import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId, postId } = req.body;

  try {
    const existingChat = await prisma.chat.findFirst({
      where: {
        userIDs: { hasEvery: [tokenUserId, receiverId] },
        postId: postId,
      },
    });

    if (existingChat) {
      return res.status(400).json({ message: "Chat already exists for this post and users!" });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { title: true, images: true },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId],
        postId: postId,
        postTitle: post.title,
        postImage: post.images[0],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};


export const readChat = async (req, res) => {
  const tokenUserId = req.userId;


  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

export const checkChatExists = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId, postId } = req.query;

  try {
    const existingChat = await prisma.chat.findFirst({
      where: {
        userIDs: { hasEvery: [tokenUserId, receiverId] },
        postId: postId,
      },
    });

    if (existingChat) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to check chat existence!" });
  }
};