import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Grid, Tabs, Tab, CircularProgress } from '@mui/material';
import Header from '../Header/Header';
import EditorCard from './Editorcard/Editorcard';
import EditorList from './Editorlist/Editorlist';
import ProjectsPagination from '../Projectspage/Projectpagination/Projectpagination';
import useFetch from '../../hooks/useFetch';
import useDebouncedValue from './utils/useDebounced';

import { filterByCategory,calculateSkip } from './utils/filters';
import './Homepage.css';

const featuredEditors = [
  { name: 'Sarah Chen', title: 'Creative editor with 10 years of experience', image: '/images/avatar.jpg' },
  { name: 'Tom Evans', title: 'Expert in academic editing', image: '/images/avatar.jpg' },
  { name: 'Emily White', title: 'Fiction editor focusing on fiction novels', image: '/images/avatar.jpg' },
];

const tabLabels = ['All', 'Video Editors', 'Proofreaders', 'Article Editors'];

const HomePage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({ limit: 20, skip: 0 });

  useEffect(() => {
    setQueryParams({
      limit: 20,
      skip: calculateSkip(currentPage, 20),
      q: debouncedSearch,
    });
  }, [debouncedSearch, currentPage]);

  const { data, loading, error } = useFetch('/editorListings', queryParams);
  const editors = data?.rows ?? [];
  const editorsToShow = useMemo(() => filterByCategory(editors, activeTab), [editors, activeTab]);

  return (
    <>
      {error && <p className="error">Error: {error.message}</p>}

      <Box component="main" className="mainContainer">
        <Header onSearch={setSearch} loading={loading} />

        {/* <Typography variant="h5" className="sectionTitle">
          Featured Editors
        </Typography>
        <Grid container spacing={2} className="gridContainer">
          {featuredEditors.map(editor => (
            <Grid item key={editor.name}>
              <EditorCard {...editor} />
            </Grid>
          ))}
        </Grid> */}

        {/* <Typography variant="h5" className="sectionTitle">
          Explore other editors
        </Typography> */}
        <Tabs
          value={activeTab}
          onChange={(e, val) => { setActiveTab(val); setCurrentPage(1); }}
          variant="standard"
          textColor="inherit"
          className="tabsContainer"
        >
          {tabLabels.map(label => <Tab key={label} label={label} />)}
        </Tabs>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress size={40} />
          </Box>
        ) : editorsToShow.length ? (
          <>
            <EditorList editors={editorsToShow} userId={1001} className="editorList" />
            <ProjectsPagination
              totalPages={data.pages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              className="pagination"
            />
          </>
        ) : (
          <Typography variant="body1" className="noResults">
            No editors found.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default HomePage;
