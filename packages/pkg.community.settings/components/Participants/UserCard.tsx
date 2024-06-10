import {Avatar, AvatarFallback, AvatarImage} from "@xipkg/avatar";
import {Close, Crown, Plus} from "@xipkg/icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@xipkg/dropdown";
import {Button} from "@xipkg/button";
import {UserCardPropsT} from "./types";
import {UserBadge} from "./UserBadge";

export const UserCard = ({
                      user,
                      name,
                      roles,
                      isOwner,
                      nickname,
                      handleRoleAdd,
                      handleUserDelete,
                      handleRoleDelete,
                  }: UserCardPropsT) => {
    // Временный список ролей
    const rolesTemplate = [
        { name: 'Администратор', bgColorMain: 'bg-violet-100', bgColorSecondary: 'bg-violet-20' },
        { name: 'Преподаватель', bgColorMain: 'bg-brand-100', bgColorSecondary: 'bg-brand-0' },
        { name: 'Студент', bgColorMain: 'bg-green-100', bgColorSecondary: 'bg-green-0' },
        { name: 'Гость', bgColorMain: 'bg-red-100', bgColorSecondary: 'bg-red-0' },
        { name: '1', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
        { name: '2', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
    ];



    return (
        <li className="border-gray-30 flex rounded-lg border p-4 md:items-center">
            <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                <div className="flex items-center self-start">
                    <Avatar size="s">
                        <AvatarImage
                            src="https://auth.xieffect.ru/api/users/3/avatar.webp"
                            imageProps={{
                                src: 'https://auth.xieffect.ru/api/users/3/avatar.webp',
                                alt: '@shadcn',
                            }}
                            alt="@shadcn"
                        />
                        <AvatarFallback size="s">CN</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                        <p className="text-nowrap text-base font-medium text-gray-100">{name}</p>
                        <p className="text-gray-60 text-nowrap text-xs font-normal">{nickname}</p>
                    </div>
                    {isOwner && <Crown className="!size-3 self-start" />}
                </div>
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {roles.map((role, index) => (
                        <UserBadge
                            role={role}
                            key={index}
                            name={role.name}
                            bgColorMain={role.bgColorMain}
                            bgColorSecondary={role.bgColorSecondary}
                            handleRoleDelete={() => handleRoleDelete(user, role)}
                        />
                    ))}
                    <li className="size-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="hover:bg-brand-80 group !size-6 bg-transparent p-1">
                                    <Plus className="group-hover:fill-gray-0 group-focus:fill-gray-0 size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 p-3">
                                {rolesTemplate.map((roleTemplate, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        className="hover:bg-gray-10 rounded-lg"
                                        onClick={() => handleRoleAdd(user, roleTemplate)}
                                    >
                                        <span className={`bg mr-2 size-3 rounded-full ${roleTemplate.bgColorMain}`} />
                                        <p>{roleTemplate.name}</p>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                </ul>
            </div>
            <Button
                className="focus:bg-red-80 hover:bg-red-80 group ml-auto h-6 w-6 bg-transparent p-1"
                onClick={() => handleUserDelete(user)}
            >
                <Close className="group-hover:fill-gray-0 group-focus:fill-gray-0 size-4" />
            </Button>
        </li>
    );
};