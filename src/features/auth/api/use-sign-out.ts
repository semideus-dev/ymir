import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.auth.signout)["$post"]
>;

export function useSignOut() {

  const router = useRouter()

  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.signout["$post"]();
      return await response.json();
    },
    onSuccess: () => {
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] })
    }
  });

  return mutation;
}
