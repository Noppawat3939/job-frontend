import { QUERY_KEY } from "@/constants";
import { jobService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export default function useApproveJobHandler(
  onSuccess: <R>(arg?: R) => void,
  onError: <E extends Error>(arg?: E) => void
) {
  const approveJobMutation = useMutation({
    mutationFn: jobService.approveJob,
    mutationKey: [QUERY_KEY.APPROVE_JOB],
    onSuccess,
    onError,
  });

  const unApproveJobMutation = useMutation({
    mutationFn: jobService.unApproveJob,
    mutationKey: [QUERY_KEY.UN_APPROVE_JOB],
    onSuccess,
    onError,
  });

  const rejectJobMutation = useMutation({
    mutationFn: jobService.rejectJob,
    mutationKey: [QUERY_KEY.REJECT_JOB],
    onSuccess,
    onError,
  });

  const handle = {
    approve: (id: string) => approveJobMutation.mutate(id),
    unApprove: (id: string) => unApproveJobMutation.mutate(id),
    reject: (id: string) => rejectJobMutation.mutate(id),
  };

  return { handle };
}
