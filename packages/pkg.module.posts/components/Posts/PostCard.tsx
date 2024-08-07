import { ChevronRight } from '@xipkg/icons';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useMainSt } from 'pkg.stores';

type PostCardProps = {
  title: string;
  description: string;
  date: string;
  author: string;
  id: string;
};

const PostCard = ({
  title = 'Заголовок объявления',
  description = 'Текст объявления',
  date = '1 января 1970',
  author = 'Автор',
  id='001',
}: PostCardProps) => {
  const pathname = usePathname();
  const communityId = useMainSt((state) => state.communityMeta.id);
  const [, channelId] = pathname.match(/\/communities\/\d+(?:\/channels\/(\d+)\/(\w+)|\/(\w+))/);

  return (
    <Link
      href={`/communities/${communityId}/channels/${channelId}/posts/${id}`}
      className="border-gray-80 hover:bg-gray-5 group flex h-56 cursor-pointer flex-col rounded-2xl border p-6"
    >
      <h2 className="line-clamp-1 text-xl font-semibold leading-[28px] md:line-clamp-2">{title}</h2>
      <p className="mt-4 line-clamp-1 text-base font-normal leading-[22px] text-gray-100 md:line-clamp-2">
        {description}
      </p>
      <div className="mt-auto flex items-center">
        <p className="ml text-xs font-medium leading-4 after:ml-1 after:content-['•']">{date}</p>
        <p className="ml-1 text-xs font-medium leading-4">{author}</p>
        <ChevronRight className="fill-brand-80 ml-auto h-5 w-5 justify-self-end transition-transform group-hover:translate-x-1.5" />
      </div>
    </Link>
  );
};

export default PostCard;
