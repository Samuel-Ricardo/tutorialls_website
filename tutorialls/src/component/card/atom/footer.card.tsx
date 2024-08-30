export const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="flex flex-row justify-between items-center mt-8 text-white px-4 border-l-2 border-[#76ff02] ease-in-out duration-300 ">
      @{children}
    </p>
  );
};
