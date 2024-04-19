import { useMemo, useState } from "react";
import { IChannel, IColumn } from "./types";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { Channel } from "./Channel";

interface Props {
    column : IColumn;
    channels : IChannel[]
    setSlideIndex : any
    activeCategory? : IChannel | null
    activeColumn? : IColumn | null 
}

export function ColumnContainer({column , channels , setSlideIndex} : Props) {
  const [mouseOver , setMouseOver] = useState(false);
    const channelsIds = useMemo(() => {
        return channels.map((channel : IChannel) => channel.elId);
      }, [channels]);

      const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        isDragging,
        transition,
      } = useSortable({
        id: column.id,
        data: {
          type: "Column",
          column,
        },
      });

      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
      };

    return (
        <div className="relative"
          ref={setNodeRef}
          style={style}
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
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
            <SortableContext strategy={verticalListSortingStrategy} items={channelsIds}>
              {!isDragging && channels.map((category : IChannel) => (
                  <Channel
                  setSlideIndex={setSlideIndex}
                  key={category.elId}
                  category={category}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      );
}