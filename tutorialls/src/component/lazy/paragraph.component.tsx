'use client';

import { ILazyParagraphProps } from '@/@type/props/component/lazy/paragraph.type';
import { useParagraph } from '@/hook/cms/get/paragraph.hook';

export const LazyParagraph = ({ id, defaultValue }: ILazyParagraphProps) => {
  const { data } = useParagraph({ id });
  return <>{data ? data : defaultValue || ''}</>;
};
