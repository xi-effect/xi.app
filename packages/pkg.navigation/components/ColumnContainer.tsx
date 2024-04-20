import { useMemo, useState } from "react";
import { IChannel, IColumn } from "./types";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { Channel } from "./Channel";

interface Props {
    column : IColumn;
    channels : IChannel[]
    setSlideIndex? : any
}

export function ColumnContainer({column , channels , setSlideIndex} : Props) {
    const channelsIds = useMemo(() => {
        return channels.map((channel : IChannel) => channel.elId);
      }, [channels]);

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
      });


      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
      };

      if (isDragging) {
        return <div ref={setNodeRef}  style={style} className="h-[4px] rounded-[2px] border-b-brand-80 bg-brand-80"></div>
      }

    return (
        <div className="relative"
          ref={setNodeRef}
          style={style}
        >
          <div
            {...attributes}
            {...listeners}
          >
            <div className="flex pl-4 flex-col items-start">
                <span className="text-[16px] font-semibold">{column.title}</span>
                <span className="text-[14px] font-normal">{column.subtitle}</span>
            </div>
          </div>
          <div className="flex flex-grow flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto">
            <SortableContext strategy={verticalListSortingStrategy} items={channelsIds}>
              {channels.map((channel : IChannel) => {
               return <Channel
                  setSlideIndex={setSlideIndex}
                  key={channel.elId}
                  channel={channel}
                />
              })}
            </SortableContext>
          </div>
        </div>
      );
}