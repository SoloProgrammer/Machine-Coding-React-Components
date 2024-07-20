"use client";

import { useState } from "react";

import { TaskCard } from "./task-card";
import { TaskForm } from "./task-form";

import { Category, Task } from "./types";
import useToast from "../Toastify";

type TaskListProps = {
  tasks: Task[];
  category: Category;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const TaskList = ({ tasks, setTasks, category }: TaskListProps) => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const addNewTask = (content: string, category: Category) => {
    const newTask: Task = {
      content,
      category,
      id: crypto.randomUUID(),
    };
    setTasks((prev) => [...prev, newTask]);
    toast({ message: "Task added!" });
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => {
      prev = prev.map((task) => {
        if (task.id === updatedTask.id) {
          task.content = updatedTask.content;
          task.category = updatedTask.category;
        }
        return task;
      });
      return prev;
    });
    toast({ message: "Task updated!" });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({ message: "Task deleted!" });
  };

  return (
    <div className="flex flex-col w-full gap-y-4 flex-grow overflow-y-auto">
      {tasks.map((task) => (
        <TaskCard
          {...task}
          key={task.id}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
      {showForm ? (
        <TaskForm
          onSubmit={addNewTask}
          hideForm={() => setShowForm(false)}
          defaultCategory={category}
        />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          role="button"
          className="text-white/80 hover:text-white text-sm w-fit"
        >
          Add task +
        </button>
      )}
    </div>
  );
};
