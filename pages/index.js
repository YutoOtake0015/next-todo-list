import InputForm from "@/components/InputForm";
import { todosState } from "@/components/atoms";
import Head from "next/head";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function Home() {
  const [todos, setTodos] = useRecoilState(todosState);

  return (
    <>
      <Head>
        <title>Next Todo</title>
      </Head>

      <section>
        <Link href="./todos/create">新規作成</Link>
        {/* <InputForm /> */}
      </section>

      <section>
        {todos.map((todo) => (
          <div key={todo.id}>
            <h1>{todo.title}</h1>
            <p>{todo.status}</p>
          </div>
        ))}
      </section>
    </>
  );
}
