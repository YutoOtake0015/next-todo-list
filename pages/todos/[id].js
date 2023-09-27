import getTodo from "@/lib/todos";
import Link from "next/link";

export default function Todo({ todo }) {
  console.log("todo: ", todo);
  return (
    <>
      <div>
        <h1>{todo.title}</h1>
        <p>{todo.status}</p>
        <hr />
        <p>{todo.content}</p>
      </div>
      <Link href="/">戻る</Link>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  const todo = await getTodo(id);

  return {
    props: {
      todo,
    },
  };
}
