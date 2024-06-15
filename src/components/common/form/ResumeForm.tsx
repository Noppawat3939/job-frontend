import {
  Button,
  Card,
  DatePickerForm,
  FormInput,
  Label,
  Progress,
  SelectItem,
  Textarea,
} from "@/components";
import { eq, scrollToTop } from "@/lib";
import { Fragment, useState } from "react";

export default function ResumeForm() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const renderBackgroundForm = () => {
    return (
      <Fragment>
        <Card.CardHeader>
          <h1 className="text-4xl font-semibold text-slate-700">
            {"Who are you?"}
          </h1>
        </Card.CardHeader>
        <Card.CardContent className="flex flex-col gap-[16px]">
          <div className="flex space-x-4">
            <FormInput label="Fistname" className="flex-1" />
            <FormInput label="Lastname" className="flex-1" />
          </div>
          <Label className="text-gray-700 text-xs font-normal">
            {"Tell me about you"}
          </Label>
          <Textarea cols={1} className="min-h-[150px] max-h-[350px]" />
          <div className="flex mt-4 justify-between items-center">
            <h2 className="text-2xl font-semibold text-slate-700">
              {"Education"}
            </h2>
            <Button variant="outline" size="sm" type="button">
              {"Add education"}
            </Button>
          </div>
          <div className="flex space-x-4">
            <FormInput label="University/College" className="flex-1" />
            <FormInput label="Major/Minor" className="flex-1" />
          </div>
          <div className="flex space-x-4">
            <DatePickerForm
              className="flex-1"
              label={"Start date"}
              placeholder={"Start date"}
            />
            <DatePickerForm
              className="flex-1"
              label={"End date"}
              placeholder={"End date"}
            />
          </div>

          <Label className="text-gray-700 text-xs font-normal">
            {"Project"}
          </Label>
          <Textarea
            placeholder="Please enter to start a new line"
            className="min-h-[150px] max-h-[350px]"
          />
        </Card.CardContent>
      </Fragment>
    );
  };

  const renderWorkExpForm = () => {
    return (
      <Fragment>
        <Card.CardHeader>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold text-slate-700">
              {"What do you do?"}
            </h1>
            <Button type="button" size="sm" variant="outline">
              {"Add position"}
            </Button>
          </div>
        </Card.CardHeader>
        <Card.CardContent className="flex flex-col gap-[16px]">
          <div className="flex space-x-4 items-end">
            <FormInput label="Position" className="flex-1" />
            <div className="flex flex-1 space-x-1">
              <DatePickerForm label="Start job" className="w-full" />
              <DatePickerForm label="End job" className="w-full" />
            </div>
          </div>
          <Label className="text-gray-700 text-xs font-normal">
            {"Responsible"}
          </Label>
          <Textarea
            className="h-[280px] resize-none"
            placeholder="Please enter to start a new line"
          />
        </Card.CardContent>
      </Fragment>
    );
  };

  const renderContactForm = () => {
    return (
      <Fragment>
        <Card.CardHeader>
          <h1 className="text-4xl font-semibold text-slate-700">
            {"How can contact you?"}
          </h1>
        </Card.CardHeader>
        <Card.CardContent>
          <div className="flex space-x-4">
            <FormInput label="Email" className="flex-1" type="email" />
            <FormInput label="Phone number" type="tel" className="flex-1" />
          </div>
          <div className="mt-4" aria-label="socials">
            <div className="flex justify-between items-baseline">
              <h2 className="text-2xl font-semibold text-slate-700">
                {"Social link"}
              </h2>
              <Button type="button" size="sm" variant="outline">
                {"Add social"}
              </Button>
            </div>
            <div className="flex space-x-4 items-end">
              <SelectItem
                items={[
                  { label: "Linked in", value: "linkedIn" },
                  { label: "Facebook", value: "facebook" },
                  { label: "Youtube", value: "youtube" },
                  { label: "Tiktok", value: "tiktok" },
                  { label: "Github", value: "github" },
                ]}
              />
              <FormInput label="Social url" className="flex-1" />
            </div>
            <Label className="text-gray-700 text-xs font-normal">
              {"Address"}
            </Label>
            <Textarea
              className="min-h-[80px] max-h-[200px]"
              placeholder="Please enter to start a new line"
            />
          </div>
        </Card.CardContent>
      </Fragment>
    );
  };

  const renderPreview = () => {
    return (
      <Fragment>
        <Card.CardHeader>
          <h1 className="text-4xl font-semibold text-slate-700">
            {"Preview your template"}
          </h1>
        </Card.CardHeader>
        <Card.CardContent className="max-w-[75%] mx-auto mb-4 min-h-[900px] bg-cyan-200"></Card.CardContent>
      </Fragment>
    );
  };

  return (
    <section className="flex flex-col gap-10">
      <Progress value={progress} />
      <div className="w-full max-w-5xl mx-auto">
        <Card.Card>
          <form>
            {eq(step, 0) && renderBackgroundForm()}
            {eq(step, 1) && renderWorkExpForm()}
            {eq(step, 2) && renderContactForm()}
            {eq(step, 3) && renderPreview()}
          </form>
          <Card.CardFooter className="flex space-x-4 justify-center">
            <Button
              variant="outline"
              className="w-[150px]"
              onClick={() => {
                scrollToTop();
                setStep((prevStep) => (prevStep <= 0 ? 0 : prevStep - 1));
              }}
            >
              {"Back"}
            </Button>
            <Button
              variant="primary"
              className="w-[150px]"
              onClick={() => {
                scrollToTop();

                if (step < 3) {
                  setStep((prevStep) => prevStep + 1);
                }
              }}
            >
              {step >= 3 ? "Create resume" : "Next"}
            </Button>
          </Card.CardFooter>
        </Card.Card>
      </div>
    </section>
  );
}
