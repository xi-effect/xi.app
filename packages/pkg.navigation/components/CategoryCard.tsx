import { ReactNode, useState } from 'react';
import { ICategory } from './types'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Announce, Calendar, Chat, Conference, Home, Task, Updates } from '@xipkg/icons';

interface Props {
    category : ICategory;
    setSlideIndex : any
  }
  type IconsDictT = {
    [key: string]: ReactNode;
  };

  const iconClassName = 'transition-colors ease-in group-hover:fill-brand-80';

  const iconsDict: IconsDictT = {
    announce: <Announce className={iconClassName} />,
    calendar: <Calendar className={iconClassName} />,
    updates: <Updates className={iconClassName} />,
    task: <Task className={iconClassName} />,
    chat: <Chat className={iconClassName} />,
    camera: <Conference className={iconClassName} />,
    home : <Home className={iconClassName}/>
  };

export function CategoryCard({category , setSlideIndex} : Props) {  
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
      } = useSortable({
        id: category.elId,
        data: {
          type: "Category",
          category,
        },
      });

      const router = useRouter();
  
    const handleRouteChange = () => {
      setSlideIndex(1);
      router.push(category.link);
    };

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
    //         opacity-30
    //       bg-blue-50 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
    //       "
    //       />
    //     );
    //   }

      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={() => handleRouteChange() }
          className="text-gray-90 hover:bg-brand-0 hover:text-brand-80 group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in hover:cursor-pointer"
        >
          {iconsDict[category.icon]}
        <span className="pl-2 text-[14px] font-normal">{category.label}</span>
        </div>
      );
}