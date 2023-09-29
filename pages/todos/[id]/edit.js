import db from "@/lib/firebase";
import getTodo from "@/lib/todos";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditTodo({ todo }) {
  const router = useRouter();

  // state
  const [editTodo, setEditTodo] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editStatus, setEditStatus] = useState("");

  //表示項目に初期値設定
  useEffect(() => {
    setEditContent(todo.content);
    setEditStatus(todo.status);
  }, []);

  // 関数
  const handleSubmit = async (e) => {
    e.preventDefault();

    // todo編集
    const docRef = doc(db, "todos", todo.id);
    await updateDoc(docRef, {
      title: todo.title,
      content: editContent,
      status: editStatus,
    });
    router.push("/");
  };

  const handleEditContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditStatusChange = (e) => {
    setEditStatus(e.target.value);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <h1>{todo.title}</h1>
          <select value={editStatus} onChange={handleEditStatusChange}>
            <option value="notStarted">未着手</option>
            <option value="inProgress">着手</option>
            <option value="done">完了</option>
          </select>
          <p>{todo.status}</p>
          <hr />
          <textarea value={editContent} onChange={handleEditContentChange} />
          <button type="submit">更新</button>
        </form>
        <br />
      </>
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
