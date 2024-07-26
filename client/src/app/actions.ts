"use server";

import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";

// Function to generate a random room code
function generateRoomCode(length: number = 6): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const createRoom = async () => {
  let roomCode: string = "";
  let isUnique = false;

  // Keep generating codes until we find a unique one
  while (!isUnique) {
    roomCode = generateRoomCode();
    const exists = await redis.sismember("existing-rooms", roomCode);
    if (!exists) {
      isUnique = true;
    }
  }

  await redis.sadd("existing-rooms", roomCode);
  redirect(`/room/${roomCode}`);
};

function wordFreq(text: string): { text: string; value: number }[] {
  const words: string[] = text.replace(/\./g, "").split(/\s/);
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }
  return Object.keys(freqMap).map((word) => ({
    text: word,
    value: freqMap[word],
  }));
}

export const submitFeedback = async ({
  feedback,
  roomCode,
}: {
  feedback: string;
  roomCode: string;
}) => {
  const words = wordFreq(feedback);
  await Promise.all(
    words.map(async (word) => {
      await redis.zadd(
        `room:${roomCode}`,
        {
          incr: true,
        },
        { member: word.text, score: word.value }
      );
    })
  );

  await redis.incr("served-requests");
  await redis.publish(`room:${roomCode}`, JSON.stringify(words));

  return feedback;
};