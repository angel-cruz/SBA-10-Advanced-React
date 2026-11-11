# SBA-10-Advanced-React
SBA 10: Advanced React
<img width="1115" height="815" alt="Screenshot 2026-11-11 at 3 53 41 PM" src="https://github.com/user-attachments/assets/d623ddd7-fe96-4cd5-b99a-4a0466f720ea" />


## Reflection

### 1. What was the most challenging part of this project for you?

The most challenging part of this project was understanding how custom hooks and the Context API work together. At first, it was confusing to figure out where to manage state and how to share data between components without passing props everywhere.

Working with the `useFetch` hook also helped me understand how `async/await`, `useState`, and `useEffect` work together when fetching data from an external API. I learned how to handle loading states and errors so the application doesn't break when something goes wrong.

### 2. Explain a design decision you made during this project.

One design decision I made was separating the API fetching logic into a custom `useFetch` hook instead of writing the same code directly inside `App.tsx`. This made the code easier to read, reuse, and maintain.

I also decided to use the Context API to manage favorite recipes because multiple components may need access to the same data. Instead of passing favorites through props, I can access them using the `useFavorites` hook.

I used a separate `useLocalStorage` hook to save favorites so they remain available even after refreshing the browser.

Overall, these decisions helped me keep the project organized and understand how React manages and shares state.
