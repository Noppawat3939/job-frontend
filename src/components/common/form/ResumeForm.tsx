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
import { cn, eq, isUndifined, numOnly, scrollToTop, toPercent } from "@/lib";
import { CreateResumeSchema, createResumeSchema } from "@/schemas";
import { Nullable } from "@/types";
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
    email: "",
    address: "",
    phone_number: "",
    socials: [{ social: null, url: "" }],
  });
  const [generateFormsLength, setGenerateFormLength] = useState<{
    educationLength: number[];
    workLength: number[];
    socialLength: number[];
  }>({ educationLength: [1], workLength: [1], socialLength: [1] });

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
          work: typeof resumeValues.work;
          contact: Pick<
            typeof resumeValues,
            "email" | "address" | "phone_number" | "socials"
          >;
        };

        setResumeValues((prev) => ({
          ...prev,
          ...parsed.background,
          work: parsed.work,
          ...parsed.contact,
        }));

        const fields = {
          firstName: parsed.background.firstName,
          lastName: parsed.background.lastName,
          position: parsed.work?.[0]?.position,
          workStartDate: parsed.work?.[0]?.startDate,
          workEndDate: parsed.work?.[0]?.endDate,
          responsible: parsed.work?.[0]?.responsible,
          email: parsed.contact.email,
          phoneNumber: parsed.contact.phone_number,
          address: parsed.contact.address,
        };

        setProgress(
          toPercent(getProgressValue(fields), Object.keys(fields).length)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInitialized(true);
    }
  };

  const getProgressValue = (
    data: Record<string, any> | Record<string, unknown>[]
  ): number => {
    if (Array.isArray(data)) {
      const sum = data.reduce((acc, item) => {
        if (typeof item === "string") return acc + 0;

        return acc + getProgressValue(item);
      }, 0);
      return sum;
    }
    return Object.values(data).reduce((acc, cur) => acc + (cur ? 1 : 0), 0);
  };

  useEffect(() => {
    initData();
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
        | keyof (typeof resumeValues.work)[number]
        | keyof (typeof resumeValues.socials)[number],
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

  const toDate = useCallback(
    (date?: Nullable<string>) => (date ? dayjs().toDate() : undefined),
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
                    onChange={({ target: { value } }) =>
                      onFormChange("education", value, "institute", num)
                    }
                  />
                  <FormInput
                    label="Major/Minor"
                    name="major"
                    value={resumeValues.education[i]?.major}
                    className="flex-1"
                    onChange={({ target: { value } }) =>
                      onFormChange("education", value, "major", num)
                    }
                  />
                </div>
                <div className="flex space-x-4">
                  <DatePickerForm
                    className="flex-1"
                    label={"Start date"}
                    name="startDate"
                    value={toDate(resumeValues.education[i].startDate)}
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
                    value={toDate(resumeValues.education[i].endDate)}
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
          {generateFormsLength.workLength.map((num, i) => (
            <Fragment key={`work_form_section_${num}`}>
              <div className="flex space-x-4 items-end">
                <FormInput
                  label="Position"
                  className="flex-1"
                  name="position"
                  value={resumeValues.work[i]?.position}
                  onChange={({ target: { value } }) =>
                    onFormChange("work", value, "position", num)
                  }
                />
                <div className="flex flex-1 space-x-1">
                  <DatePickerForm
                    label="Start job"
                    className="w-full"
                    name="startDate"
                    value={toDate(resumeValues.work[i]?.startDate)}
                    onChange={(date) =>
                      onFormChange(
                        "work",
                        date?.toISOString(),
                        "startDate",
                        num
                      )
                    }
                  />
                  <DatePickerForm
                    label="End job"
                    className="w-full"
                    name="endDate"
                    value={toDate(resumeValues.work[i]?.endDate)}
                    onChange={(date) =>
                      onFormChange("work", date?.toISOString(), "endDate", num)
                    }
                  />
                </div>
              </div>
              <Label className="text-gray-700 text-xs font-normal">
                {"Responsible"}
              </Label>
              <Textarea
                className="h-[280px] resize-none"
                placeholder="Please enter to start a new line"
                value={resumeValues.work[i]?.responsible}
                onKeyDown={({ key }) => {
                  if (key === "Enter") {
                    const responsible = `${
                      resumeValues.work.at(num - 1)?.responsible
                    },`;

                    const value = `${responsible},`;

                    onFormChange("work", value, "responsible", num);
                  }
                }}
                onChange={({ target: { value } }) =>
                  onFormChange("work", value, "responsible", num)
                }
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
            <FormInput
              label="Email"
              className="flex-1"
              type="email"
              value={resumeValues.email}
              onChange={({ target: { value } }) => onFormChange("email", value)}
            />
            <FormInput
              label="Phone number"
              type="tel"
              className="flex-1"
              value={resumeValues.phone_number}
              onChange={({ target: { value } }) =>
                onFormChange("phone_number", numOnly(value))
              }
            />
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
            {generateFormsLength.socialLength.map((num, i) => (
              <div key={`social_${i}`} className="flex space-x-4 items-end">
                <SelectItem
                  items={[
                    { label: "Linked in", value: "linkedIn" },
                    { label: "Facebook", value: "facebook" },
                    { label: "Youtube", value: "youtube" },
                    { label: "Tiktok", value: "tiktok" },
                    { label: "Github", value: "github" },
                  ]}
                  onChange={(value) =>
                    onFormChange("socials", value, "social", num)
                  }
                  value={resumeValues.socials[i]?.social || ""}
                />
                <FormInput
                  label="Social url"
                  className="flex-1"
                  value={resumeValues.socials[i]?.url}
                  onChange={({ target: { value } }) =>
                    onFormChange("socials", value, "url", num)
                  }
                />
              </div>
            ))}
            <Label className="text-gray-700 text-xs font-normal">
              {"Address"}
            </Label>
            <Textarea
              className="min-h-[80px] max-h-[200px]"
              placeholder="Please enter to start a new line"
              value={resumeValues.address}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  const address = `${resumeValues.address},`;
                  onFormChange("address", address);
                }
              }}
              onChange={({ target: { value } }) =>
                onFormChange("address", value)
              }
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
    const expires = dayjs().add(7, "day").toDate();

    const update = {
      subscriptionId: 1,
      background: {
        firstName: resumeValues.firstName,
        lastName: resumeValues.lastName,
        about: resumeValues.about,
        education: resumeValues.education,
      },
      work: resumeValues.work,
      contact: {
        email: resumeValues.email,
        phone_number: resumeValues.phone_number,
        address: resumeValues.address,
        socials: resumeValues.socials,
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
