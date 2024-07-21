import React from 'react';
import Breadcrumbs from '../Posts/Breadcrumbs';

type PostProps = {
  postTitle: string;
  postText: string | React.ReactNode;
  date: string;
  author: string;
};

// Временная логика отображения хлебных крошек
const shouldShowBreadcrumbs = true;

const breadcrumbs = [
  { title: 'МИПК И. Фёдорова', href: '/home' },
  { title: 'Объявления', href: '/announcements' },
  { title: 'Объявления', href: '/announcements' },
  { title: 'Объявления', href: '/announcements' },
];

export const Post = ({
  postTitle = 'Победа на чемпионате',
  postText = (
    <>
      <p>
        Учащиеся нашего колледжа, представители сборной Москвы в компетенции «Полиграфические
        технологии» блестяще справились с конкурсным заданием и завоевали два золота и два серебра:
      </p>
      <br />
      <ul>
        <li>🥇 Анастасия Моисеева (Школа № 763)</li>
        <li>🥈 Елизавета Куликова (Школа № 1577)</li>
        <li>🥇 Никита Рыбников (МИПК им. И. Фёдорова)</li>
        <li>🥈 Милена Поливанова (МИПК им. И. Фёдорова)</li>
      </ul>
      <br />

      <p>
        Техник-технолог в области полиграфии вовлечён во все этапы процесса печати, начиная с
        первоначального планирования и подготовки и заканчивая тиражированием издания. Он проверяет
        качество и выполняет завершающие операции после печати тиража.
      </p>
      <br />

      <p>
        Углублённое знание оборудования и используемых материалов важно для эффективного и
        экономичного производства продукции высокого качества для соблюдения требований заказчика и
        соответствию стандартам отрасли.
      </p>
      <br />

      <p>🏆Поздравляем!</p>
    </>
  ),
  date = '4 мая 2022',
  author = 'Юшкевич О.А.',
}: PostProps) => (
  <section className="p-4 sm:p-8">
    <div className="py-4 sm:py-8">
      <Breadcrumbs isVisible={shouldShowBreadcrumbs} breadcrumbs={breadcrumbs} />
      <h1 className="line-clamp-1 text-3xl font-semibold sm:inline-block md:line-clamp-2">
        {postTitle}
      </h1>
      <div className="mt-4 flex items-center">
        <p className="ml text-xs font-medium leading-4 after:ml-1 after:content-['•']">{date}</p>
        <p className="ml-1 text-xs font-medium leading-4">{author}</p>
      </div>
    </div>
    <div className="border-gray-80 rounded-2xl border p-6">
      <p className="mt-4 text-base font-normal leading-[22px] text-gray-100">{postText}</p>
    </div>
  </section>
);
