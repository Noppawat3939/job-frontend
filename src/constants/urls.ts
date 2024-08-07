export const URL = {
  AUTH: {
    SIGNUP_ADMIN: "/auth/signup/admin",
    SIGNUP_COMPANY: "/auth/signup/company",
    SIGNUP_USER: "/auth/signup/user",
    SIGNIN: "/auth/signin",
    SIGNIN_COMPANY: "/auth/signin/company",
    FORGOT_PASSWORD: "/auth/forgotpassword",
    FORGOT_PASSWORD_COMPANY: "/auth/forgotpassword/company",
    GET_URL_SIGNIN_SOCIAL: "auth/signin/social/url",
    VERIFY_EMAIL: "auth/signup/verify-email",
  },
  PUBLIC: {
    GET_INDUSTRUES: "/public/industry",
    GET_PROVINCES: "/public/province",
    GET_JOB: "/public/job/:id",
    GET_JOB_CATEGORIES: "/public/job-categories",
    GET_TESTIMONIALS: "/public/testimonials",
    GET_SUBSCRIBE_DATA: "/public/subscribe",
  },
  USER: {
    GET_ME: "/user/me",
    GET_USERS: "/user/all",
    APPROVE: "/user/approve/:id",
    REJECT: "/user/reject/:id",
    UN_APPROVE: "/user/un-approve/:id",
  },
  JOB: {
    GET_JOBS: "/job/list",
    GET_JOB: "/job/list/:id",
    CREATE: "/job/create",
    UPDATE: "/job/update/:id",
    APPROVE: "/job/approve/:id",
    REJECT: "/job/reject/:id",
    UN_APPROVE: "/job/un-approve/:id",
    DELETE: "/job/:id",
    APPLY: "/user-job/apply/:id",
    GET_APPLIED: "/user-job/applied",
    CANCEL_APPLIED_JOB: "/user-job/cancel/:id",
    GET_FAVORITED: "/user-job/favorited",
    FAVORITE_JOB: "/user-job/favorite/:id",
  },
  COMPANY: {
    GET_JOBS: "/company/list",
    GET_JOBS_APPIED: "/company/list/applied",
    GET_JOB_APPIED: "/company/list/applied/:id",
    UPDATE_APPLICATION_STATUS: "/user-job/application/update/:id",
  },
  DOCUMENT: {
    GET_RESUME_TEMPLATES: "/user-resume/templates",
    GET_USER_RESUME: "/user-resume",
    GET_USER_RESUME_BY_ID: "/user-resume/:id",
    CREATE_RESUME: "/user-resume",
    PUBLIC_RESUME: "/user-resume/public/:id",
  },
  PAYMENT: {
    CREATE_QR_SOURCE: "/payment/source-qr",
    GET_TRANSACTIONS: "/payment/transaction/list",
    CREATE_TRANSACTION: "/payment/transaction",
  },
  SUBSCRIPTION: {
    GET_ALL: "/subscription",
    UPDATE_COMPLETE: "/subscription/confirm-verify",
    UPDATE_REJECT: "/subscription/reject",
  },
} as const;
