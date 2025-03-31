const Content = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <main
      className={`flex flex-col p-6 overflow-y-auto transition-transform transform 
        ${isSidebarOpen ? "md:translate-x-60" : "md:translate-x-40"}
        `}
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Trending Discussions
      </h2>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div
            key={item}
            className="p-4 shadow-md cursor-pointer border-b-[0.1px] border-neutral-800"
          >
            <h3 className="text-lg font-semibold">Trending Topic {item}</h3>
            <p className="">This is a summary of the trending discussion...</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Content;
