import getTodo from "@/lib/todos";
import Link from "next/link";
import { useRouter } from "next/router";
import statusItems from "../../components/items";

export default function Todo({ todo }) {
  const router = useRouter();
  // 関数
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div>
        <Link href={`./${todo.id}/edit`}>編集</Link>
        <h1>{todo.title}</h1>
        <p>{statusItems[todo.status]}</p>
        <hr />
        <p>{todo.content}</p>
      </div>
      <button onClick={handleBack}>戻る</button>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  const todo = await getTodo(id);

  if (todo.createdAt) {
    todo.createdAt = todo.createdAt.toMillis();
  }

  return {
    props: {
      todo,
    },
  };
}
