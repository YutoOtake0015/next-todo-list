import { useRecoilState } from "recoil";
import { todosState } from "../../components/atoms";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export default function CreateTodo() {
  const [todos, setTodos] = useRecoilState(todosState);
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    content: "",
    status: "",
  });
  const [inputId, setInputId] = useState(todos.length + 1);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  const router = useRouter();

  const handleInputTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleInputContentChange = (e) => {
    setInputContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setTodos([
        ...todos,
        {
          id: inputId,
          title: inputTitle,
          content: inputContent,
          status: "未着手",
        },
      ]);
      setInputId(inputId + 1);
      setTodo("");
      setInputTitle("");
      setInputContent("");

      router.push("/");
    }
    alert("タイトルが入力されていません。");
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
