import React from 'react';
import { UsersSkelet } from './UsersSkelet';
import { UserProfileCard } from './UserProfileCard';

type UsersItemT = {
  id: number;
  name: string;
  mail: string;
  roleT: 'teacher' | 'student';
};

export const mocksMessages: UsersItemT[] = [
  {
    id: 1,
    name: 'Анна Иванова',
    mail: '@ivanova.a',
    roleT: 'teacher',
  },
  {
    id: 2,
    name: 'Иван Ковыляев',
    mail: '@ikovylyaev',
    roleT: 'teacher',
  },
  {
    id: 3,
    name: 'Сергей Антипин',
    mail: '@antipin',
    roleT: 'student',
  },
  {
    id: 4,
    name: 'Денис Спиридонов',
    mail: '@dspiridonov',
    roleT: 'student',
  },
  {
    id: 5,
    name: 'Ксения Любина',
    mail: '@lybina',
    roleT: 'student',
  },
  {
    id: 6,
    name: 'Даниил Сергеев',
    mail: '@sergeev.d',
    roleT: 'student',
  },
];

export const User = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const groupUsers = React.useMemo(
    () =>
      mocksMessages.reduce(
        (acc, user) => ({
          ...acc,
          [user.roleT]: [...acc[user.roleT], user],
        }),
        {
          teacher: [],
          student: [],
        } as { teacher: UsersItemT[]; student: UsersItemT[] },
      ),
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupUsers).map(([role, users]) => (
        <div key={role} className="flex flex-col gap-2">
          <span className="text-m-base font-semibold">
            {role === 'teacher' ? 'Преподователи' : 'Студенты'}
          </span>
          {loading ? (
            <UsersSkelet />
          ) : (
            users.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <UserProfileCard id={user.id} name={user.name} mail={user.mail} />
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};
