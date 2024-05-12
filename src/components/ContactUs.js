import React, { useState } from "react";
import { FloatButton } from "antd";
import { Drawer } from "antd";
import CustomGoogleForms from "./CustomGoogleForms";
const ContactUs = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <FloatButton
        type="default"
        onClick={() => setOpen(true)}
        tooltip={<div>Contact Me</div>}
      />
      <Drawer
        title="Reach out to me"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        size="default"
      >
        <CustomGoogleForms setOpen={setOpen} />
      </Drawer>
    </React.Fragment>
  );
};
export default ContactUs;
