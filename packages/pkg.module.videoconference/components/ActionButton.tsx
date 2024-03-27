import {Button} from "@xipkg/button";

export interface IActionButton {
    connect: boolean,
    setConnect: (arg: boolean) => void
}

export function ActionButton({connect, setConnect}: IActionButton) {
    return (
        <Button className="lk-button" onClick={() => setConnect(!connect)}>
            {connect ? 'Disconnect' : 'Connect'}
        </Button>
    )
}