import { Button, Card, FormInput, Show, Tabs } from "@/components";
import { type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib";
import { type FormInputProps } from "./FormInput";

type GeneralFormProps = {
  value: string;
  title?: string;
  inputs: { key: string; props: FormInputProps }[];
  buttonProps?: {
    hideSubmit?: false;
    hideReset?: false;
    submit?: ButtonProps & { text?: string };
    reset?: ButtonProps & { text?: string };
    direction?: "horizontal" | "vertical";
    wrapperClassName?: string;
  };
};

export default function GeneralForm({
  value,
  title,
  inputs,
  buttonProps,
}: GeneralFormProps) {
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
        </Card.CardContent>
      </Card.Card>
    </Tabs.TabsContent>
  );
}
