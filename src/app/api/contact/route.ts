import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";
    const referer = request.headers.get("referer") || "http://localhost:3000/";

    const response = await fetch("https://formsubmit.co/ajax/aaryanighut07@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": origin,
        "Referer": referer,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        _subject: `New Message from Portfolio: ${subject.trim()} (${name.trim()})`,
        _replyto: email.trim(),
        _template: "box",
        _captcha: "false",
        message: message.trim(),
        submissionDate: new Date().toLocaleString(),
      }),
    });

    if (!response.ok) {
      let serverError = "FormSubmit.co server response failure";
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          serverError = errorData.message;
        }
      } catch (_) {}
      return NextResponse.json({ success: false, message: serverError }, { status: response.status });
    }

    const data = await response.json();
    if (data.success === false || data.success === "false") {
      return NextResponse.json({ success: false, message: data.message || "FormSubmit error" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Message Sent Successfully!" });
  } catch (error: any) {
    console.error("Failed submitting contact form in API Route:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to deliver message. Please try again." },
      { status: 500 }
    );
  }
}
