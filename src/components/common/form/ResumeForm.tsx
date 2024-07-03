import {
  Button,
  Card,
  Checkbox,
  DatePickerForm,
  FormInput,
  Label,
  Popover,
  Progress,
  Radio,
  SelectItem,
  Show,
  Spinner,
  Textarea,
} from "@/components";
import type { ButtonProps } from "@/components/ui/button";
import { DEFAULT_THEME_TEMPLATE, RESUME_SOCICALS } from "@/constants";
import { useHandleForm } from "@/hooks";
import {
  cn,
  generateListNumber,
  isUndifined,
  numOnly,
  scrollToTop,
  toPercent,
} from "@/lib";
import { CreateResumeSchema, createResumeSchema } from "@/schemas";
import { useResumeStore } from "@/store";
import type { CreateResume, Nullable } from "@/types";
import { ClassValue } from "clsx";
import { getCookie, setCookie } from "cookies-next";
import dayjs from "dayjs";
import { Palette } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

type ResumeFormProps = {
  onSubmit: (data: CreateResume) => void;
};

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const params = useParams();

  const router = useRouter();

  const { setData, data, setTheme, theme, resetTheme } = useResumeStore();

  const [progress, setProgress] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [generateFormsLength, setGenerateFormLength] = useState<{
    educationLength: number[];
    workLength: number[];
    socialLength: number[];
  }>({ educationLength: [1], workLength: [1], socialLength: [1] });
  const [activeTheme, setActiveTheme] =
    useState<keyof typeof theme>("background");
  const [defaultThemeColor, setDefaultThemeColor] = useState("");

  const initData = () => {
    try {
      const resumeCookie = getCookie("resume");

      if (resumeCookie) {
        const parsed = JSON.parse(resumeCookie) as {
          subscriptionId: number;
          background: Pick<
            typeof data,
            "firstName" | "lastName" | "about" | "education"
          >;
          work: typeof data.work;
          contact: Pick<
            typeof data,
            "email" | "address" | "phone_number" | "socials"
          >;
        };

        setData({
          ...data,
          ...parsed.background,
          work: parsed.work,
          ...parsed.contact,
        });

        setGenerateFormLength({
          workLength: generateListNumber(parsed.work?.length),
          educationLength: generateListNumber(
            parsed.background.education?.length
          ),
          socialLength: generateListNumber(parsed.contact.socials?.length),
        });

        const fields = {
          firstName: parsed.background.firstName,
          lastName: parsed.background.lastName,
          position: parsed.work?.[0]?.position,
          company: parsed.work?.[0]?.company,
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

    return () => console.clear();
  }, []);

  const { action } = useHandleForm<CreateResumeSchema>(
    createResumeSchema,
    data,
    (data) => {
      console.log(1, data);
    }
  );

  const onChange = useCallback(
    (
      field?: keyof typeof data,
      value?: string | boolean,
      subField?:
        | keyof (typeof data.education)[number]
        | keyof (typeof data.work)[number]
        | keyof (typeof data.socials)[number],
      index?: number
    ) => {
      if (field && !subField && !index) {
        setData({ ...data, [field]: value });
      }

      if (field && subField && index && Array.isArray(data[field])) {
        let update;

        const insertSubField = (data[field] as Record<string, unknown>[]).map(
          (row, i) => {
            if (i + 1 === index) return { ...row, [subField]: value };

            return row;
          }
        );

        if (insertSubField) {
          update = { ...data, [field]: insertSubField };
        } else {
          update = data;
        }

        setData(update);
      }
    },
    [data]
  );

  const handleIncreaseSubFields = useCallback(
    (subField: keyof typeof generateFormsLength) => {
      setGenerateFormLength((prevForm) => ({
        ...prevForm,
        [subField]: [...prevForm[subField], prevForm[subField].length + 1],
      }));

      if (subField === "workLength") {
        setData({
          ...data,
          work: [
            ...data.work,
            {
              position: "",
              company: "",
              currently: false,
              startDate: null,
              endDate: null,
              responsible: "",
            },
          ],
        });
      }
    },
    [data]
  );

  const toDate = useCallback(
    (date?: Nullable<string>) => (date ? dayjs().toDate() : undefined),
    []
  );

  const onBack = () => router.back();

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
                value={data.firstName}
                onChange={({ target: { value } }) =>
                  onChange("firstName", value)
                }
                className="flex-1"
              />
              <FormInput
                label="Lastname"
                className="flex-1"
                value={data.lastName}
                name="lastName"
                onChange={({ target: { value } }) =>
                  onChange("lastName", value)
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
              value={data.about}
              onChange={({ target: { value } }) => onChange("about", value)}
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
                    value={data.education[i]?.institute}
                    onChange={({ target: { value } }) =>
                      onChange("education", value, "institute", num)
                    }
                  />
                  <FormInput
                    label="Major/Minor"
                    name="major"
                    value={data.education[i]?.major}
                    className="flex-1"
                    onChange={({ target: { value } }) =>
                      onChange("education", value, "major", num)
                    }
                  />
                </div>
                <div className="flex space-x-4">
                  <DatePickerForm
                    className="flex-1"
                    label={"Start date"}
                    name="startDate"
                    value={toDate(data.education[i].startDate)}
                    placeholder={"Start date"}
                    onChange={(date) =>
                      onChange(
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
                    value={toDate(data.education[i].endDate)}
                    onChange={(date) =>
                      onChange("education", date?.toISOString(), "endDate", num)
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
                      const project = data.education.at(num - 1)?.projects;

                      const value = `${project},`;

                      onChange("education", value, "projects", num);
                    }
                  }}
                  value={data.education[i].projects}
                  onChange={({ target: { value } }) =>
                    onChange("education", value, "projects", num)
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
          onClick={() => {
            if (generateFormsLength.workLength.length < 3) {
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
                  value={data.work?.[i]?.position}
                  onChange={({ target: { value } }) =>
                    onChange("work", value, "position", num)
                  }
                />
                <FormInput
                  label="Company"
                  name="company"
                  className="flex-1"
                  value={data.work?.[i]?.company}
                  onChange={({ target: { value } }) =>
                    onChange("work", value, "company", num)
                  }
                />
              </div>
              <div className="flex items-center flex-1 space-x-2">
                <DatePickerForm
                  label="Start job"
                  className="w-full"
                  name="startDate"
                  value={toDate(data.work?.[i]?.startDate)}
                  onChange={(date) =>
                    onChange("work", date?.toISOString(), "startDate", num)
                  }
                />
                <DatePickerForm
                  label="End job"
                  className="w-full"
                  name="endDate"
                  disabled={data.work?.[i]?.currently}
                  value={toDate(data.work?.[i]?.endDate)}
                  onChange={(date) =>
                    onChange("work", date?.toISOString(), "endDate", num)
                  }
                />
                <Show when={i === 0}>
                  <Checkbox
                    label="Currently"
                    checked={data.work?.[i]?.currently}
                    onCheckedChange={(checked) =>
                      onChange("work", checked, "currently", num)
                    }
                  />
                </Show>
              </div>
              <Label className="text-gray-700 text-xs font-normal">
                {"Responsible"}
              </Label>
              <Textarea
                className="h-[280px] resize-none"
                placeholder="Please enter to start a new line"
                value={data.work?.[i]?.responsible}
                onKeyDown={({ key }) => {
                  if (key === "Enter") {
                    const value = `${data.work?.[i]?.responsible},`;
                    onChange("work", value, "responsible", num);
                  }
                }}
                onChange={({ target: { value } }) =>
                  onChange("work", value, "responsible", num)
                }
              />
              <hr className="border-slate-100" />
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
              value={data.email}
              onChange={({ target: { value } }) => onChange("email", value)}
            />
            <FormInput
              label="Phone number"
              type="tel"
              className="flex-1"
              value={data.phone_number}
              onChange={({ target: { value } }) =>
                onChange("phone_number", numOnly(value))
              }
            />
          </div>
          <div className="mt-4" aria-label="socials">
            <div className="flex justify-between items-baseline">
              <h2 className="text-2xl font-semibold text-slate-700">
                {"Social link"}
              </h2>
              <Button type="button" disabled size="sm" variant="outline">
                {"Add social"}
              </Button>
            </div>
            {generateFormsLength.socialLength.map((num, i) => (
              <div key={`social_${i}`} className="flex space-x-4 items-end">
                <SelectItem
                  items={RESUME_SOCICALS.map((social) => ({
                    label: social,
                    value: social,
                  }))}
                  onChange={(value) =>
                    onChange("socials", value, "social", num)
                  }
                  value={data.socials[i]?.social || ""}
                />
                <FormInput
                  label="Social url"
                  className="flex-1"
                  value={data.socials[i]?.url}
                  onChange={({ target: { value } }) =>
                    onChange("socials", value, "url", num)
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
              value={data.address}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  const address = `${data.address},`;
                  onChange("address", address);
                }
              }}
              onChange={({ target: { value } }) => onChange("address", value)}
            />
          </div>
        </Card.CardContent>
      </Fragment>
    );
  };

  const handleUpdateCookie = () => {
    const expires = dayjs().add(1, "month").toDate();
    const resumeData = getCookie("resume");
    scrollToTop();

    if (resumeData) {
      const parsed: { templateTitle?: string } = JSON.parse(resumeData);

      const update = {
        templateTitle: parsed.templateTitle,
        templateId: +params.template_id,
        background: {
          firstName: data.firstName,
          lastName: data.lastName,
          about: data.about,
          education: data.education,
        },
        work: data.work,
        contact: {
          email: data.email,
          phone_number: data.phone_number,
          address: data.address,
          socials: data.socials,
        },
      };

      setCookie("resume", JSON.stringify(update), { expires, sameSite: true });

      onSubmit({
        templateData: JSON.stringify(data),
        templateTitle: "mock",
        templateId: +params.template_id,
      });
    }
  };

  return (
    <section className="flex flex-col gap-10 w-[50%] px-4 pt-[30px] pb-6">
      <div className="flex flex-col gap-3">
        <Progress value={progress} />
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Popover.Popover>
              <Popover.PopoverTrigger asChild>
                <Button
                  className="w-[150px] text-foreground"
                  variant={"outline"}
                >
                  {"Custom Theme"}
                  <Palette className="w-4 h-4 ml-1" />
                </Button>
              </Popover.PopoverTrigger>
              <Popover.PopoverContent className="w-full">
                <div className="flex space-x-4">
                  <HexColorPicker
                    className="min-w-[300px]"
                    color={defaultThemeColor || "#CBD5E1"}
                    onChange={(color) =>
                      setTheme({ ...theme, [activeTheme]: color })
                    }
                  />
                  <div className="flex flex-col gap-4">
                    <Radio.RadioGroup
                      defaultValue="background"
                      className="flex-col gap-3 flex min-w-[150px]"
                      onValueChange={(value) =>
                        setActiveTheme(value as typeof activeTheme)
                      }
                      value={activeTheme}
                    >
                      {Object.keys(theme).map((t) => (
                        <div
                          key={`theme_option_${t}`}
                          className="flex items-center space-x-2"
                        >
                          <Radio.RadioGroupItem value={t} id={t} />
                          <Label
                            className="text-slate-700 capitalize"
                            htmlFor={t}
                          >
                            {t}
                          </Label>
                        </div>
                      ))}
                    </Radio.RadioGroup>
                    <span className="border bg-white flex items-center space-x-2 p-2 w-fit rounded-lg">
                      {DEFAULT_THEME_TEMPLATE.map((color) => (
                        <Button
                          size="icon"
                          onClick={() => {
                            setDefaultThemeColor(color.background);

                            setTheme({ ...theme, ...color });
                          }}
                          className={cn(
                            "rounded-full w-5 h-5 hover:bg-current"
                          )}
                          style={{
                            background: color.background,
                          }}
                          key={color.name}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </Popover.PopoverContent>
            </Popover.Popover>
          </div>
          <Button
            disabled={Object.values(theme).every((v) => !v)}
            variant={
              Object.values(theme).every((v) => !v)
                ? "outline"
                : "destructive-outline"
            }
            onClick={resetTheme}
          >
            {"Reset theme"}
          </Button>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <Card.Card>
          {initialized ? (
            <form action={action}>
              {renderBackgroundForm()}
              {renderWorkExpForm()}
              {renderContactForm()}
              <Card.CardFooter className="flex space-x-4 justify-center">
                <Button
                  variant="outline"
                  asChild
                  type="button"
                  className="w-[150px]"
                >
                  <Link href="/resume-template/list">{"Back"}</Link>
                </Button>
                <Button
                  variant="primary"
                  className="w-[150px]"
                  type="button"
                  role="next"
                  onClick={handleUpdateCookie}
                >
                  {"Create resume"}
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
