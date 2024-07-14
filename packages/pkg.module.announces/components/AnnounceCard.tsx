import { ChevronRight } from '@xipkg/icons';

type AnnounceCardProps = {
  title: string;
  description: string;
  date: string;
  author: string;
};

const AnnounceCard = ({
  title = 'Заголовок объявления',
  description = 'Текст объявления',
  date = '1 января 1970',
  author = 'Автор',
}: AnnounceCardProps) => (
  <div className="border-gray-80 hover:bg-gray-5 group flex h-56 cursor-pointer flex-col rounded-2xl border p-6">
    <h2 className="line-clamp-1 text-xl font-semibold leading-[28px] md:line-clamp-2">{title}</h2>
    <p className="mt-4 line-clamp-1 text-base font-normal leading-[22px] text-gray-100 md:line-clamp-2">
      {description}
    </p>
    <div className="mt-auto flex items-center">
      <p className="ml text-xs font-medium leading-4 after:ml-1 after:content-['•']">{date}</p>
      <p className="ml-1 text-xs font-medium leading-4">{author}</p>
      <ChevronRight className="fill-brand-80 ml-auto h-5 w-5 justify-self-end transition-transform group-hover:translate-x-1.5" />
    </div>
  </div>
);

export default AnnounceCard;
