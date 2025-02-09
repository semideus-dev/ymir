import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/use-toast";

type ResponseType = InferResponseType<(typeof client.api.auth.signin)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.signin)["$post"]>;

export function useSignIn() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signin["$post"]({ json });
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
      toast({
        title: "Sign-in Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
}
