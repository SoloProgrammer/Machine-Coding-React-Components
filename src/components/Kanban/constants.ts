import { Category, Task } from "./types";

const categories: Category[] = [
  { title: "todo", id: crypto.randomUUID() },
  { title: "progress", id: crypto.randomUUID() },
  { title: "completed", id: crypto.randomUUID() },
  { title: "blocked", id: crypto.randomUUID() },
];

const initialTasks: Task[] = [
  {
    content: "Item1",
    id: crypto.randomUUID(),
    category: categories[0],
  },
  {
    content: "Item2",
    id: crypto.randomUUID(),
    category: categories[2],
  },
  {
    content: "Item3",
    id: crypto.randomUUID(),
    category: categories[1],
  },
  {
    content: "Item4",
    id: crypto.randomUUID(),
    category: categories[0],
  },
  {
    content: "Item5",
    id: crypto.randomUUID(),
    category: categories[1],
  },
  {
    content: "Item6",
    id: crypto.randomUUID(),
    category: categories[2],
  },
  {
    content: "Item7",
    id: crypto.randomUUID(),
    category: categories[2],
  },
  {
    content: "Item8",
    id: crypto.randomUUID(),
    category: categories[2],
  },
  {
    content: "Item9",
    id: crypto.randomUUID(),
    category: categories[3],
  },
  {
    content: "Item10",
    id: crypto.randomUUID(),
    category: categories[3],
  },
];

export { categories, initialTasks };
