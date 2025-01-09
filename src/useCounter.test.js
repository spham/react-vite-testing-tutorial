import React from "react";
import { render, screen, renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("useCounter", () => {
  it("initial count is 5", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  it("increments", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    act(() => result.current.increment());

    expect(result.current.count).toBe(1);
  });
  it("decrements", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    act(() => result.current.decrement());

    expect(result.current.count).toBe(-1);
  });
});
