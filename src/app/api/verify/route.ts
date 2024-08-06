import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function POST(req: Request) {
  const body = await req.json()
  const { code } = body

  try {
    const res = await prisma.verifyCode.findFirst({ where: { id: code } })

    if (!res) {
      return NextResponse.json({ message: 'Code not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Code found', data: {
        name: await prisma.user.findFirst({
          where: { cid: res.cid },
          select: { name: true }
        }).then(data => data?.name) ?? '',
        course: await prisma.course.findFirst({
          where: { id: res.courseId },
          select: { title: true }
        }).then(data => data?.title) ?? '',
        cid: res.cid,
      }
    }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}