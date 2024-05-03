import { type ZodSchema } from "zod";
import { useFormState, useFormStatus } from "react-dom";

export default function useHandleForm<Schema extends Record<string, unknown>>(
  schema: ZodSchema,
  values: Schema,
  onsubmit: (arg: Schema) => void
) {
  const [error, action] = useFormState(() => {
    const resp = schema.safeParse(Object.fromEntries(Object.entries(values)));

    if (!resp.success) return resp.error.formErrors.fieldErrors;

    return onsubmit(resp.data);
  }, {});

  const { pending } = useFormStatus();

  return { isPending: pending, error, action };
}
