import { useState } from "react";
import Head from "next/head";
import db from "@/lib/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

import { useRouter } from "next/router";

export default function CreateTodo() {
  const router = useRouter();
  // state
  const [insertTitle, setinsertTitle] = useState("");
  const [insertContent, setinsertContent] = useState("");

  // 関数
  const handleInsertTitleChange = (e) => {
    setinsertTitle(e.target.value);
  };

  const handleInsertContentChange = (e) => {
    setinsertContent(e.target.value);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todosCollection = collection(db, "todos");
    // todoインサート
    await addDoc(todosCollection, {
      title: insertTitle,
      content: insertContent,
      status: "未着手",
      createdAt: serverTimestamp(),
    });

    router.push("/");
  };

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
            onChange={handleInsertTitleChange}
            value={insertTitle}
          />
        </div>
        <br />
        <div>
          <label htmlFor="content">内容</label>
          <textarea
            label="content"
            name="content"
            onChange={handleInsertContentChange}
            value={insertContent}
          />
        </div>
        <button>作成</button>
      </form>
      <button onClick={handleBack}>戻る</button>
    </>
  );
}
