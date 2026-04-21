import React, { useEffect, useState } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchProjects = () => {
      const dummyData = [
        {
          id: 1,
          title: "Admin logica test 3",
          description: "Standard dummy text ever since the 1500s.",
        },
        {
          id: 2,
          title: "Admin logica test 4",
          description: "Lorem ipsum is simply dummy text.",
        },
        {
          id: 3,
          title: "Admin logica test 5",
          description: "This card is now accessible by scrolling down.",
        },
        {
          id: 4,
          title: "Admin logica test 6",
          description: "Keep scrolling to see more content.",
        },
        {
          id: 5,
          title: "Admin logica test 7",
          description: "More dummy content for scroll behavior.",
        },
      ];

      setTimeout(() => {
        setProjects(dummyData);
      }, 500);
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full">
      <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
        {projects.map((project, index) => {
          const isSelected = selectedId === project.id;

          return (
            <div
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              style={{
                animation: `fadeInUp 0.4s ease ${index * 80}ms both`,
              }}
              className={`
                cursor-pointer rounded-2xl p-4 flex items-start gap-3
                transition-all duration-300 ease-out
                transform hover:-translate-y-1 hover:shadow-lg

                ${
                  isSelected
                    ? "bg-blue-100 border-l-4 border-blue-600 scale-[1.02]"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className={`
                  w-10 h-10 rounded-full
                  transition-transform duration-300
                  ${isSelected ? "scale-110 rotate-3" : "group-hover:scale-105"}
                `}
              />

              <div>
                <h3
                  className={`
                    font-semibold text-sm transition-colors duration-300
                    ${isSelected ? "text-blue-700" : "text-blue-600"}
                  `}
                >
                  {project.title}
                </h3>

                <p className="text-gray-500 text-xs mt-1">
                  {project.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProjectList;