const ContentLoader = () => {
  const commonCss = `h-[8px] bg-neutral-700 rounded`;
  return (
    <div className="animate-pulse h-[200px] bg-neutral-800 my-4">
      <div className="flex flex-col p-4 justify-between h-full">
        <div>
          <div className="h-[13px] w-[250px] bg-neutral-700 rounded"></div>
          <div className=" mt-2 h-[10px] w-[100px] bg-neutral-700 rounded"></div>
          <div></div>
        </div>
        <div className="space-y-2">
          <div className={commonCss}></div>
          <div className={commonCss}></div>
          <div className={commonCss}></div>
          <div className={commonCss}></div>
          <div className={commonCss}></div>
          <div className={commonCss}></div>
        </div>
      </div>
    </div>
  );
};

export default ContentLoader;
