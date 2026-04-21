import React from "react";

const HeaderComponent = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="w-full bg-white px-8 py-5 flex items-center justify-between">

      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-2xl"
        >
          ☰
        </button>

        <div>
          <h2 className="text-[26px] font-semibold text-black">
            Ciao, Dr. Luca!
          </h2>
          <p className="text-[14px] text-[#8A94A6] mt-1">
            Inizia la giornata con un nuovo corso!
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-1">
        <div className="relative flex items-center">
          <div className="absolute inset-0 bg-blue-600 h-[3.8rem] rounded-full translate-x-6 -translate-y-1"></div>

          <div className="relative flex items-center w-[16rem]  bg-[#F4B400] rounded-full px-8 py-2 shadow-md">
            <span className="text-[20px] font-bold text-black">
              345
            </span>

            <div className="ml-3 w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              🪙
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default HeaderComponent;