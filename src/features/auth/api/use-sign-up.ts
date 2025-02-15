import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.signup)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.signup)["$post"]>;

export function useSignUp() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signup["$post"]({ json });
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Sign-in failed. Please try again.";

        if ("message" in data && typeof data.message === "string") {
          const parts = data.message.split(":");
          errorMessage = parts.length > 1 ? parts[1].trim() : parts[0];
        }

        throw new Error(errorMessage);
      }

      return data;
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
