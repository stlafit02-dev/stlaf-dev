import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket } from "../api/ticketApi";

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        status: string;
        assignedTo: string | null;
      };
    }) => updateTicket(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },
  });
}