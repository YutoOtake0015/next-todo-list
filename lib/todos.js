import { collection, getDocs, query, where } from "firebase/firestore";
import db from "./firebase";

export default async function getTodo(id) {
  const todos = collection(db, "todos");
  const q = query(todos, where("id", "==", Number(id)));
  const todo = await getDocs(q);
  const todoData = todo.docs[0].data();

  return todoData;
}
