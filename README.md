IT-431-DL1
Professor Randy Michak
Student Name: Ayalsew Melesse
Project Two: Movie Tracker Application
Date: 05/04/2026
Project Links
GitHub Repository: https://github.com/ayalsew-123/movie-tracker 
Live Application (Vercel): https://movie-tracker-virid-eight.vercel.app/ 
Overview
The Movie Tracker Application is a full-stack web application that allows users to manage and explore a collection of movies. Users can browse movies, search by title, filter by genre, and sort results based on rating, year, or title. The system also supports user authentication, allowing logged-in users to add, edit, and delete movies their Movies.
Key Features
• Search movies by title
• Filter movies by genre
• Sort movies by rating, year, or title
• Add new movies (authenticated users)
• Edit movie details
• Delete movies
• Light and Dark mode toggle
• Responsive design for different screen sizes
Technologies Used
Frontend: React, TypeScript, CSS, Vite
Backend: Supabase (Database + Authentication)
Deployment: Vercel
Home Page (Light Mode dark mode)
This screen introduces the application and highlights its main features. Users can quickly understand the purpose of the system and navigate using the 'Get Started' button.

Home Page (Dark Mode)
This screen demonstrates the dark mode feature. It enhances usability in low-light environments and provides modern user experience.
 
Movie List Page
This page displays all movies in a grid layout. Each movie card shows detailed information including title, director, genre, year, runtime, rating, and description

Add Movie Form
Authenticated users can add new movies using this form. It collects structured data such as title, director, genre, year, and description.

Sign Up Page
New users can register using their email and password. Supabase handles secure authentication and account creation.

Sign In Page
Existing users can log in to access advanced features such as adding, editing, and deleting movies.

User Logged-In View
Additionally, the frontend enforces ownership checks so that users can only see Edit and Delete buttons for movies they created

User Testing
I added Michael Jackson films to test the application. As a logged-in user, I was able to create new movie records and delete them successfully.


 
RLS Policies 
Row Level Security (RLS) policies ensure that only authenticated users can insert, update, and delete movies, while everyone can view them.
Database Structure
The application uses a Supabase database with a movies table. The table includes the following fields:
id, title, director, genre, year, runtime, rating, and description.

SQL Editor & Authorization Policies
The Supabase SQL Editor is used to manage database queries and structure. Authorization policies are configured to enforce secure access control using RLS.

Database Structure 
Conclusion
The Movie Tracker Application demonstrates a complete full-stack solution using modern web technologies. It successfully integrates React, TypeScript, Supabase, authentication, Row Level Security, and Vercel deployment. The application supports full CRUD operations and provides a clean, responsive user interface.

