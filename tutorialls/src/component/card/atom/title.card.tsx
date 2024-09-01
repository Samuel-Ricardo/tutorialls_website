export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row p-2 text-[#76ff02] text-3xl font-bold border-b-2 border-[#76ff02] capitalize justify-between">
      {children}
    </div>
  );
};
