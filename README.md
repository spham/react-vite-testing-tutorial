# Testing in React with Vitest and React Testing Library

## Overview

Welcome to the **Testing in React with Vitest and React Testing Library** project! This repository accompanies a comprehensive tutorial that guides you through setting up and writing effective tests for your React applications using **Vitest** and **React Testing Library**. Whether you're a beginner or an experienced developer, this project will help you ensure your React components are robust, maintainable, and bug-free.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
  - [Basic UI Testing](#basic-ui-testing)
  - [Testing User Events](#testing-user-events)
  - [Testing Data Fetching](#testing-data-fetching)
  - [Testing Custom Hooks](#testing-custom-hooks)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Vitest Integration:** Fast and efficient test runner optimized for Vite projects.
- **React Testing Library:** Simplifies testing React components by focusing on user interactions.
- **Comprehensive Testing Examples:** Covers UI rendering, user events, data fetching, and custom hooks.
- **Organized Project Structure:** Keeps tests maintainable and easy to navigate.
- **Mocking with Vitest:** Efficiently mock API calls and external dependencies.
- **Custom Hooks Testing:** Ensure your custom React hooks work as intended.

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/react-vitest-testing-tutorial.git
   cd react-vitest-testing-tutorial
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

## Project Structure

```
react-vitest-testing-tutorial/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Greeting.jsx
│   │   ├── Greeting.test.jsx
│   │   ├── Counter.jsx
│   │   ├── Counter.test.jsx
│   │   ├── UserProfile.jsx
│   │   └── UserProfile.test.jsx
│   ├── hooks/
│   │   ├── useCounter.js
│   │   └── useCounter.test.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vitest.config.js
├── vitest.setup.js
├── package.json
├── README.md
└── ...other config files
```

- **components/**: Contains React components and their corresponding test files.
- **hooks/**: Contains custom React hooks and their tests.
- **vitest.config.js**: Configuration file for Vitest.
- **vitest.setup.js**: Setup file to configure Vitest with Jest-DOM matchers.

## Running the Application

To start the development server:

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the running application.

## Running Tests

This project uses **Vitest** as the test runner. To execute the tests:

Using npm:

```bash
npm test
```

Or using Yarn:

```bash
yarn test
```

Vitest will run all test files matching the pattern `*.test.jsx` or `*.test.js` and display the results in the console.

### Viewing Test Coverage

To generate and view test coverage reports:

Using npm:

```bash
npm run test -- --coverage
```

Or using Yarn:

```bash
yarn test --coverage
```

The coverage report will be available in the `coverage/` directory.

## Writing Tests

### Basic UI Testing

**Component:** `Greeting.jsx`

```jsx
// src/components/Greeting.jsx
import React from "react";

function Greeting({ name }) {
  return <h1>Hello, {name || "World"}!</h1>;
}

export default Greeting;
```

**Test:** `Greeting.test.jsx`

```jsx
// src/components/Greeting.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import { describe, it, expect } from "vitest";

describe("Greeting", () => {
  it("renders a default greeting", () => {
    render(<Greeting />);
    expect(
      screen.getByRole("heading", { name: /hello, world!/i })
    ).toBeInTheDocument();
  });

  it("renders greeting with a name", () => {
    render(<Greeting name="Alice" />);
    expect(
      screen.getByRole("heading", { name: /hello, alice!/i })
    ).toBeInTheDocument();
  });
});
```

### Testing User Events

**Component:** `Counter.jsx`

```jsx
// src/components/Counter.jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p data-testid="count-value">{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

**Test:** `Counter.test.jsx`

```jsx
// src/components/Counter.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
import { describe, it, expect } from "vitest";

describe("Counter", () => {
  it("increments counter on button click", () => {
    render(<Counter />);

    const button = screen.getByRole("button", { name: /increment/i });
    const value = screen.getByTestId("count-value");

    expect(value.textContent).toEqual("0");

    fireEvent.click(button);
    expect(value.textContent).toEqual("1");

    fireEvent.click(button);
    expect(value.textContent).toEqual("2");
  });
});
```

### Testing Data Fetching

**Component:** `UserProfile.jsx`

```jsx
// src/components/UserProfile.jsx
import React, { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;
```

**Test:** `UserProfile.test.jsx`

```jsx
// src/components/UserProfile.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from "./UserProfile";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("UserProfile", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and displays user data", async () => {
    const mockUser = { name: "John Doe", email: "john@example.com" };
    global.fetch.mockResolvedValueOnce({
      json: async () => mockUser,
    });

    render(<UserProfile userId={1} />);

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the fetch to resolve and component to update
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /john doe/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });
  });
});
```

### Testing Custom Hooks

**Hook:** `useCounter.js`

```jsx
// src/hooks/useCounter.js
import { useState } from "react";

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((c) => c + 1);
  }

  function decrement() {
    setCount((c) => c - 1);
  }

  return { count, increment, decrement };
}
```

**Test:** `useCounter.test.js`

```jsx
// src/hooks/useCounter.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "./useCounter";
import { describe, it, expect } from "vitest";

describe("useCounter", () => {
  it("increments and decrements", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(11);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(10);
  });
});
```

## Best Practices

- **Keep Tests Isolated:** Ensure that each test runs independently to avoid flaky tests.
- **Use Descriptive Test Names:** Clearly describe what each test is verifying.
- **Leverage `describe` Blocks:** Group related tests for better organization and readability.
- **Mock External Dependencies:** Use Vitest’s mocking capabilities to simulate API calls and other external interactions.
- **Focus on User Interactions:** Test components from the user’s perspective to ensure the UI behaves as expected.
- **Maintain a Consistent Structure:** Organize your tests in a manner that scales with your project’s growth.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

1. **Fork the Repository**
2. **Create a New Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add your message"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request**

---

For more tutorials and updates, visit my [YouTube channel Pedrotechnologies](https://www.youtube.com/@pedrotechnologies).
