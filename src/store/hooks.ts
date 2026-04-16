import { useDispatch, useSelector, useStore } from "react-redux";
import { memoize } from "proxy-memoize";
import { useMemo } from "react";

import type { AppDispatch, RootState, AppStore } from "@/store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

/**
 * Creates a typed `useProxySelector` hook for a given Redux state shape.
 *
 * This hook combines:
 * - `react-redux`'s `useSelector`
 * - strong TypeScript typing for the store state
 * - `proxy-memoize` selector memoization
 *
 * Why `useMemo` is used here:
 * `memoize(fn)` creates a new memoized selector function.
 * Without `useMemo`, that memoized selector would be recreated on every
 * component re-render, even when the selector logic has not changed.
 *
 * `useMemo` keeps the same memoized selector instance between renders,
 * and only recreates it when one of the provided dependencies changes.
 * This protects the `proxy-memoize` selector cache from being reset due to
 * unrelated component re-renders.
 *
 * Why `useTypedSelector` is used:
 * `useSelector.withTypes<TState>()` creates a Redux selector hook that is
 * aware of the exact state shape. This gives full type safety for `state`
 * inside the selector callback and ensures the return type is inferred correctly.
 *
 * Dependency guidance:
 * - Use an empty dependency list when the selector depends only on Redux state.
 * - Include dependencies when the selector captures values from outside
 *   the Redux state (for example props, route params, or local variables).
 *
 * Example:
 * ```ts
 * const userName = useProxySelector((state) => state.user.name);
 *
 * const todo = useProxySelector(
 *   (state) => state.todos.byId[todoId],
 *   [todoId]
 * );
 * ```
 */
const createProxySelectorHook = <TState extends object>() => {
  const useTypedSelector = useSelector.withTypes<TState>();

  const useProxySelector = <TReturnType>(
    fn: (state: TState) => TReturnType,
    deps: React.DependencyList = [],
  ): TReturnType => {
    // eslint-disable-next-line react-hooks/exhaustive-deps -- need to receive deps dynamic from component
    const selector = useMemo(() => memoize(fn), deps);
    return useTypedSelector(selector);
  };

  return useProxySelector;
};

export const useProxySelector = createProxySelectorHook<RootState>();
