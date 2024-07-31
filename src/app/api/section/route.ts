import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "@auth";

export async function PUT(req: Request) {
  const body = await req.json()
  const { sectionId } = body
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { cid: session.user.cid },
      select: { id: true }
    })

    const findSection = await prisma.userSection.findFirst({
      where: {
        sectionId,
        userId: user?.id
      },
      select: { completed: true, sectionId: true, id: true }
    })
    console.log('Section found:', findSection);
    if (!findSection?.completed) {
      await prisma.userSection.update({
        where: { id: findSection?.id },
        data: { completed: true }
      })
    }
    return NextResponse.json({ message: 'Section completed' }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}