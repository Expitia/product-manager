import { GeneralResponse } from "@/interfaces";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { setError } from "../slices/logger";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as GeneralResponse<{ message: string }>;
      const errorMessage =
        payload?.data?.message ??
        ("data" in action.error
          ? (action.error.data as { message: string }).message
          : action.error.message);

      if (errorMessage) api.dispatch(setError(errorMessage));
    }

    return next(action);
  };
