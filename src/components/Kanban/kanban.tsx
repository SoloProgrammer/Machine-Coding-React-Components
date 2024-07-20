import { useState } from "react";

import { TaskList } from "./task-list";

import { Task } from "./types";

import { categories, initialTasks } from "./constants";

export const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  return (
    <div className="flex flex-nowrap overflow-x-auto bg-zinc-950/90 h-full p-4 gap-x-4">
      {categories.map((category) => {
        const tasksByCaetgory = tasks.filter(
          (task) => task.category.title === category.title
        );
        return (
          <div
            key={category.id}
            className="min-w-[400px] bg-zinc-900 p-4 rounded h-full flex flex-col"
          >
            <h1 className="text-white/70 uppercase text-[1rem] font-semibold pb-3">
              {category.title}
            </h1>
            <TaskList
              tasks={tasksByCaetgory}
              setTasks={setTasks}
              category={category}
            />
          </div>
        );
      })}
    </div>
  );
};
