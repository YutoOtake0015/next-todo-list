import { atom } from "recoil";

export const todosState = atom({
  key: "todosState",
  default: [
    { id: 1, title: "初めの投稿", content: "運動をする", status: "未着手" },
    { id: 2, title: "次の投稿", content: "学習をする", status: "完了" },
  ],
});
