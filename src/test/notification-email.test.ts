import { describe, expect, it } from "vitest";
import { buildNotificationEmail } from "@/lib/notification-email";

const values = {
  fullName: "Ada Okafor",
  email: "ada@example.com",
  category: "Buy land" as const,
  location: "Lekki, Lagos, Nigeria",
  consent: true as const,
};

const decode = (raw: string) => {
  const bin = atob(raw.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

describe("project notification email", () => {
  it("is sent to the Lota inbox", () => {
    const email = buildNotificationEmail(values, "ref-1");
    expect(email.to.toLowerCase()).toBe("lotaafrica@gmail.com");
    expect(decode(email.raw)).toMatch(/^To: Lotaafrica@gmail\.com\r\n/i);
  });

  it("replies go straight to the client", () => {
    expect(decode(buildNotificationEmail(values, "ref-1").raw)).toContain("<ada@example.com>");
  });

  it("cannot be redirected by line breaks in visitor input", () => {
    const msg = decode(buildNotificationEmail({ ...values, fullName: "Ada\r\nBcc: evil@example.com" }, "r").raw);
    expect(msg).not.toMatch(/\r\nBcc:/i);
  });
});
