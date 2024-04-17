import React, { useState } from 'react';
import AnnounceCard from './components/AnnounceCard';
import NoContent from './components/NoContent';
import Header from './components/Header';

export const Announces = () => {
  // Временный набор объявлений. Переделать логику под стейт менеджер
  const announcements = [
    {
      title:
        'Порядок проверки исправности. Сроков первичных средств пожаротушения. Использование инженерных защитных сооружений для защиты работающих и населения в черезвычайных ситуациях. Использование индивидуальных средств защиты.',
      description:
        'Выполнить тест в тетради. Результат — фотография. Тест прикрепил в задании.Выполнить тест в тетради… Выполнить тест в тетради. Результат — фотография. Тест прикрепил в задании.Выполнить тест в тетради…',
      date: '19 мая 2022',
      author: 'Юшкевич О.А.',
    },
    {
      title: 'Объявление 2',
      description: 'Описание объявления 2',
      date: '2 января 2022',
      author: 'Автор 2',
    },
    {
      title: 'Объявление 3',
      description: 'Описание объявления 3',
      date: '3 января 2022',
      author: 'Автор 3',
    },
    {
      title: 'Объявление 4',
      description: 'Описание объявления 4',
      date: '4 января 2022',
      author: 'Автор 4',
    },
    {
      title: 'Объявление 5',
      description: 'Описание объявления 5',
      date: '5 января 2022',
      author: 'Автор 5',
    },
    {
      title: 'Объявление 6',
      description: 'Описание объявления 6',
      date: '6 января 2022',
      author: 'Автор 6',
    },
    {
      title: 'Объявление 7',
      description: 'Описание объявления 7',
      date: '7 января 2022',
      author: 'Автор 7',
    },
  ];

  const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements);

  const filterAnnouncements = (searchValue: string) => {
    if (!searchValue) {
      setFilteredAnnouncements(announcements);
    } else {
      const filtered = announcements.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          announcement.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          announcement.author.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredAnnouncements(filtered);
    }
  };

  return (
    <div className="h-full p-8">
      <Header onSearch={filterAnnouncements} />
      {filteredAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredAnnouncements.map((announcement, index) => (
            <AnnounceCard
              key={index}
              title={announcement.title}
              description={announcement.description}
              date={announcement.date}
              author={announcement.author}
            />
          ))}
        </div>
      ) : (
        <NoContent />
      )}
    </div>
  );
};
