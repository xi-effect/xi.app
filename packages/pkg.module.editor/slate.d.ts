import { BaseElement as Base } from 'slate';

declare module 'slate' {
  export interface BaseElement extends Base {
    type?: string;
  }
}
