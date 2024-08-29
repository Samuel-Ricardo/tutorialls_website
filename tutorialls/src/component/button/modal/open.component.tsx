import { IOpenModalButtonProps } from '@/@type/props/component/button/modal/open.props';
import { Button } from '../button.component';

export const OpenModalButton = ({
  id,
  label,
  modal,
}: IOpenModalButtonProps) => {
  return <Button id={id} label={label} onClick={onClick} />;
};
