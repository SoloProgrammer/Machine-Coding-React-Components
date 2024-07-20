import { ElementRef, FormEvent, useRef, useState } from "react";

import { cn } from "../../lib/cn";
import { Category } from "./types";

import { X } from "lucide-react";

import { categories } from "./constants";

type TaskFormProps = {
  hideForm?: () => void;
  onSubmit?: (content: string, category: Category) => void;
  defaultCategory?: Category;
  defaultContent?: string;
  isUpdating?: boolean;
};

export const TaskForm = ({
  hideForm,
  onSubmit,
  isUpdating = false,
  defaultContent = "",
  defaultCategory,
}: TaskFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    defaultCategory || categories[0]
  );

  const contentRef = useRef<ElementRef<"textarea">>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (contentRef.current) {
      onSubmit?.(contentRef.current.value, selectedCategory);
      hideForm?.();
    }
  };

  return (
    <form
      className="p-3 bg-zinc-800 border border-zinc-400 rounded"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={contentRef}
        onFocus={(e) =>
          e.target.setSelectionRange(
            defaultContent.length,
            defaultContent.length
          )
        }
        defaultValue={defaultContent}
        autoFocus
        className="focus-visible:ring-transparent border-none min-h-[55px] w-full p-2 text-white resize-none text-[1rem] bg-zinc-900/50 rounded"
        placeholder="Type task content.."
      />
      <div className="flex items-center gap-x-2 mt-2">
        {categories.map((category) => (
          <span
            key={category.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCategory(category);
            }}
            className={cn(
              "px-2 h-auto py-1 roudned text-xs font-semibold bg-zinc-900 text-white transition-colors rounded cursor-pointer",
              selectedCategory.title === category.title &&
                "text-black/90 bg-white/90"
            )}
          >
            {category.title}
          </span>
        ))}
      </div>
      <div className="flex justify-end items-center gap-x-1 mt-2">
        <button className="bg-white text-black/80 text-sm px-3 py-1 rounded border-none cursor-pointer font-semibold">
          {isUpdating ? "Save" : "Add task"}
        </button>
        <button
          onClick={hideForm}
          className="p-2 rounded text-white ml-1 hover:bg-zinc-900/50"
        >
          <X className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </form>
  );
};
