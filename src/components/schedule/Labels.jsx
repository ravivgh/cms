import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import { Checkbox } from "@mui/material";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  const holidays = ["Diwali", "Christmas", "New Year", "Eid", "Holi"];
  return (
    <React.Fragment>
      <Accordion
        type="single"
        defaultValue="label"
        collapsible
        className="border-none "
      >
        <AccordionItem value="label" className="border-none">
          <AccordionTrigger className="text-white font-medium border-none no-underline hover:no-underline focus:no-underline hover:bg-[#242424] px-3 hover:rounded-full py-2 bg-[#242424ad] rounded-full text-sm">
            Label
          </AccordionTrigger>
          <AccordionContent className="border-none">
            <div className="space-y-2">
              {labels.map(({ label: lbl, checked }, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <Checkbox
                    checked={checked}
                    onChange={() =>
                      updateLabel({ label: lbl, checked: !checked })
                    }
                    sx={{
                      transform: "scale(0.7)",
                      color: `${lbl}`,
                      "&.Mui-checked": {
                        color: `${lbl}`,
                      },
                    }}
                  />
                  <span className="text-gray-300 capitalize text-sm ">
                    {lbl}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Holiday Accordion */}
        <AccordionItem value="holidays" className="border-none">
          <AccordionTrigger className="text-white font-medium no-underline hover:no-underline focus:no-underline hover:bg-[#242424] px-3 hover:rounded-full py-2 bg-[#242424ad] rounded-full text-sm">
            Holidays
          </AccordionTrigger>
          <AccordionContent className="border-none">
            <div className="space-y-2">
              {holidays.map((holiday, idx) => (
                <div key={idx} className="text-gray-300 capitalize text-sm">
                  {holiday}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  );
}
