# CreatorEditorCollabFE


################ The Project Idea ###############
This project is a web application built on MERN STACK. This application connects Content Creators with Content Editors/Other Content sourcers. Many content creators outsource their video editing to editors - once the video is edited they download it - review it and upload it to their youtube channels. Many content creators travel alot and They have an overhead of communicating with the editors and then downloading it and taking the time to upload it to youtube. 

In this application I build a demo of how content creators can connect with editors on the platform and once the video is edited - they can review it on the platform itself. Once they approve the video,  the platform (after taking access rights) will upload it to youtube. The content creators have nothing to worry! They can chat with the editors on the platform, assign them the videos, request video changes , approve it and have the video uploaded. 


This project demonstrates the CONTENT CREATORS SIDE OF THE PROJECT.  We currently mimic one content creator  only with 100 + editors on the application. 

################ Functionalitites Completed   ###############
1) Browse editors, choose to chat with them 
2) Search editors 
3) Have a look at all the ongoing chats. 
3) Have a look at all their projects -  active ( Editing/Ready for review) and completed projects (published)
4) Have a look at the videos that are ready for review  and approve them 
5) Youtube Upload API Integration for ONE USER



################ Functionalities WIP  ###############
1) Configure Oath for multiple users and have their youtube access rights configured on the application. 
2) Request changes for the project. To Migrate from dummy data on Mockaroo to MongoDB. 
3) Content Creators Profile and Settings Screen.  


################%% Project Technicalities  ##################
- FOR EDITOR AND PROJECT DATA -  I built EDITOR and PROJECT SCHEMA on Mockaroo to get dummy data. Integreated the mock API from Mockaroo on my NODE.JS/EXPRESS.JS server on the backend 
- FOR CHAT FUNCTIONALITY - I have used MongoDB using MongoAtlas to store data on the cloud. Built Chat APIS on the node.js/express.js server and established socket.io connection  for real-time message syncing. 
-YOUTUBE UPLOAD API INTEGRATION  -  SINGLE USER ACCESS RIGHTS CONFIGURED. Refresh token from one single user is stored in .env file and used. This is for demo purpose. Actual application will have OAUTH configured for their youtube access rights on the platform with each user having its own refresh token saved in MONGODB. 
- REACT ON THE FRONTEND WITH MATERIAL UI 


- ################%% High Level View  OF FRONT END ##################
    - 3 hooks 
        1. useFetch - used in the entire application for GET API calls 
        2. usePost  - used in the entire application for  Post API calls 
        3. useChat  - hook for web socket connection for real time updates. 
    - API - client.jsx 
        1. This has the base API Calls with base url and headers. Used inside useFetch  hook
    
    - Components - Renders the UI. Divided into multiple child components for readibility and maintability. Each component has its .css file. 

- ################%% High Level View  OF  BACK END ##################
    1) Controllers - Function which call their specific service to get data from the desired source with appropriate error handling
    2) Services - Connecting the DB/ third party endpoint
    3) Routes - API end points 
    4) Models - MongoDB Schema
    5)Sockets - Establishing Socket connection
    6) db.js - establishing mongoDB connection 
    7utils -> youtube client - connects with youtube auth for upload api 
    




    

    






