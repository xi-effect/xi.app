import { Track } from 'livekit-client';
import { Conference, Microphone, Screenshare } from '@xipkg/icons';
import { ActionButton } from '../components/ActionButton';

export function getSourceIcon(source: Track.Source, enabled: boolean) {
    switch (source) {
        case Track.Source.Microphone:
            return <ActionButton icon={<Microphone className="fill-red-0" />} enable={enabled} />;
        case Track.Source.Camera:
            return <ActionButton icon={<Conference className="fill-red-0" />} enable={enabled} />;
        case Track.Source.ScreenShare:
            return <ActionButton icon={<Screenshare className="fill-red-0" />} enable={enabled} />;
        default:
            return undefined;
    }
}
