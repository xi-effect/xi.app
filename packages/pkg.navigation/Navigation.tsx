'use client';

export const Navigation = () => {
  console.log('Navigation');
  return (
    <div className="flex flex-col flex-wrap p-6 h-screen w-[350px]">
      <div className="flex flex-wrap w-full h-8 p-2"> Logo </div>
      <div className="flex flex-wrap w-full h-12 p-2 mt-8">
        <div className="flex h-8 w-8 bg-green-0"> A </div>
        <div className="ml-2"> Мое пространство </div>
      </div>
    </div>
  );
};
