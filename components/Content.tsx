const Content = ({ isSidebarOpen }) => {
  return (
    <main
      className={`flex flex-col w-[47%] p-6 overflow-y-auto transition-transform transform ${
        isSidebarOpen ? "translate-x-60" : "translate-x-40"
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-center">Trending Discussions</h2>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="p-4 shadow-md cursor-pointer w-[100%] border-b-[0.1px] border-neutral-800"
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
