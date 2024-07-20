export type Category = {
  title: "todo" | "progress" | "completed" | "blocked";
  color?: string;
  id: string;
};

export type Task = {
  id: string;
  content: string;
  category: Category;
};
