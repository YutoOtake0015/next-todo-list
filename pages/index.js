import { todosState } from "@/components/atoms";
import db from "@/lib/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import statusItems from "./components/items";

export default function Home() {
  // state
  const [todos, setTodos] = useRecoilState(todosState);

  useEffect(() => {
    // DBからデータを取得(idで昇順にソート)
    const todoData = collection(db, "todos");
    const orderedTodoData = query(todoData, orderBy("createdAt"));
    getDocs(orderedTodoData).then((snapShot) => {
      setTodos(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // リアルタイムで取得
    onSnapshot(orderedTodoData, (todo) => {
      setTodos(todo.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <>
      <Head>
        <title>Next Todo</title>
      </Head>

      <section>
        <Link href="./todos/create">新規作成</Link>
      </section>

      <section>
        {todos.map((todo) => (
          <div key={todo.id}>
            <Link href={`todos/${todo.id}`}>
              <h1>{todo.title}</h1>
            </Link>
            <p>{statusItems[todo.status]}</p>
          </div>
        ))}
      </section>
    </>
  );
}
