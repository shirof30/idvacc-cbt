import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const block1 = await prisma.course.upsert({
    where: { id: '1' },
    update: {},
    create: {
      title: 'Welcome to IDvACC',
      sections: {
        createMany: {
          data: [
            {
              title: 'Welcome to IDvACC',
              link: 'https://docs.google.com/presentation/d/1/view?usp=sharing',
            },
            {
              title: 'IDvACC Training Introduction',
              link: 'https://docs.google.com/presentation/d/2/view?usp=sharing',
            }
          ]
        }
      },
    },
  })

  const block2 = await prisma.course.upsert({
    where: { id: '2' },
    update: {},
    create: {
      title: 'Block I - Foundations',
      sections: {
        createMany: {
          data: [
            {
              title: 'Indonesian Airspace Introduction',
              link: 'https://docs.google.com/presentation/d/3/view?usp=sharing',
            },
            {
              title: 'Flight Data',
              link: 'https://docs.google.com/presentation/d/4/view?usp=sharing',
            },
            {
              title: 'Radio Technique & Communications',
              link: 'https://docs.google.com/presentation/d/5/view?usp=sharing',
            },
            {
              title: 'Flight Rules',
              link: 'https://docs.google.com/presentation/d/6/view?usp=sharing',
            },
            {
              title: 'Understanding METARs',
              link: 'https://docs.google.com/presentation/d/7/view?usp=sharing',
            }
          ]
        }
      },
    },
  })

  const block3 = await prisma.course.upsert({
    where: { id: '3' },
    update: {},
    create: {
      title: 'New Block II - Ground Training (S1)',
      sections: {
        createMany: {
          data: [
            {
              title: 'IFR Clearances',
              link: 'https://docs.google.com/presentation/d/8/view?usp=sharing',
            },
            {
              title: 'Ground Surface Movement',
              link: 'https://docs.google.com/presentation/d/9/view?usp=sharing',
            },
            {
              title: 'VFR Clearances',
              link: 'https://docs.google.com/presentation/d/10/view?usp=sharing',
            }
          ]
        }
      },
    }
  })

  const block4 = await prisma.course.upsert({
    where: { id: '4' },
    update: {},
    create: {
      title: 'Block III - Tower Training (S2)',
      sections: {
        createMany: {
          data: [
            {
              title: 'Tower Introduction',
              link: 'https://docs.google.com/presentation/d/11/view?usp=sharing',
            },
            {
              title: 'Initial Separation',
              link: 'https://docs.google.com/presentation/d/12/view?usp=sharing',
            },
            {
              title: 'Departures',
              link: 'https://docs.google.com/presentation/d/13/view?usp=sharing',
            },
            {
              title: 'Arrivals',
              link: 'https://docs.google.com/presentation/d/14/view?usp=sharing',
            },
            {
              title: 'Tower VFR Circuit',
              link: 'https://docs.google.com/presentation/d/15/view?usp=sharing',
            }
          ]
        }
      }
    }
  })

  const block5 = await prisma.course.upsert({
    where: { id: '5' },
    update: {},
    create: {
      title: 'S3 Rating: Radar Training',
      sections: {
        createMany: {
          data: [
            {
              title: 'Introduction to Radar',
              link: 'https://docs.google.com/presentation/d/16/view?usp=sharing',
            },
            {
              title: 'Radar Procedures for Airport Operations',
              link: 'https://docs.google.com/presentation/d/17/view?usp=sharing',
            }
          ]
        }
      }
    }
  })

  const block6 = await prisma.course.upsert({
    where: { id: '6' },
    update: {},
    create: {
      title: 'C1 Rating: Centre Training',
      sections: {
        createMany: {
          data: [
            {
              title: 'Indonesian Classes of Airspace',
              link: 'https://docs.google.com/presentation/d/18/view?usp=sharing',
            },
            {
              title: 'Area Control Centre: Enroute Operations',
              link: 'https://docs.google.com/presentation/d/19/view?usp=sharing',
            }
          ]
        }
      }
    }
  })

  console.log({ block1, block2, block3, block4, block5, block6 })
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})