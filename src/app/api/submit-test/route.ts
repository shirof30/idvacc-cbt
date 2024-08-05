import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "@auth";

export async function POST(req: Request) {
  const body = await req.json()
  const { cid, courseId } = body
  const session = await auth()

  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { cid: session.user.cid },
      select: { id: true }
    })

    if (user) {
      const code = await prisma.verifyCode.create({
        data: {
          cid,
          status: 'TEST PASSED',
          courseId
        },
        select: { id: true }
      })

      await prisma.userCourse.update({
        where: { userId_courseId: { userId: user.id, courseId: courseId } },
        data: { completed: true }
      })

      if (code) return NextResponse.json({ message: 'Test submitted successfully', code: code.id }, { status: 200 });
      else throw new Error('Failed to submit test');
    }

  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}