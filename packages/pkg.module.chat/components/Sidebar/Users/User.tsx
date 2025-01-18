import React from 'react';
import { UsersSkelet } from './UsersSkelet';
import { UserCard } from './UserCard';

type UsersItemT = {
  id: number;
  name: string;
  username: string;
  roleT: string;
};

export const mocksMessages: UsersItemT[] = [
  {
    id: 1,
    name: 'Анна Иванова',
    username: '@ivanova.a',
    roleT: 'Учитель',
  },
  {
    id: 2,
    name: 'Иван Ковыляев',
    username: '@ikovylyaev',
    roleT: 'Учитель',
  },
  {
    id: 3,
    name: 'Сергей Антипин',
    username: '@antipin',
    roleT: 'Студент',
  },
  {
    id: 4,
    name: 'Денис Спиридонов',
    username: '@dspiridonov',
    roleT: 'Студент',
  },
  {
    id: 5,
    name: 'Ксения Любина',
    username: '@lybina',
    roleT: 'Студент',
  },
  {
    id: 6,
    name: 'Даниил Сергеев',
    username: '@sergeev.d',
    roleT: 'Студент',
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
        (acc, user) => {
          if (!acc[user.roleT]) {
            acc[user.roleT] = [];
          }
          acc[user.roleT].push(user);
          return acc;
        },
        {} as Record<string, UsersItemT[]>,
      ),
    [mocksMessages],
  );

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupUsers).map(([role, users]) => (
        <div key={role} className="flex flex-col gap-2">
          <span className="text-m-base font-semibold">{role}</span>
          {loading ? (
            <UsersSkelet />
          ) : (
            users.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <UserCard id={user.id} name={user.name} username={user.username} />
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};
