"use client";

import { useState } from "react";

import { EditIcon, Trash } from "lucide-react";

import { Category, Task } from "./types";

import { TaskForm } from "./task-form";

type TaskCardProps = {
  updateTask?: (task: Task) => void;
  deleteTask?: (id: string) => void;
} & Task;
export const TaskCard = ({
  content,
  category,
  id,
  updateTask,
  deleteTask,
}: TaskCardProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (content: string, category: Category) => {
    updateTask?.({ content, category, id });
  };

  const handleDelete = () => {
    const yes = confirm("Are you sure? This action cannot be undone!");
    yes && deleteTask?.(id);
  };

  return showForm ? (
    <TaskForm
      defaultCategory={category}
      defaultContent={content}
      hideForm={() => setShowForm(false)}
      onSubmit={handleSubmit}
      isUpdating
    />
  ) : (
    <div className="w-full p-4 rounded bg-zinc-800 border border-zinc-400 text-white flex items-center justify-between">
      <span>{content}</span>
      <span className="flex items-center gap-x-1">
        <button onClick={() => setShowForm(true)}>
          <EditIcon className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
        </button>
        <button onClick={handleDelete}>
          <Trash className="w-h h-4 text-white/70 hover:text-white cursor-pointer" />
        </button>
      </span>
    </div>
  );
};
