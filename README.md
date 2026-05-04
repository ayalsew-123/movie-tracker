# Movie Tracker Application
 Student Information
IT-431-DL1
Project Two: Movie Tracker Application
Date: 05/04/2026
 Project Links
- GitHub: https://github.com/ayalsew-123/movie-tracker  
- Live App: https://movie-tracker-virid-eight.vercel.app/  

 Overview
The Movie Tracker Application is a full-stack web app that allows users to manage and explore a collection of movies. Users can search, filter, and sort movies. Authenticated users can add, edit, and delete movies.

 Features
- Search movies by title  
- Filter by genre  
- Sort by rating, year, or title  
- Add / Edit / Delete movies  
- Light & Dark mode  
- Responsive design  

 Technologies
- Frontend: React, TypeScript, Vite  
- Backend: Supabase  
- Deployment: Vercel  

 Authentication & Security
- Supabase Authentication  
- Row Level Security (RLS)  
- Only owners can edit/delete their movies  

 Database
Table: `movies`

Fields:
- id  
- title  
- director  
- genre  
- year  
- runtime  
- rating  
- description  
 Testing
Tested by adding and deleting movies (including Michael Jackson-related entries) to verify CRUD functionality.

Conclusion
This project demonstrates a complete full-stack application using modern technologies. It includes authentication, database management, and a responsive UI.
