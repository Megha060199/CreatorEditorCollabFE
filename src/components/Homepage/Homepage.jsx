import React, { useState ,useEffect,useMemo} from 'react';
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material';
import Header from '../Header/Header';
import EditorCard from './Editorcard/Editorcard';
import EditorList from './Editorlist/Editorlist';
import useFetch from '../../hooks/useFetch';
import './Homepage.css';
import ProjectsPagination from '../Projectspage/Projectpagination/Projectpagination';

const featuredEditors = [
  {
    name: 'Sarah Chen',
    title: 'Creative editor with 10 years of experience',
    image: '/images/avatar.jpg',
  },
  {
    name: 'Tom Evans',
    title: 'Expert in academic editing',
    image: '/images/avatar.jpg',
  },
  {
    name: 'Emily White',
    title: 'Fiction editor focusing on fiction novels',
    image: '/images/avatar.jpg',
  },
];

const HomePage = () => {
 
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({ limit: 20, skip: 0 });
  const [otherEditors, setOtherEditors] = useState([]);
  useEffect(() => {
      setQueryParams({ limit: 20, skip: currentPage >1 ? (currentPage - 1) * 20: 0 });
    }, [currentPage]);
    const { data, loading, error } = useFetch('/editorListings', queryParams);
  useEffect(() => {
      if (data) {
        setOtherEditors(data.rows.slice(1));
        console.log(data.rows.slice(1),'checckk')
      }
    }, [data]);
  
      const allEditors = otherEditors;
      const videoEditors= otherEditors.filter(
        proj => proj.at(-1) === 'Video Editors'
      );
      const proofreaders = otherEditors.filter(
        proj => proj.at(-1) === 'Proofreaders'
      );
      const articleEditors = otherEditors.filter(
        proj => proj.at(-1) === 'Article Editors'
      );
      const editorsToShow = useMemo(() => {
        return activeTab === 0
          ? allEditors
          : activeTab === 1
          ? videoEditors :
          activeTab ===2 ?
          proofreaders
          : articleEditors;
      }, [activeTab, allEditors, videoEditors, proofreaders,articleEditors]);
  
  const handleTabChange = (event, newValue) => {
        console.log(newValue,'checkk')
      setActiveTab(newValue);
      setCurrentPage(1); 
    };
  
    const handlePageChange = (page) => {
        console.log(page, 'checkkk')
      setCurrentPage(page);
    };

  const tabLabels = ['All', 'Video Editors', 'Proofreaders', 'Article Editors'];


  return (
    <>
      {loading && <p>Loading …</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <Box component="main" className="mainContainer">
          <Header />

  
          <Typography variant="h5" className="sectionTitle">
            Editors near you
          </Typography>
          <Grid container spacing={2} className="gridContainer">
            {featuredEditors.map(editor => (
              <Grid item key={editor.name}>
                <EditorCard
                  name={editor.name}
                  title={editor.title}
                  image={editor.image}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" className="sectionTitle">
            Explore other editors
          </Typography>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="standard"
            textColor="inherit"
            className="tabsContainer"
          >
            {tabLabels.map(label => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>

          <EditorList editors={editorsToShow} userId={1001} />
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

export default HomePage;
