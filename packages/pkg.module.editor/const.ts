import { makeNodeId } from './plugins/withNodeId';

export const mockInitialValue = [
  {
    id: makeNodeId(),
    children: [
      {
        text: 'In music theory, an interval is a difference in pitch between two sounds. An interval may be described as horizontal, linear, or melodic if it refers to successively sounding tones, such as two adjacent pitches in a melody, and vertical or harmonic if it pertains to simultaneously sounding tones, such as in a chord.',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '0. Perfect unison',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: 'Major sixth',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '6. Tritone',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '3. Minor third',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '2. Major second',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '1. Minor second',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '10. Minor seventh',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '4. Major third',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '7. Perfect fifth',
      },
    ],
  },
];
