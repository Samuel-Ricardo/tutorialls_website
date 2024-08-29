export interface IButtonProps {
  id: string;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
