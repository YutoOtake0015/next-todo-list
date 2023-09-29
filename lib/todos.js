import { doc, getDoc } from "firebase/firestore";
import db from "./firebase";

export default async function getTodo(id) {
  const todoRef = doc(db, "todos", id);
  const dbData = (await getDoc(todoRef)).data();
  const todoData = { id, ...dbData };

  return todoData;
}
