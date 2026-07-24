import { useQuery } from "@tanstack/react-query";
import { getCategories, getPriorities } from "../api/enumApi.ts";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function usePriorities() {
  return useQuery({
    queryKey: ["priorities"],
    queryFn: getPriorities,
  });
}