// ProjectsPage.jsx
import React, { useState,useEffect,useMemo } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';

import { filterProjects } from './projectUtils';

import ProjectsPagination from './Projectpagination/Projectpagination';
import ProjectsTable from './Projecttable/Projecttable'
import useFetch from '../../hooks/useFetch';

const ProjectsPage = () => {
    const data  = [
        [1, 1, "Project Title 1", "Samantha Clarke", "View Details", "Editing",'', "Active"],
        [2, 1, "Project Title 2", "Jason Lee", "Approve/Request Changes", "Ready for Review",'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', "Active"],
        [3, 1, "Project Title 3", "Ava Brown", "View Details", "Published",'', "Completed"],
        [4, 1, "Project Title 4", "John Doe", "View Details", "Editing",'', "Active"],
        [5, 1, "Project Title 5", "Mary Johnson", "View Details", "Published",'', "Completed"],
        [6, 1, "Project Title 6", "Chris Green", "Approve/Request Changes", "Ready for Review",'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', "Active"],
        [7, 1, "Project Title 7", "Laura White", "View Details", "Editing",'', "Active"],
        [8, 1, "Project Title 8", "Robert Black", "View Details", "Published",'', "Completed"],
        [9, 1, "Project Title 9", "Emily Blue", "Approve/Request Changes", "Ready for Review", 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',"Active"],
        [10, 1, "Project Title 10", "Michael Brown", "View Details", "Editing", '',"Active"],
      ];
      const loading = false
      const error = false
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [queryParams, setQueryParams] = useState({ limit: 20, skip: 0 });
    const [displayedProjects, setDisplayedProjects] = useState(data);

    // useEffect(() => {
    //   setQueryParams({ limit: 20, skip: currentPage >1 ? (currentPage - 1) * 20: 0 });
    // }, [currentPage]);
  
    // const { data, loading, error } = useFetch('/projects', queryParams);
    
    // useEffect(() => {
    //   if (data) {
    //     setDisplayedProjects(data.rows.slice(1));
    //     console.log(data.rows.slice(1),'checckk')
    //   }
    // }, [data]);
  
    const allProjects = displayedProjects;
    const completedProjects = displayedProjects.filter(
      proj => proj.at(-1) === 'Completed'
    );
    const activeProjects = displayedProjects.filter(
      proj => proj.at(-1) !== 'Completed'
    );
    const projectsToShow = useMemo(() => {
      return activeTab === 0
        ? allProjects
        : activeTab === 1
        ? activeProjects
        : completedProjects;
    }, [activeTab, allProjects, activeProjects, completedProjects]);
  
    const handleTabChange = (event, newValue) => {
        console.log(newValue,'checkk')
      setActiveTab(newValue);
      setCurrentPage(1); 
    };
  
    const handlePageChange = (page) => {
        console.log(page, 'checkkk')
      setCurrentPage(page);
    };
  
    return (
      <>
        {loading && <p>Loading …</p>}
        {error && <p>Error: {error.message}</p>}
        {displayedProjects && (
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              My Projects
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Track the progress of your content and collaborate with your editor.
            </Typography>
  
            {/* Tabs */}
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="All" />
              <Tab label="Active" />
              <Tab label="Completed" />
            </Tabs>
  
            <ProjectsTable projects={projectsToShow} />
  
            <ProjectsPagination
              totalPages={data && data.pages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
      </>
    );
  };
  
  export default ProjectsPage;
