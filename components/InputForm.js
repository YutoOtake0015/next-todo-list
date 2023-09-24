import { useRecoilState } from "recoil";
import { todosState } from "./atoms";
import { useState } from "react";

export default function InputForm() {
  const [todos, setTodos] = useRecoilState(todosState);

  const [todo, setTodo] = useState({ id: 0, title: "", status: "" });
  const [inputTitle, setInputTitle] = useState("");
  const [inputId, setInputId] = useState(todos.length + 1);

  const handleInputTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodos([...todos, { id: inputId, title: inputTitle, status: "未着手" }]);
    setInputId(inputId + 1);
    setTodo("");
    setInputTitle("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          label="title"
          name="title"
          onChange={handleInputTitleChange}
          value={inputTitle}
        />
        <button>作成</button>
      </form>
    </>
  );
}
