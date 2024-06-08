import { DATE_FORMAT, QUERY_KEY } from "@/constants";
import {
  eq,
  formatDate,
  formatPrice,
  isNull,
  isUndifined,
  mappingJobApprove,
  mappingJobType,
  mappingUrgetJob,
  pretty,
} from "@/lib";
import { jobService, userService } from "@/services";
import { userStore } from "@/store";
import { useQueries } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

const TAB_PARAMS = { ACCOUNT: "accounts", JOB: "jobs" } as const;

const tabValues = Object.values(TAB_PARAMS);

type UseFetchHomeAdminProp = (typeof tabValues)[number];

export default function useFetchHomeAdmin(
  searchParamTab: UseFetchHomeAdminProp
) {
  const { user } = userStore();

  const selectedAccountsTab = eq(searchParamTab, TAB_PARAMS.ACCOUNT);
  const selectedJobsTab = eq(searchParamTab, TAB_PARAMS.JOB);

  const [userQuery, jobQuery] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.GET_USERS, getCookie("token")],
        queryFn: userService.fetchUsers,
        enabled:
          !isUndifined(user) &&
          selectedAccountsTab &&
          eq(user?.role, "super_admin"),
      },
      {
        queryKey: [QUERY_KEY.GET_JOBS, getCookie("token")],
        queryFn: jobService.fetchJobs,
        enabled: !isUndifined(user) && selectedJobsTab,
      },
    ],
  });

  const mappedUser = userQuery.data?.data.map((user) => ({
    key: String(user.id),
    profile: user.userProfile,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: pretty(user.role),
    approve: user.active
      ? "approved"
      : isNull(user.active)
      ? "un-approve"
      : "rejected",
  }));

  const mappedJobs = jobQuery.data?.data.map((job) => ({
    key: String(job.id),
    company: job.company?.companyName,
    position: job.position,
    fulltime: mappingJobType[job.jobType],
    active: mappingJobApprove(job.active),
    urgent: mappingUrgetJob(job.urgent, ""),
    salary: formatPrice(job?.salary),
    style: job.style,
    createdAt: formatDate(job.createdAt, DATE_FORMAT),
  }));

  return {
    userQuery,
    jobQuery,
    state: { users: mappedUser, jobs: mappedJobs },
  };
}
