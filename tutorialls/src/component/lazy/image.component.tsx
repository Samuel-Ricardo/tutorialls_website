'use client';

import { useImage } from '@/hook/cms/get/image.hook';
import Image, { ImageProps } from 'next/image';

export const LazyImage = (props: ImageProps) => {
  const { data } = useImage({ id: props.id || '' });
  return <Image {...props} src={data || props.src} alt={props.id || 'image'} />;
};
