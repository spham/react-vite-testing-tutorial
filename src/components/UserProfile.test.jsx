import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from "./UserProfile";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("UserProfile", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and displays the user data", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ id: 4, name: "John", email: "john@gmail.com" }),
    });
    render(<UserProfile userId={4} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /john/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/john@gmail.com/i)).toBeInTheDocument();
    });
  });
});
