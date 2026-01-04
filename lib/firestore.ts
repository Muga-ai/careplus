// lib/firestore.ts
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

/**
 * Save a user profile to Firestore
 * @param uid Firebase Auth user UID
 * @param data User data object: email, firstName, lastName, phone, role, createdAt
 */
export async function saveUserProfile(
  uid: string,
  data: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role: string;
    createdAt?: Date;
  }
) {
  try {
    await setDoc(doc(db, "users", uid), data);
    console.log("User profile saved:", uid);
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
}
