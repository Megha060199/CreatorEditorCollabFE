
import React, { useState,useEffect,useMemo } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';

import { filterProjects } from './projectUtils';

import ProjectsPagination from './Projectpagination/Projectpagination';
import ProjectsTable from './Projecttable/Projecttable'
import useFetch from '../../hooks/useFetch';

const ProjectsPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [queryParams, setQueryParams] = useState({ limit: 20, skip: 0 });
    const [displayedProjects, setDisplayedProjects] = useState([]);

    useEffect(() => {
      setQueryParams({ limit: 20, skip: currentPage >1 ? (currentPage - 1) * 20: 0 });
    }, [currentPage]);
  
    const { data, loading, error } = useFetch('/projects', queryParams);
    
    useEffect(() => {
      if (data) {
        setDisplayedProjects(data.rows.slice(1));
        console.log(data.rows.slice(1),'checckk')
      }
    }, [data]);
  
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
