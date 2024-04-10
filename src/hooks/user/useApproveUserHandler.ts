import { QUERY_KEY } from "@/constants";
import { userService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export default function useApproveUserHandler(
  onSuccess: <R>(arg?: R) => void,
  onError: <E extends Error>(arg?: E) => void
) {
  const approveUserMutation = useMutation({
    mutationFn: userService.approveUser,
    mutationKey: [QUERY_KEY.APPROVE_USER],
    onSuccess,
    onError,
  });

  const rejectUserMutation = useMutation({
    mutationFn: userService.rejectUser,
    mutationKey: [QUERY_KEY.REJECT_USER],
    onSuccess,
    onError,
  });

  const unApproveMutation = useMutation({
    mutationFn: userService.unApproveUser,
    mutationKey: [QUERY_KEY.UN_APPROVE_USER],
    onSuccess,
    onError,
  });

  const handle = {
    unApprove: (id: number) => unApproveMutation.mutate(id),
    approve: (id: number) => approveUserMutation.mutate(id),
    reject: (id: number) => rejectUserMutation.mutate(id),
  };

  return { handle };
}
