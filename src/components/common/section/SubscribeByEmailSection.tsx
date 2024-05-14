import { Button, FormInput } from "@/components";
import { useState } from "react";

export default function SubscribeByEmailSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-[60px] bg-slate-50 mb-[20px]">
      <div className="flex flex-col items-center">
        <p className="text-slate-700 text-sm">
          {
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, rem!"
          }
        </p>
        <div className="flex items-end gap-2 my-2 w-fit h-full">
          <FormInput
            type="email"
            label={"Subscribe our newsletter"}
            placeholder={"Email address"}
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <Button variant="outline" type="submit">
            {"Subscribe"}
          </Button>
        </div>
      </div>
    </section>
  );
}
