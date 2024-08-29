import { ILazyParagraphProps } from '../lazy/paragraph.type';

export interface IFormFieldProps {
  placeholder?: string;
  type: string;
  hook?: any;
  error?: string;
  label?: ILazyParagraphProps;
}
