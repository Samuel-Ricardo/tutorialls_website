import { IoCloseOutline } from 'react-icons/io5';

export const Modal = ({
  isOpen,
  close,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={close}
      className="fixed flex justify-center items-center h-screen w-screen bg-[#76ff0208] backdrop-blur-lg top-0 left-0"
    >
      <IoCloseOutline
        onClick={close}
        className="text-[#76ff02] cursor-pointer hover:scale-150 text-4xl ease-in-out duration-300 fixed top-10 right-10"
      />

      <div
        onClick={e => e.stopPropagation()}
        className="bg-black/90 h-fit w-fit p-8 rounded-lg"
      >
        {children}
      </div>
    </div>
  );
};
