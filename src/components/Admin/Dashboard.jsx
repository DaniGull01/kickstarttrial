import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout";
import InteractiveProgress from "./ProgressBar";
import ProjectList from "./ProjectList";

const Dashboard = () => {
  const [progress, setProgress] = useState(650); 
  const maxXP = 800;

  const percentage = (progress / maxXP) * 100;


  

  return (
    <DefaultLayout>
        <InteractiveProgress />
    <div className="flex gap-6">

      <div className="flex-1">

        

       <ProjectList />
      </div>

      <div className="w-[350px] bg-[#0E2A47] rounded-2xl p-6 text-white">
  <h2 className="text-center text-2xl tracking-widest border border-yellow-400 rounded-xl py-2 mb-6">
    LEADERBOARD
  </h2>

  {[1, 2, 3, 4].map((rank) => {
    const isTop = rank === 1;

    return (
      <div
        key={rank}
        className={`
          rounded-xl p-3 flex justify-between items-center mb-4
          transition-all duration-300 ease-out cursor-pointer
          hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1
          active:scale-[0.98]

          ${
            isTop
              ? "bg-yellow-400 text-black shadow-lg"
              : "bg-white text-black hover:bg-gray-100"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span
            className={`
              w-6 h-6 flex items-center justify-center border rounded-full text-sm
              transition-all duration-300
              ${isTop ? "border-black font-bold" : ""}
            `}
          >
            {rank}
          </span>

          <img
            src="https://i.pravatar.cc/40"
            className={`
              w-8 h-8 rounded-full border
              transition-transform duration-300
              group-hover:rotate-6
            `}
            alt=""
          />

          <div>
            <p className={`font-semibold text-sm ${isTop ? "text-black" : ""}`}>
              Giulia Verdini
            </p>
            <p className={`${isTop ? "text-black" : "text-yellow-500"} text-xs`}>
              ★★★★★
            </p>
          </div>
        </div>

        <span
          className={`
            text-sm transition-all duration-300
            ${isTop ? "text-black font-semibold" : "text-gray-600"}
          `}
        >
          {3000 - rank * 200}
        </span>
      </div>
    );
  })}
</div>
    </div>
    </DefaultLayout>
  );
};

export default Dashboard;