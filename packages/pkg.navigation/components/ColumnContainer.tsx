import { useMemo } from "react";
import { ICategory, IColumn } from "./types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { CategoryCard } from "./CategoryCard";

interface Props {
    column : IColumn;
    categories : ICategory[]
    setSlideIndex : any
}

export function ColumnContainer({column , categories , setSlideIndex} : Props) {
    const categoriesIds = useMemo(() => {
        return categories.map((category : ICategory) => category.elId);
      }, [categories]);


      const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
      } = useSortable({
        id: column.id,
        data: {
          type: "Column",
          column,
        },
        disabled : column.isStatic
      });

      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
      };

    //   if (isDragging) {
    //     return (
    //       <div
    //         ref={setNodeRef}
    //         style={style}
    //         className="
    //       bg-columnBackgroundColor
    //       opacity-40
    //       border-2
    //       border-pink-500
    //       w-[350px]
    //       h-[500px]
    //       max-h-[500px]
    //       rounded-md
    //       flex
    //       flex-col
    //       "
    //       ></div>
    //     );
    //   }
    return (
        <div
          ref={setNodeRef}
          style={style}
        >
          {/* Column title */}
          <div
            {...attributes}
            {...listeners}
          >
            <div className="flex pl-4 flex-col items-start">
                <span className="text-[16px] font-semibold">{column.title}</span>
                <span className="text-[14px] font-normal">{column.subtitle}</span>
            </div> 
          </div>
    
          {/* Column task container */}
          <div className="flex flex-grow flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto">
            <SortableContext items={categoriesIds}>
              {categories.map((category : ICategory) => (
                <CategoryCard  setSlideIndex={setSlideIndex}
                  key={category.elId}
                  category={category}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      );
}