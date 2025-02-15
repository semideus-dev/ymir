import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces["$post"]({ json });
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Create workspace failed. Please try again.";

        if ("message" in data && typeof data.message === "string") {
          const parts = data.message.split(":");
          errorMessage = parts.length > 1 ? parts[1].trim() : parts[0];
        }

        throw new Error(errorMessage);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
