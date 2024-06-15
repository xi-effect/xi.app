// Временные типы для Пользователя и для пропсов Карточки пользователя
// export type UserT = {
//     name: string;
//     nickname: string;
//     roles: UserRoleT[];
//     isOwner: boolean;
// };

import React from 'react';

export type UserT = {
    id: number;
    display_name: string;
    username: string
    isOwner: boolean
};

// export type UserCardPropsT = UserT & {
//     user: UserT;
//     handleUserDelete: (userToDelete: UserT) => void;
//     handleRoleAdd: (userToUpdate: UserT, roleToAdd: UserRoleT) => void;
//     handleRoleDelete: (userToUpdate: UserT, roleToDelete: UserRoleT) => void;
// };

export type UserCardPropsT = UserT & {
    user: UserT;
    handleUserDelete: (userToDelete: UserT) => void;
    handleRoleAdd: (userToUpdate: UserT, roleToAdd: UserRoleT) => void;
    handleRoleDelete: (userToUpdate: UserT, roleToDelete: UserRoleT) => void;
};

// Временные типы для Роли пользователя и для пропсов Бейджа пользователя
export type UserRoleT = {
    name: string;
    bgColorMain: string;
    bgColorSecondary: string;
};

export type UserBadgePropsT = UserRoleT & {
    role: UserRoleT;
    handleRoleDelete: (roleToDelete: UserRoleT) => void;
};

// Ответ на событие запрос списка участников

export type ParticipantT = {
    created_at: string
    id: number
    is_owner: boolean
    user_id: number
};

export type ParticipantsList = ParticipantT[];
