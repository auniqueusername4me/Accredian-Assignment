import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, workEmail, companyName } = body;

    // Basic validation
    if (!fullName || !workEmail || !companyName) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all mandatory fields.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Here you would typically save to a database (e.g., Prisma, Supabase)
    // or forward to a CRM (Salesforce, Hubspot).
    // For this clone, we simulate a successful database insert.
    
    return NextResponse.json(
      { success: true, message: 'Lead captured successfully!' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
