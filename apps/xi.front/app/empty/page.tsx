'use client';

import React, { useState } from 'react';
import CommunityNotFound from './stages/CommunityNotFound';
import CommunityCreate from './stages/CommunityCreate';
import CommunityInvite from './stages/CommunityInvite';

type StageType = 'notFound' | 'create' | 'join';

type RenderContentProps = {
  stage: StageType;
  setStage: (stage: StageType) => void;
};

const RenderContent = ({ stage, setStage }: RenderContentProps) => {
  switch (stage) {
    case 'create':
      return <CommunityCreate setStage={setStage} />;
    case 'join':
      return <CommunityInvite setStage={setStage} />;
    default:
      return <CommunityNotFound setStage={setStage} />;
  }
};

export default function EmptyCommunity() {
  const [stage, setStage] = useState<StageType>('notFound');

  return <RenderContent stage={stage} setStage={setStage} />;
}
