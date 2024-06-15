import {
  Button,
  Card,
  DatePickerForm,
  FormInput,
  Label,
  Progress,
  Textarea,
} from "@/components";
import { useState } from "react";

export default function ResumeForm() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  return (
    <section className="flex flex-col gap-10">
      <Progress value={progress} />
      <div className="w-full max-w-5xl mx-auto">
        <Card.Card>
          <Card.CardHeader>
            <h1 className="text-4xl font-semibold text-slate-700">
              {"Who are you?"}
            </h1>
          </Card.CardHeader>
          <Card.CardContent>
            <form action="" aria-label="create-resume">
              <div className="flex space-x-4">
                <FormInput label="Fistname" className="flex-1" />
                <FormInput label="Lastname" className="flex-1" />
              </div>
              <Label className="text-gray-700 text-xs font-normal">
                {"Tell me about you"}
              </Label>
              <Textarea className="min-h-[150px] max-h-[350px]" />
              <h2 className="text-2xl font-semibold text-slate-700">
                {"Education"}
              </h2>
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
            </form>
          </Card.CardContent>
          <Card.CardFooter className="flex space-x-4 justify-center">
            <Button variant="outline" className="w-[150px]">
              {"Back"}
            </Button>
            <Button variant="primary" className="w-[150px]">
              {"Next"}
            </Button>
          </Card.CardFooter>
        </Card.Card>
      </div>
    </section>
  );
}
