import { IButtonProps } from '@/@type/props/component/button/button.props';
import { LazyParagraph } from '../lazy/paragraph.component';

export const Button = ({ id, label, onClick, type }: IButtonProps) => {
  return (
    <button
      id={id}
      type={type || 'button'}
      onClick={onClick}
      className="bg-[#76ff02] text-black hover:bg-emerald-200 hover:text-black text-center p-2 rounded-lg"
    >
      <LazyParagraph id={id} defaultValue={label} />
    </button>
  );
};
