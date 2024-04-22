import { ReactNode, useState } from 'react';
import { IChannel } from './types'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Announce, Calendar, Chat, Conference, Home, Task, Updates , Move} from '@xipkg/icons';


interface IChannelProps {
    channel : IChannel;
    setSlideIndex? : (arg : number) => void
}

interface IIconsDict {
  [key: string]: ReactNode;
};

  const iconClassName = 'transition-colors ease-in group-hover:fill-brand-80';

  const iconsDict: IIconsDict = {
    announce: <Announce className={iconClassName} />,
    calendar: <Calendar className={iconClassName} />,
    updates: <Updates className={iconClassName} />,
    task: <Task className={iconClassName} />,
    chat: <Chat className={iconClassName} />,
    camera: <Conference className={iconClassName} />,
    home : <Home className={iconClassName}/>
  };

export function Channel({channel , setSlideIndex } : IChannelProps) {  
    const [mouseOver , setMouseOver] = useState(false);
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging, 
      } = useSortable({
        id: channel.elId,
        data: {
          type: "Channel",
          channel,
        },
      });

      const router = useRouter();
  
    const handleRouteChange = () => {
      setSlideIndex && setSlideIndex(1);
      router.push(channel.link);
    };
      

      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
      };

      if (isDragging) {
        return <div ref={setNodeRef}  style={style} className="h-[4px] rounded-[2px] border-b-brand-80 bg-brand-80"></div>
      }

      return (
        <div 
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
          ref={setNodeRef}
          style={style}
        
          onClick={() => handleRouteChange() }
        >
            <div className='justify-between  text-gray-90 hover:bg-brand-0 hover:text-brand-80 group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in hover:cursor-pointer'>
                <div className='flex items-center'>
                {iconsDict[channel.icon]}
                 <span className="pl-2 text-[14px] font-normal">{channel.label}</span>
                </div>
                {mouseOver ? <div {...attributes} {...listeners}> <Move/></div> : null}
            </div>
        </div>
      );
}