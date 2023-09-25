import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { todosState } from "../../components/atoms";
import db from "@/lib/firebase";
import { addDoc, collection } from "@firebase/firestore";

import { useRouter } from "next/router";

export default function CreateTodo() {
  const router = useRouter();
  // state
  const todos = useRecoilValue(todosState);
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    content: "",
    status: "",
  });
  const [inputId, setInputId] = useState(todos.length + 1);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  // 関数
  const handleInputTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleInputContentChange = (e) => {
    setInputContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // todo作成
    setTodo({
      id: inputId,
      title: inputTitle,
      content: inputContent,
      status: "未着手",
    });
  };

  useEffect(() => {
    if (todo.title !== "") {
      // DBに追加
      const addTodo = collection(db, "todos");
      addDoc(addTodo, todo);

      router.push("/");
    }
  }, [todo]);

  return (
    <>
      <Head>
        <title>新規作成</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            label="title"
            name="title"
            onChange={handleInputTitleChange}
            value={inputTitle}
          />
        </div>
        <br />
        <div>
          <label htmlFor="content">内容</label>
          <textarea
            label="content"
            name="content"
            onChange={handleInputContentChange}
            value={inputContent}
          />
        </div>
        <button>作成</button>
      </form>
      <Link href="/">戻る</Link>
    </>
  );
}
