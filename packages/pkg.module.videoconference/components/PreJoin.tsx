import type {LocalAudioTrack, LocalVideoTrack} from 'livekit-client';
import {facingModeFromLocalTrack, Track} from 'livekit-client';
import {LocalUserChoices} from '@livekit/components-core';
import {
    ParticipantPlaceholder,
    TrackToggle,
    usePersistentUserChoices,
    usePreviewTracks,
} from '@livekit/components-react';
import React from 'react';

export interface PreJoinProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onError'> {
    onSubmit?: (values: LocalUserChoices) => void;
    onValidate?: (values: LocalUserChoices) => boolean;
    onError?: (error: Error) => void;
    defaults?: Partial<LocalUserChoices>;
    debug?: boolean;
    joinLabel?: string;
    micLabel?: string;
    defaultUserChoices?: any
    camLabel?: string;
    userLabel?: string;
    persistUserChoices?: boolean;
}

export function PreJoin({
                            defaults = {},
                            onValidate,
                            onSubmit,
                            onError,
                            debug,
                            joinLabel = 'Join Room',
                            micLabel,
                            camLabel,
                            userLabel = 'Username',
                            persistUserChoices = true,
                            defaultUserChoices,
                            ...htmlProps
                        }: PreJoinProps) {
    const [userChoices, setUserChoices] = React.useState(defaultUserChoices);

    const partialDefaults: Partial<LocalUserChoices> = {
        ...(defaults.audioDeviceId !== undefined && {audioDeviceId: defaults.audioDeviceId}),
        ...(defaults.videoDeviceId !== undefined && {videoDeviceId: defaults.videoDeviceId}),
        ...(defaults.audioEnabled !== undefined && {audioEnabled: defaults.audioEnabled}),
        ...(defaults.videoEnabled !== undefined && {videoEnabled: defaults.videoEnabled}),
        ...(defaults.username !== undefined && {username: defaults.username}),
    };

    const {
        userChoices: initialUserChoices,
        saveAudioInputDeviceId,
        saveAudioInputEnabled,
        saveVideoInputDeviceId,
        saveVideoInputEnabled,
        saveUsername,
    } = usePersistentUserChoices({
        defaults: partialDefaults,
        preventSave: !persistUserChoices,
        preventLoad: !persistUserChoices,
    });

    const [audioEnabled, setAudioEnabled] = React.useState<boolean>(initialUserChoices.audioEnabled);
    const [videoEnabled, setVideoEnabled] = React.useState<boolean>(initialUserChoices.videoEnabled);
    const [audioDeviceId, setAudioDeviceId] = React.useState<string>(
        initialUserChoices.audioDeviceId,
    );
    const [videoDeviceId, setVideoDeviceId] = React.useState<string>(
        initialUserChoices.videoDeviceId,
    );
    const [username, setUsername] = React.useState(initialUserChoices.username);

    // Save user choices to persistent storage.
    React.useEffect(() => {
        saveAudioInputEnabled(audioEnabled);
    }, [audioEnabled, saveAudioInputEnabled]);
    React.useEffect(() => {
        saveVideoInputEnabled(videoEnabled);
    }, [videoEnabled, saveVideoInputEnabled]);
    React.useEffect(() => {
        saveAudioInputDeviceId(audioDeviceId);
    }, [audioDeviceId, saveAudioInputDeviceId]);
    React.useEffect(() => {
        saveVideoInputDeviceId(videoDeviceId);
    }, [videoDeviceId, saveVideoInputDeviceId]);
    React.useEffect(() => {
        saveUsername(username);
    }, [username, saveUsername]);

    const tracks = usePreviewTracks(
        {
            audio: audioEnabled ? {deviceId: initialUserChoices.audioDeviceId} : false,
            video: videoEnabled ? {deviceId: initialUserChoices.videoDeviceId} : false,
        },
        onError,
    );

    const videoEl = React.useRef(null);

    const videoTrack = React.useMemo(
        () => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
        [tracks],
    );

    const facingMode = React.useMemo(() => {
        if (videoTrack) {
            const {facingMode} = facingModeFromLocalTrack(videoTrack);
            return facingMode;
        }
        return 'undefined';
    }, [videoTrack]);

    const audioTrack = React.useMemo(
        () => tracks?.filter((track) => track.kind === Track.Kind.Audio)[0] as LocalAudioTrack,
        [tracks],
    );

    React.useEffect(() => {
        if (videoEl.current && videoTrack) {
            videoTrack.unmute();
            videoTrack.attach(videoEl.current);
        }

        return () => {
            videoTrack?.detach();
        };
    }, [videoTrack]);

    const [isValid, setIsValid] = React.useState<boolean>();

    const handleValidation = React.useCallback(
        (values: LocalUserChoices) => {
            if (typeof onValidate === 'function') {
                return onValidate(values);
            }
            return values.username !== '';
        },
        [onValidate],
    );

    React.useEffect(() => {
        const newUserChoices = {
            username,
            videoEnabled,
            videoDeviceId,
            audioEnabled,
            audioDeviceId,
        };
        setUserChoices(newUserChoices);
        setIsValid(handleValidation(newUserChoices as LocalUserChoices));
    }, [username, videoEnabled, handleValidation, audioEnabled, audioDeviceId, videoDeviceId]);

    return (
        <div className="my-10" {...htmlProps}>
            <h2 className="font-sans text-2xl mb-4 font-medium">Присоединиться к конференции</h2>
            <div className="relative">
                {videoTrack && videoEnabled && (
                    <div>
                        <video
                            className="rounded-[16px]"
                            ref={videoEl}
                            width="737"
                            height="476"
                            data-lk-facing-mode={facingMode}
                        />
                    </div>
                )}
                {(!videoTrack || !videoEnabled) && (
                    <div className="bg-gray-100 w-[737px] h-[476px] items-center rounded-[16px] flex justify-center">
                        <ParticipantPlaceholder/>
                    </div>
                )}

                <div className="absolute bottom-5 left-5">
                    <div className="flex gap-1 bg-gray-100 rounded-[24px] p-1">
                        <div
                            className={`border-4 ${audioEnabled && audioTrack ? 'border-green-60' : 'border-red-60'} rounded-full p-4`}
                        >
                            <TrackToggle
                                className="bg-transparent text-white scale-125"
                                initialState={audioEnabled}
                                source={Track.Source.Microphone}
                                onChange={(enabled) => setAudioEnabled(enabled)}
                            >
                                {micLabel}
                            </TrackToggle>
                        </div>
                        <div
                            className={`border-4 ${videoEnabled ? 'border-green-60' : 'border-red-60'} text-center rounded-full p-4`}
                        >
                            <TrackToggle
                                showIcon
                                className="bg-transparent text-white scale-125"
                                initialState={videoEnabled}
                                source={Track.Source.Camera}
                                onChange={(enabled) => setVideoEnabled(enabled)}
                            >
                                {camLabel}
                            </TrackToggle>
                        </div>
                    </div>
                </div>
            </div>
            {debug && (
                <>
                    <strong>User Choices:</strong>
                    <ul className="lk-list" style={{overflow: 'hidden', maxWidth: '15rem'}}>
                        <li>Username: {`${userChoices.username}`}</li>
                        <li>Video Enabled: {`${userChoices.videoEnabled}`}</li>
                        <li>Audio Enabled: {`${userChoices.audioEnabled}`}</li>
                        <li>Video Device: {`${userChoices.videoDeviceId}`}</li>
                        <li>Audio Device: {`${userChoices.audioDeviceId}`}</li>
                    </ul>
                </>
            )}
        </div>
    );
}
