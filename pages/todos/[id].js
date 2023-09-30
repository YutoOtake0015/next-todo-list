import getTodo from "@/lib/todos";
import { useRouter } from "next/router";
import statusItems from "../../components/items";
import db from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

export default function Todo({ todo }) {
  const router = useRouter();
  // 関数
  const handleBack = () => {
    router.back();
  };

  const handleDelete = async () => {
    const todoRef = doc(db, "todos", todo.id);
    await deleteDoc(todoRef);

    router.push("/");
  };

  return (
    <>
      <div>
        <Link href={`./${todo.id}/edit`}>編集</Link>
        <button onClick={handleDelete}>削除</button>
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
