import { useRecoilValue } from "recoil";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { todosState } from "../../components/atoms";
import db from "@/lib/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

import { useRouter } from "next/router";

export default function CreateTodo() {
  const router = useRouter();
  // state
  const todos = useRecoilValue(todosState);
  const [insertTitle, setinsertTitle] = useState("");
  const [insertContent, setinsertContent] = useState("");

  // 関数
  const handleInsertTitleChange = (e) => {
    setinsertTitle(e.target.value);
  };

  const handleInsertContentChange = (e) => {
    setinsertContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todosCollection = collection(db, "todos");
    // todoインサート
    const docRef = await addDoc(todosCollection, {
      title: insertTitle,
      content: insertContent,
      status: "未着手",
      createdAt: serverTimestamp(),
    });

    // ドキュメントidをstateに設定
    console.log("docRef.id:  ", docRef.id);
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
      <Link href="/">戻る</Link>
    </>
  );
}
