import {Badge} from "@xipkg/badge";
import {Button} from "@xipkg/button";
import {CrossCircle} from "@xipkg/icons";
import {UserBadgePropsT} from "./types";

export const UserBadge = ({
                       name,
                       role,
                       bgColorMain,
                       bgColorSecondary,
                       handleRoleDelete,
                   }: UserBadgePropsT) => (
    <li>
        <Badge className={`text-xs ${bgColorSecondary}`}>
            <span className={`mr-2 size-3 rounded-full ${bgColorMain}`} />
            {name.slice(0, 1).toUpperCase() + name.slice(1)}
            <Button
                className="focus:bg-red-80 hover:bg-red-80 group ml-3 h-min rounded-full bg-transparent p-0"
                onClick={() => handleRoleDelete(role)}
            >
                <CrossCircle className="group-hover:fill-gray-0 group-focus:fill-gray-0 !size-3" />
            </Button>
        </Badge>
    </li>
);