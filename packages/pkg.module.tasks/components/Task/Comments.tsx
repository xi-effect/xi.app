import React from 'react';
import { Clip, File as FileIcon, Send } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { mockCommentsData } from './mockCommentsData';

type CommentPropsT = {
  author: string;
  text: string;
};

export const Comments = () => (
  <div className="border-gray-30 flex w-full flex-col gap-6 rounded-lg border p-6 xl:w-[400px] 2xl:w-[450px]">
    <h2 className="text-xl-base font-bold">Личные комментарии</h2>
    <div className="flex h-[352px] flex-col gap-4 overflow-auto">
      {mockCommentsData.length > 0 &&
        mockCommentsData.map((comment) => (
          <CommentItem author={comment.author} text={comment.text} key={comment.id} />
        ))}
    </div>
    <div className="flex w-full items-center gap-2">
      <div className="w-full">
        <Input
          type="text"
          before={
            <Button className="px-1" variant="ghost" size="s">
              <Clip />
            </Button>
          }
        />
      </div>
      <Button>
        <Send className="fill-white" />
      </Button>
    </div>
  </div>
);

const CommentItem = ({ author, text }: CommentPropsT) => (
  <div className="flex flex-col gap-4">
    <div className="flex gap-3">
      <div className="bg-green-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
        ММ
      </div>
      <div>
        <p className="font-medium">{author}</p>
        <span className="text-s-base">{text}</span>
        <div className="mt-2 flex gap-3">
          <div className="text-gray-60 text-xs-base flex items-center gap-1">
            <FileIcon size="s" /> <span>Морозов.pdf</span>
          </div>
          <div className="text-gray-60 text-xs-base flex items-center gap-1">
            <FileIcon size="s" /> <span>Морозов.pdf</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-orange-0 text-red-80 flex flex-col gap-1 rounded-lg p-2">
      <span className="text-xs-base">10.09.22, 14:30</span>
      <p>Задание возвращено</p>
    </div>
  </div>
);
