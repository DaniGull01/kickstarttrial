import React, { useState, useRef } from "react";

const InteractiveProgress = () => {
  const maxXP = 800;
  const minXP = 0;

  const [progress, setProgress] = useState(650);
  const barRef = useRef(null);

  const percentage = (progress / maxXP) * 100;

  const handleClick = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = clickX / rect.width;
    const newXP = Math.round(newPercent * maxXP);

    setProgress(Math.min(maxXP, Math.max(minXP, newXP)));
  };

  const handleDrag = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    const move = (clientX) => {
      const x = clientX - rect.left;
      let percent = x / rect.width;
      percent = Math.max(0, Math.min(1, percent));
      setProgress(Math.round(percent * maxXP));
    };

    move(e.clientX);

    const onMove = (e) => move(e.clientX);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="bg-gradient-to-r from-[#bcd2ea] mb-12 to-[#1e66c1] rounded-2xl p-6 flex items-center">

      <img
        src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
        className="w-20"
        alt=""
      />

      <div className="flex-1 px-6 relative">

        <div
          ref={barRef}
          onClick={handleClick}
          className="w-full h-6 bg-blue-200 rounded-full relative cursor-pointer"
        >
          <div
            className="h-full bg-yellow-400 rounded-full relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#ffffff33,#ffffff33_10px,#00000000_10px,#00000000_20px)]"></div>
          </div>

          <div
            onMouseDown={handleDrag}
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full cursor-grab"
            style={{ left: `${percentage}%`, transform: "translate(-50%, -50%)" }}
          />
        </div>

        <div className="absolute left-0 -top-6 text-xs bg-white px-2 py-1 rounded-full">
          0 XP
        </div>

        <div
          className="absolute -top-10 text-xs bg-white px-2 py-1 rounded-full"
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        >
          {progress} XP
        </div>

        <div className="absolute right-0 -top-6 text-xs text-gray-700">
          {maxXP} XP
        </div>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3774/3774310.png"
        className="w-20"
        alt=""
      />
    </div>
  );
};

export default InteractiveProgress;