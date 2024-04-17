import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useRouter } from 'next/navigation';
import { CSS } from "@dnd-kit/utilities";
import { ReactNode, useState } from "react";
import { Announce, Calendar, Chat, Conference, Task, Updates } from '@xipkg/icons';
import { DndContext, KeyboardSensor, PointerSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";

const iconClassName = 'transition-colors ease-in group-hover:fill-brand-80';

type IconsDictT = {
    [key: string]: ReactNode;
  };
  
  const iconsDict: IconsDictT = {
    announce: <Announce className={iconClassName} />,
    calendar: <Calendar className={iconClassName} />,
    updates: <Updates className={iconClassName} />,
    task: <Task className={iconClassName} />,
    chat: <Chat className={iconClassName} />,
    camera: <Conference className={iconClassName} />,
  };

const Item = ({ index, item , id,  setSlideIndex }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
  
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    const router = useRouter();
  
    const handleRouteChange = () => {
      setSlideIndex(1);
      router.push(item.link);
    };
  
    return (
      <li ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        id={item?.elId}
        className="text-gray-90 hover:bg-brand-0 hover:text-brand-80 group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in hover:cursor-pointer"
        key={index.toString()}
        onClick={handleRouteChange}
      >
        {iconsDict[item.icon]}
        <span className="pl-2 text-[14px] font-normal">{item.label}</span>
      </li>
    );
  };

  export function Container({item , setSlideIndex} : any) {
    const {title , channelId , channels , subtitle} = item
    const [channelsMenu , setChannelsMenu ] = useState(channels)
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id : channelId});
  
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );
      const getTaskPos = (id : string) => channelsMenu.findIndex((item : any) => item.elId === id);

      const handleDragEnd = (event : any) => {
        const { active, over } = event;
    
        if (active.id === over.id) return;
        console.log(active.id === over.id)
    
        setChannelsMenu((menus : any) => {
          const originalPos = getTaskPos(active.id);
          const newPos = getTaskPos(over.id);
    
          return arrayMove(menus, originalPos, newPos);
        });
      };
    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div>
                <div ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    id={item?.elId}
                    className="text-gray-90 pl-2 mt-8 w-full  rounded-lg p-2"
                >
                    <div className="flex pl-2 flex-col items-start mb-2">
                        <span className="text-[16px] font-semibold">{title}</span>
                        <span className="text-[14px] font-normal">{subtitle}</span>
                    </div> 
                    <SortableContext
                        items={channelsMenu.map((item : any) => item.elId)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div>
                            {channelsMenu.map((item : any , index : number) => 
                                <Item index={index} item={item} id={item.elId} setSlideIndex={setSlideIndex}/>
                            )}
                        </div>
                    </SortableContext>
                </div>
            </div>
        </DndContext>
    );
}