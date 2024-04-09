export const URL = {
  AUTH: {
    SIGNUP_ADMIN: "/api/auth/signup/admin",
    SIGNUP_COMPANY: "/api/auth/signup/company",
    SIGNUP_USER: "/api/auth/signup/user",
    SIGNIN: "/api/auth/signin",
    SIGNIN_COMPANY: "/api/auth/signin/company",
    FORGOT_PASSWORD: "/api/auth/forgotpassword",
    FORGOT_PASSWORD_COMPANY: "/api/auth/forgotpassword/company",
  },
  PUBLIC: {
    GET_INDUSTRUES: "/api/public/industry",
    GET_PROVINCES: "/api/public/province",
    GET_JOBS: "/api/public/job/list",
    GET_JOB: "/api/public/job/:id",
  },
  USER: {
    GET_ME: "/api/user/me",
    GET_USERS: "/api/user/all",
    APPROVE: "/api/user/approve/:id",
    REJECT: "/api/user/reject/:id",
    UN_APPROVE: "/api/user/un-approve/:id",
  },
} as const;
