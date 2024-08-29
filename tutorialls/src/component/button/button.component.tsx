import { IButtonProps } from '@/@type/props/component/button/button.props';
import { LazyParagraph } from '../lazy/paragraph.component';

export const Button = ({ id, label, onClick }: IButtonProps) => {
  return (
    <button id={id} onClick={onClick} className="bg-[#76ff02] text-black">
      <LazyParagraph id={id} defaultValue={label} />
    </button>
  );
};
