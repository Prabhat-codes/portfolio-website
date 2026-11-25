import { useState } from "react";
import { Drawer, FloatButton } from "antd";
import CustomGoogleForms from "./CustomGoogleForms";

export default function ContactUs() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatButton
        type="default"
        onClick={() => setOpen(true)}
        tooltip={<div>Contact Me</div>}
        aria-label="Contact Me"
      />
      <Drawer title="Reach out to me" placement="right" onClose={() => setOpen(false)} open={open}>
        <CustomGoogleForms setOpen={setOpen} />
      </Drawer>
    </>
  );
}
