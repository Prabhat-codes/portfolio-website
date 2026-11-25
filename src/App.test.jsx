import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import resumeData from "./resumeData";

describe("portfolio", () => {
  it("shows every section and all the content", () => {
    const { container } = render(<App />);
    for (const id of ["home", "about", "resume", "portfolio", "testimonials"]) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
    for (const job of resumeData.work) {
      expect(screen.getAllByText(job.Position).length).toBeGreaterThan(0);
    }
    for (const project of resumeData.portfolio) {
      expect(screen.getByAltText(project.name)).toBeInTheDocument();
    }
  });

  it("only makes projects with a public link clickable", () => {
    render(<App />);
    for (const project of resumeData.portfolio) {
      const link = screen.getByAltText(project.name).closest("a");
      if (project.link) expect(link).toHaveAttribute("href", project.link);
      else expect(link).toBeNull();
    }
  });

  it("moves through the testimonials on a timer and by clicking", () => {
    vi.useFakeTimers();
    const { container } = render(<App />);
    const shown = () => container.querySelector(".slides li.active cite").textContent;
    expect(shown()).toBe(resumeData.testimonials[0].name);
    act(() => vi.advanceTimersByTime(7000));
    expect(shown()).toBe(resumeData.testimonials[1].name);
    fireEvent.click(screen.getByLabelText("Show testimonial 3"));
    expect(shown()).toBe(resumeData.testimonials[2].name);
  });

  it("checks the contact form before sending, then sends the values", async () => {
    const send = vi.spyOn(globalThis, "fetch").mockResolvedValue({});
    render(<App />);
    fireEvent.click(document.querySelector('[aria-label="Contact Me"]'));
    const type = (label, value) =>
      fireEvent.change(screen.getByLabelText(label), { target: { value } });

    type("Name", "Tester");
    type("Email", "not-an-email");
    type("Mobile Number", "9999999999");
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Please enter a valid email address")).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();

    type("Email", "tester@example.com");
    type("Query or Feedback", "Hello");
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => expect(send).toHaveBeenCalledOnce());
    const url = new URL(send.mock.calls[0][0]);
    expect(url.searchParams.get("entry.266271106")).toBe("tester@example.com");
    expect(url.searchParams.get("entry.28711678")).toBe("Hello");
    expect(await screen.findByText("Message sent")).toBeInTheDocument();
  }, 20000);
});
