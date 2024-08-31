import { IButtonProps } from '@/@type/props/component/button/button.props';
import { LazyParagraph } from '../lazy/paragraph.component';

export const Button = ({
  id,
  label,
  onClick,
  type,
  children,
}: IButtonProps) => {
  return (
    <button
      id={id}
      type={type || 'button'}
      onClick={onClick}
      className=" ease-in-out duration-200 bg-[#76ff02] text-black hover:bg-emerald-200 hover:text-black text-center p-2 rounded-lg"
    >
      {children ? (
        children
      ) : (
        <LazyParagraph id={id || ''} defaultValue={label} />
      )}
    </button>
  );
};
