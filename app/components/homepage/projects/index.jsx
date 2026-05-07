'use client';

import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { useEffect, useState } from 'react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const projectElements = document.querySelectorAll('.sticky-card');
      let currentActive = 0;

      projectElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentActive = index;
        }
      });

      setActiveProject(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveImage(0);
  }, [activeProject]);

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Project Cards */}
          <div className="flex flex-col gap-6">
            {projectsData.slice(0, 4).map((project, index) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={index}
                className="sticky-card w-full mx-auto max-w-2xl sticky"
              >
                <div className={`box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s] ${activeProject === index ? 'transform scale-105 shadow-[0_0_40px_0_rgba(0,0,0,0.5)]' : ''}`}>
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Project Images */}
          <div className="hidden lg:flex flex-col justify-center items-center sticky top-32 h-fit gap-6">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_0_40px_0_rgba(0,0,0,0.25)] transition-all duration-[0.6s] animate-fade-in w-full max-w-xl">
              <img
                src={projectsData[activeProject]?.images?.[activeImage] ?? '/image/placeholder.png'}
                alt={`${projectsData[activeProject]?.name} - Image ${activeImage + 1}`}
                className="w-full h-[520px] object-cover rounded-3xl transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/image/placeholder.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
              {projectsData[activeProject]?.images?.map((image, imgIndex) => (
                <button
                  key={`${activeProject}-${imgIndex}`}
                  type="button"
                  onClick={() => setActiveImage(imgIndex)}
                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${activeImage === imgIndex ? 'border-[#16f2b3] shadow-[0_0_15px_-2px_rgba(22,242,179,0.5)]' : 'border-transparent hover:border-white/30'}`}
                >
                  <img
                    src={image}
                    alt={`${projectsData[activeProject]?.name} thumbnail ${imgIndex + 1}`}
                    className="w-full h-28 object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/image/placeholder.png';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;