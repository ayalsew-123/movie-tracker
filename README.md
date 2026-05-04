# 🎬 Movie Tracker Application

## Course Information
**Course:** IT-431-DL1  
**Project:** Project Two: Movie Tracker Application

**Date:** 05/04/2026  

##  Project Links
- **GitHub:** https://github.com/ayalsew-123/movie-tracker  
- **Live App:** https://movie-tracker-virid-eight.vercel.app/  


##  Overview
The Movie Tracker Application is a full-stack web application that allows users to manage and explore a collection of movies. Users can search, filter, and sort movies. Authenticated users can add, edit, and delete movies.

##  Features
- Search movies by title  
- Filter movies by genre  
- Sort by rating, year, or title  
- Add new movies (authenticated users)  
- Edit movie details  
- Delete movies  
- Light and dark mode toggle  
- Responsive design  

## Technologies Used
- **Frontend:** React, TypeScript, CSS, Vite  
- **Backend:** Supabase  
- **Deployment:** Vercel  

## 🔐 Authentication & Security
- Supabase Authentication  
- Row Level Security (RLS)  
- Users can only edit/delete their own movies  

##  Database Structure
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



##  Testing
Tested by adding and deleting movies (including Michael Jackson-related entries) to confirm full CRUD functionality.

## Conclusion
This project demonstrates a complete full-stack application using modern technologies. It integrates frontend, backend, authentication, and deployment into one system with a clean and responsive UI.
