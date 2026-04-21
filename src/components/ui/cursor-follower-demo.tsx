import { Component } from "@/components/ui/cursor-follower";

const CursorFollowerDemo = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 p-8 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="mb-8 text-4xl font-bold">Smooth Follower Demo</h1>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row">
        <a
          href="#"
          className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md transition-colors duration-200 hover:bg-blue-600"
        >
          Hover over me
        </a>
      </div>

      <Component />
    </div>
  );
};

export { CursorFollowerDemo };
