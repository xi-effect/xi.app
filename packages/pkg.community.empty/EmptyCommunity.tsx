'use client';

import React, { useState } from 'react';
import CommunityNotFound from './components/CommunityNotFound';
import CommunityCreate from './components/CommunityCreate';
import CommunityInvite from './components/CommunityInvite';

export type StageType = 'notFound' | 'create' | 'join';

type RenderContentProps = {
  stage: StageType;
  setStage: (stage: React.SetStateAction<StageType>) => void;
  tab: number;
  setTab: (tab: React.SetStateAction<number>) => void;
};

const RenderContent = ({ stage, setStage, tab, setTab }: RenderContentProps) => {
  const stages = {
    create: <CommunityCreate setStage={setStage} setTab={setTab} />,
    join: <CommunityInvite setStage={setStage} setTab={setTab} />,
    notFound: <CommunityNotFound setStage={setStage} tab={tab} setTab={setTab} />,
  };

  return stages[stage] || stages.notFound;
};

export const EmptyCommunity = () => {
  const [stage, setStage] = useState<StageType>('notFound');
  const [tab, setTab] = React.useState(0);

  return <RenderContent stage={stage} setStage={setStage} tab={tab} setTab={setTab} />;
};
