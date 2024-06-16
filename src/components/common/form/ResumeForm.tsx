import {
  Button,
  Card,
  DatePickerForm,
  FormInput,
  Label,
  Progress,
  SelectItem,
  Show,
  Spinner,
  Textarea,
} from "@/components";
import type { ButtonProps } from "@/components/ui/button";
import { useHandleForm } from "@/hooks";
import { cn, eq, isUndifined, scrollToTop } from "@/lib";
import { CreateResumeSchema, createResumeSchema } from "@/schemas";
import { ClassValue } from "clsx";
import { getCookie, setCookie } from "cookies-next";
import dayjs from "dayjs";
import {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

export default function ResumeForm() {
  const [pending, startTransition] = useTransition();

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [resumeValues, setResumeValues] = useState<CreateResumeSchema>({
    firstName: "",
    lastName: "",
    about: "",
    education: [
      { institute: "", startDate: null, endDate: null, projects: "" },
    ],
    work: [{ position: "", startDate: null, endDate: null, responsible: "" }],
  });
  const [generateFormsLength, setGenerateFormLength] = useState<{
    educationLength: number[];
    workLength: number[];
  }>({ educationLength: [1], workLength: [1] });

  const initData = () => {
    try {
      const resumeCookie = getCookie("resume");

      if (resumeCookie) {
        const parsed = JSON.parse(resumeCookie) as {
          subscriptionId: number;
          background: Pick<
            typeof resumeValues,
            "firstName" | "lastName" | "about" | "education"
          >;
        };

        setResumeValues((prev) => ({ ...prev, ...parsed.background }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { action } = useHandleForm<CreateResumeSchema>(
    createResumeSchema,
    resumeValues,
    (data) => {
      console.log(1, data);
    }
  );

  const onFormChange = useCallback(
    (
      field?: keyof typeof resumeValues,
      value?: string,
      subField?:
        | keyof (typeof resumeValues.education)[number]
        | keyof (typeof resumeValues.work)[number],
      lengthAt?: number
    ) => {
      if (field && lengthAt && subField && Array.isArray(resumeValues[field])) {
        setResumeValues((prev) => {
          const insetSubField = (prev[field] as Record<string, unknown>[]).map(
            (val, idx) => {
              if (idx + 1 === lengthAt) return { ...val, [subField]: value };

              return val;
            }
          );

          if (insetSubField) return { ...prev, [field]: insetSubField };

          return prev;
        });
      }

      if (field && value && !subField && !lengthAt) {
        setResumeValues((prev) => ({ ...prev, [field]: value }));
      }
    },
    [resumeValues]
  );

  const handleIncreaseSubFields = useCallback(
    (subField: keyof typeof generateFormsLength) => {
      setGenerateFormLength((prevForm) => ({
        ...prevForm,
        [subField]: [...prevForm[subField], prevForm[subField].length + 1],
      }));
    },
    []
  );

  const renderBackgroundForm = () => {
    return (
      <Fragment>
        <Header title={"Who are you?"} />
        <form action={action}>
          <Card.CardContent className="flex flex-col gap-[16px]">
            <div className="flex space-x-4">
              <FormInput
                label="Fistname"
                name="firstName"
                value={resumeValues.firstName}
                onChange={({ target: { value } }) =>
                  onFormChange("firstName", value)
                }
                className="flex-1"
              />
              <FormInput
                label="Lastname"
                className="flex-1"
                value={resumeValues.lastName}
                name="lastName"
                onChange={({ target: { value } }) =>
                  onFormChange("lastName", value)
                }
              />
            </div>
            <Label
              className="text-gray-700 text-xs font-normal"
              htmlFor="about"
            >
              {"Tell me about you"}
            </Label>
            <Textarea
              cols={1}
              name="about"
              value={resumeValues.about}
              onChange={({ target: { value } }) => onFormChange("about", value)}
              className="resize-none h-[100px]"
            />
            <Header
              title={"Education"}
              limit={1}
              cardClass="px-0"
              disabled={generateFormsLength.educationLength.length > 0}
              onClick={() => {
                if (generateFormsLength.educationLength.length < 1) {
                  handleIncreaseSubFields("educationLength");
                }
              }}
              textBtn={"Add education"}
              textClass={"text-2xl font-semibold text-slate-700"}
            />

            {generateFormsLength.educationLength.map((num, i) => (
              <Fragment key={`education_form_section_${num}`}>
                <div className="flex space-x-4">
                  <FormInput
                    label="University/College"
                    name="institute"
                    className="flex-1"
                    value={resumeValues.education[i]?.institute}
                    onChange={({ target: { value } }) => {
                      onFormChange("education", value, "institute", num);
                    }}
                  />
                  <FormInput
                    label="Major/Minor"
                    name="major"
                    value={resumeValues.education[i]?.major}
                    className="flex-1"
                    onChange={({ target: { value } }) => {
                      onFormChange("education", value, "major", num);
                    }}
                  />
                </div>
                <div className="flex space-x-4">
                  <DatePickerForm
                    className="flex-1"
                    label={"Start date"}
                    name="startDate"
                    value={dayjs(resumeValues.education[i].startDate).toDate()}
                    placeholder={"Start date"}
                    onChange={(date) =>
                      onFormChange(
                        "education",
                        date?.toISOString(),
                        "startDate",
                        num
                      )
                    }
                  />
                  <DatePickerForm
                    className="flex-1"
                    label={"End date"}
                    placeholder={"End date"}
                    name="endDate"
                    value={dayjs(resumeValues.education[i].endDate).toDate()}
                    onChange={(date) =>
                      onFormChange(
                        "education",
                        date?.toISOString(),
                        "endDate",
                        num
                      )
                    }
                  />
                </div>

                <Label className="text-gray-700 text-xs font-normal">
                  {"Project"}
                </Label>
                <Textarea
                  placeholder="Please enter to start a new line"
                  className="min-h-[120px] max-h-[300px]"
                  onKeyDown={({ key }) => {
                    if (key === "Enter") {
                      const project = resumeValues.education.at(
                        num - 1
                      )?.projects;

                      const value = `${project},`;

                      onFormChange("education", value, "projects", num);
                    }
                  }}
                  value={resumeValues.education[i].projects}
                  onChange={({ target: { value } }) =>
                    onFormChange("education", value, "projects", num)
                  }
                />
              </Fragment>
            ))}
          </Card.CardContent>
        </form>
      </Fragment>
    );
  };

  const renderWorkExpForm = () => {
    return (
      <Fragment>
        <Header
          title={"What do you do?"}
          disabled={generateFormsLength.workLength.length > 1}
          onClick={() => {
            if (generateFormsLength.workLength.length < 1) {
              handleIncreaseSubFields("workLength");
            }
          }}
          textBtn={"Add position"}
        />
        <Card.CardContent className="flex flex-col gap-[16px]">
          {generateFormsLength.workLength.map((num) => (
            <Fragment key={`work_form_section_${num}`}>
              <div className="flex space-x-4 items-end">
                <FormInput
                  label="Position"
                  className="flex-1"
                  name="position"
                />
                <div className="flex flex-1 space-x-1">
                  <DatePickerForm
                    label="Start job"
                    className="w-full"
                    name="startDate"
                  />
                  <DatePickerForm
                    label="End job"
                    className="w-full"
                    name="endDate"
                  />
                </div>
              </div>
              <Label className="text-gray-700 text-xs font-normal">
                {"Responsible"}
              </Label>
              <Textarea
                className="h-[280px] resize-none"
                placeholder="Please enter to start a new line"
              />
            </Fragment>
          ))}
        </Card.CardContent>
      </Fragment>
    );
  };

  const renderContactForm = () => {
    return (
      <Fragment>
        <Header title={"How can contact you?"} />
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
        <Header title={"Preview your template"} />
        <Card.CardContent className="max-w-[75%] mx-auto mb-4 min-h-[900px] bg-cyan-200"></Card.CardContent>
      </Fragment>
    );
  };

  const handleUpdateCookie = () => {
    const expires = dayjs().add(1, "day").toDate();

    const update = {
      subscriptionId: 1,
      background: {
        firstName: resumeValues.firstName,
        lastName: resumeValues.lastName,
        about: resumeValues.about,
        education: resumeValues.education,
      },
    };

    setCookie("resume", JSON.stringify(update), { expires, sameSite: true });

    startTransition(() => {
      setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 3));
      scrollToTop();
    });
  };

  return (
    <section className="flex flex-col gap-10">
      <Progress value={progress} />
      <div className="w-full max-w-5xl mx-auto">
        <Card.Card>
          {initialized ? (
            <form action={action}>
              {eq(step, 0) && renderBackgroundForm()}
              {eq(step, 1) && renderWorkExpForm()}
              {eq(step, 2) && renderContactForm()}
              {eq(step, 3) && renderPreview()}
              <Card.CardFooter className="flex space-x-4 justify-center">
                <Button
                  variant="outline"
                  type="button"
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
                  type="button"
                  role="next"
                  loading={pending}
                  onClick={handleUpdateCookie}
                >
                  {step >= 3 ? "Create resume" : "Next"}
                </Button>
              </Card.CardFooter>
            </form>
          ) : (
            <div className="flex justify-center items-center h-[calc(100dvh-180px)]">
              <Spinner label="" />
            </div>
          )}
        </Card.Card>
      </div>
    </section>
  );
}

function Header({
  title,
  textBtn,
  onClick,
  disabled,
  limit,
  textClass,
  cardClass,
}: {
  title: string;
  textBtn?: string;
  onClick?: ButtonProps["onClick"];
  disabled?: ButtonProps["disabled"];
  limit?: number;
  textClass?: ClassValue;
  cardClass?: HTMLDivElement["className"];
}) {
  return (
    <Card.CardHeader className={cardClass}>
      <div className="flex justify-between items-center">
        <h1 className={cn("text-4xl font-semibold text-slate-700", textClass)}>
          {title}
          <Show when={Boolean(limit && limit >= 1)}>
            <span className="text-xs font-normal text-red-400 ml-2">
              {`(limit ${limit})`}
            </span>
          </Show>
        </h1>
        <Show when={!isUndifined(textBtn)}>
          <Button
            disabled={disabled}
            type="button"
            onClick={onClick}
            size="sm"
            variant="outline"
          >
            {textBtn}
          </Button>
        </Show>
      </div>
    </Card.CardHeader>
  );
}
