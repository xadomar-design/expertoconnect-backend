import { db } from "../firebase.js";

export const createUser = async (data) => {
  const userRef = db.collection("users").doc();
  await userRef.set(data);
  return { id: userRef.id, ...data };
};

export const getUserByEmail = async (email) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};
