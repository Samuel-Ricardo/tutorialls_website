import { IFormFieldProps } from '@/@type/props/component/form/field.props';
import { LazyParagraph } from '@/component/lazy/paragraph.component';

export const FormField = ({
  hook,
  error,
  type,
  placeholder,
  label,
}: IFormFieldProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label className="text-[#76ff02]">
          <LazyParagraph id={label.id} defaultValue={label.defaultValue} />
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 rounded-lg"
        {...hook}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
};