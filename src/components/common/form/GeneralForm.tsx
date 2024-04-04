import { Button, Card, FormInput, Show, Tabs } from "@/components";
import { type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib";
import { type FormInputProps } from "./FormInput";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

type GeneralFormProps<S extends FieldValues> = {
  value: string;
  title?: string;
  inputs: {
    key: string;
    props: Omit<FormInputProps, "name"> & { name: keyof FieldValues };
  }[];
  buttonProps?: {
    hideSubmit?: false;
    hideReset?: false;
    submit?: ButtonProps & { text?: string };
    reset?: ButtonProps & { text?: string };
    direction?: "horizontal" | "vertical";
    wrapperClassName?: string;
  };
  form: UseFormReturn<S, any, undefined>;
  onSubmit: SubmitHandler<S>;
};

export default function GeneralForm<TSchema extends FieldValues>({
  value,
  title,
  inputs,
  buttonProps,
  form,
  onSubmit,
}: GeneralFormProps<TSchema>) {
  const footerDir = buttonProps?.direction || "horizontal";

  return (
    <Tabs.TabsContent value={value}>
      <Card.Card className="border-none shadow-none">
        <Show when={Boolean(title)}>
          <Card.CardHeader>
            <Card.CardTitle aria-label={title}>{title}</Card.CardTitle>
          </Card.CardHeader>
        </Show>
        <Card.CardContent>
          <form onSubmit={form?.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
                {inputs.map((input) => (
                  <FormInput
                    key={input.key}
                    aria-label={input.key}
                    {...input.props}
                  />
                ))}
              </div>

              <div
                className={cn(
                  `flex gap-2 mt-6 ${
                    footerDir === "horizontal" ? "flex-row" : "flex-col"
                  }`,
                  buttonProps?.wrapperClassName
                )}
              >
                <Show when={!buttonProps?.hideSubmit}>
                  <Button
                    {...buttonProps?.submit}
                    type="button"
                    role="submit"
                    className={cn(
                      "w-[200px] mx-auto",
                      buttonProps?.submit?.className
                    )}
                  >
                    {buttonProps?.submit?.text || "Submit"}
                  </Button>
                </Show>
                <Show when={!buttonProps?.hideReset}>
                  <Button
                    {...buttonProps?.reset}
                    role="reset"
                    variant="outline"
                    className={cn(
                      "w-[200px] mx-auto",
                      buttonProps?.reset?.className
                    )}
                  >
                    {buttonProps?.reset?.text || "Cancel"}
                  </Button>
                </Show>
              </div>
            </div>
          </form>
        </Card.CardContent>
      </Card.Card>
    </Tabs.TabsContent>
  );
}
