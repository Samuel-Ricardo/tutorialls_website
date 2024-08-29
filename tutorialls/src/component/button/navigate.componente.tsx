import { INavigateButtonProps } from '@/@type/props/component/button/navigate.props';
import Link from 'next/link';
import { LazyParagraph } from '../lazy/paragraph.component';

export const NavigateButton = ({ id, label, to }: INavigateButtonProps) => {
  return (
    <Link
      id={id}
      href={to}
      className="bg-[#76ff02] text-black hover:bg-emerald-400 hover:text-white text-center p-2 rounded-lg"
    >
      <LazyParagraph id={id} defaultValue={label} />
    </Link>
  );
};
