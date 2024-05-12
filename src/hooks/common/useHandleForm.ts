import { type ZodSchema } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { convertFromEntries } from "@/lib";

export default function useHandleForm<Values extends Record<string, unknown>>(
  schema: ZodSchema,
  values: Values,
  onsubmit: (arg: Values) => void
) {
  const [error, action] = useFormState(() => {
    const resp = schema.safeParse(convertFromEntries(values));

    if (!resp.success) return resp.error.formErrors.fieldErrors;

    return onsubmit(resp.data);
  }, {});

  const { pending } = useFormStatus();

  return { isPending: pending, error, action };
}
