# Dynamic Theme Switcher with React Context & `useTheme` Hook

This document outlines the workflow for creating a dynamic theme switcher in a React TypeScript project. This solution handles Light, Dark, and System theme preferences, utilizes the React Context API to avoid **prop drilling**, and ensures a seamless user experience by persisting preferences using **local storage**.

## Workflow: Building the Theme Switcher

The project is structured around key steps, starting from setup and moving through state management, side effects, and data persistence.

### 1. Project Initialization and Setup

The workflow begins by setting up the foundational structure:

- **Project Creation:** Start by building a React TypeScript project using Vite by running `npm create V`.
- **Dependency Installation:** Install NPM dependencies using `npm install` (or `mpni`).
- **Boilerplate Cleanup:** Clear the initial boilerplate code.
- **Folder Structure:** Create dedicated folders for better organization, including a **`components folder`**, **`context folder`**, and a **`hooks folder`**.
- **Initial Component:** Add a basic theme select menu in a separate file within the components folder.

### 2. Defining Context Structure and Types

To enable shared state access, the context itself must be defined, along with its expected data structure:

- **Context File Creation:** Create the `theme context.GSX` file inside the `context folder`.
- **Initial State Definition:** Define the `initial State` as an object that includes the **`current theme`** and a **`change theme function`**.
- **Constants:** Define a default theme (e.g., system preference) using a constant. It is good practice to use **capital letters with underscores** between words for constants.
- **Type Definitions:** Define necessary types, including `theme options` (an array of strings), `theme type` (equaling the `theme options` array values), and the `initial State type` object. The initial state type must define the `change theme` function as accepting a `selected theme` (type `theme`) and returning nothing.
- **Context Creation:** Create the context using the `create context` hook, passing the defined initial state.

### 3. Building the Context Provider Component

The provider component is the critical management layer responsible for supplying the live, dynamic theme state to the application:

- **Provider Definition:** Define and **Export a context provider component**.
- **State Management:** Store and manage the theme using the **`useState` Hook** inside the provider.
- **Update Function:** Use the `set theme function` to update the theme state, which will trigger all child components using the context to re-render.
- **Value Prop:** The provider component **requires the `value prop`**. This prop must have the exact structure of the initial state object, but the theme key must equal the current **`theme state`** (the latest theme value).
- **Application Wrapping:** **Wrap all application components** inside the exported `theme context provider` component, typically in the `main.TSX` file.

### 4. Creating and Consuming the Custom Hook

A custom hook is used to abstract the context consumption logic, providing clean access to the state:

- **Hook Creation:** Create the `use theme hook` inside the `hooks folder`. This custom hook helps use the contexts inside components, acting as a clean interface.
- **Component Consumption:** Import the custom hook into consuming components (e.g., the `theme select component`).
- **Destructuring Access:** Use **destructuring** to easily retrieve the `theme` and the `change theme functions`.
- **Event Handling:** Add an `onChange` function to the select element that executes the `change theme` function with the selected theme.

### 5. Implementing Side Effects and System Listener

To make the theme visible and reactive to the environment, side effects are managed within the provider component:

- **CSS Setup:** Add necessary styling, such as a **`.dark` class** to index.CSS, which can be toggled on the `body` element to enable dark mode.
- **Toggling Logic (`useEffect`):** Place the **`use effect` inside the context provider** and include `theme` in the dependency array.
- **System Preference Check:** Define a variable (`dark mode preference`) using `window.matchMedia` to **detect if the user’s operating system is set to dark mode**.
- **Conditional Class Toggling:** Inside `useEffect`, check the current theme state:
  - If `theme is system`, check if the `dark mode preference matches` to determine whether to add or remove the dark class from `document body class list`.
  - If `theme is dark`, add the dark class.
  - If `theme is light`, remove the dark class.
- **System Theme Listener:** Add an **event listener** (`dark mode preference.add EV listener`) for change events. This allows the application to react if the user changes their system theme preference while the app is running.
- **Cleanup:** Use the `return` function within `useEffect` to **remove the event listener when the component unmounts**, preventing memory leaks.

### 6. Persisting User Preferences (Local Storage)

To ensure the selected theme is remembered across browser sessions:

- **Define Access Key:** Define a unique key in a constant variable used to access the storage to avoid future misspelling errors.
- **Saving Theme:** Use a **`try...catch` block** to handle saving the selected theme to `local storage`. This block should provide a warning in the console if storage access fails.
- **Reading Theme:** Read the user's theme preference from `local storage` when the user opens the app, allowing the state to be initialized with the saved theme.

By following these steps, you successfully create a **dynamic theme switcher** that leverages the power of the React Context API and custom hooks for managing shared state and ensuring a seamless experience across sessions.

[[Video]("./src/assets/themeSwitcher.mp4")]
