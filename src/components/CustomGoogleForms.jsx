import { useCallback } from "react";
import { Button, Form, Input, notification } from "antd";

const CustomGoogleForms = ({ setOpen }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = useCallback(
    async ({ name, email, mobile, query }) => {
      try {
        await fetch(
          "https://docs.google.com/forms/d/e/1FAIpQLSc1zhQ_LgBlpdIHf6cuktpAImdw92Yz-cVCR48GFMnmkTq4sw/formResponse?" +
            new URLSearchParams({
              "entry.1165975347": name,
              "entry.266271106":
                email !== null && email !== undefined ? email : "",
              "entry.81829973":
                mobile !== null && mobile !== undefined ? mobile : "",
              "entry.28711678":
                query !== null && query !== undefined ? query : "",
            }),
          {
            mode: "no-cors",
          }
        );
        // Google does not let the page read its reply, so delivery cannot be confirmed.
        api.success({
          message: "Message sent",
          description: "If you don't hear back, email me at prabhat.namdharani@gmail.com.",
        });
        form.resetFields();
        setOpen(false);
      } catch {
        api.error({
          message: "Could not send your message",
          description: "Check your connection, or email me at prabhat.namdharani@gmail.com.",
        });
      }
    },
    [api, form, setOpen]
  );

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email address is required" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input inputMode="email" autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile Number"
          rules={[
            { required: true, message: "Mobile number is required" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit mobile number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="query"
          label="Query or Feedback"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CustomGoogleForms;
