import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const block1 = await prisma.course.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: 'clyy4f1ei0000w5x9q2aihwxd',
      title: 'Welcome to IDvACC',
      sections: {
        createMany: {
          data: [
            {
              id: 'clz6yx1160000u72ujvaunxn4',
              title: 'Welcome to IDvACC',
              link: 'https://docs.google.com/presentation/d/1/view?usp=sharing',
            },
            {
              id: 'clz6yx1160001u72uowktaiuu',
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
      id: 'clyy4f1q00003w5x93gjd0n9m',
      title: 'Block I - Foundations',
      sections: {
        createMany: {
          data: [
            {
              id: 'clz6yx12x0002u72uuttdg3m2',
              title: 'Indonesian Airspace Introduction',
              link: 'https://docs.google.com/presentation/d/3/view?usp=sharing',
            },
            {
              id: 'clz6yx12x0003u72u3fekozpi',
              title: 'Flight Data',
              link: 'https://docs.google.com/presentation/d/4/view?usp=sharing',
            },
            {
              id: 'clz6yx12x0004u72ujnghwy0z',
              title: 'Radio Technique & Communications',
              link: 'https://docs.google.com/presentation/d/5/view?usp=sharing',
            },
            {
              id: 'clz6yx12x0005u72u3pmt4atl',
              title: 'Flight Rules',
              link: 'https://docs.google.com/presentation/d/6/view?usp=sharing',
            },
            {
              id: 'clz6yx12x0006u72uoayhwchv',
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
      id: 'clyy4f1rh0009w5x9wwc5ropl',
      title: 'New Block II - Ground Training (S1)',
      sections: {
        createMany: {
          data: [
            {
              id: 'clz6yx14d0007u72umk6nijx5',
              title: 'IFR Clearances',
              link: 'https://docs.google.com/presentation/d/8/view?usp=sharing',
            },
            {
              id: 'clz6yx14d0008u72ul10hd2n7',
              title: 'Ground Surface Movement',
              link: 'https://docs.google.com/presentation/d/9/view?usp=sharing',
            },
            {
              id: 'clz6yx14d0009u72us5s5v0i5',
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
      id: 'clyy4f1sx000dw5x9okkqozvr',
      title: 'Block III - Tower Training (S2)',
      sections: {
        createMany: {
          data: [
            {
              id: 'clz6yx16q000au72uz68llwz0',
              title: 'Tower Introduction',
              link: 'https://docs.google.com/presentation/d/11/view?usp=sharing',
            },
            {
              id: 'clz6yx16q000bu72uyqj5yy7w',
              title: 'Initial Separation',
              link: 'https://docs.google.com/presentation/d/12/view?usp=sharing',
            },
            {
              id: 'clz6yx16q000cu72uqf9yyfrn',
              title: 'Departures',
              link: 'https://docs.google.com/presentation/d/13/view?usp=sharing',
            },
            {
              id: 'clz6yx16q000du72ugcpznmha',
              title: 'Arrivals',
              link: 'https://docs.google.com/presentation/d/14/view?usp=sharing',
            },
            {
              id: 'clz6yx16q000eu72uk1t57buj',
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
      id: 'clyy4f1ud000jw5x9lnnhjfwy',
      title: 'S3 Rating: Radar Training',
      sections: {
        createMany: {
          data: [
            {
              id: 'clz6yx1bq000fu72utbcx8hd5',
              title: 'Introduction to Radar',
              link: 'https://docs.google.com/presentation/d/16/view?usp=sharing',
            },
            {
              id: 'clz6yx1bq000gu72utpgrjn6g',
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
      id: 'clyy4f1vu000mw5x9c9hluh5e',
      title: 'C1 Rating: Centre Training',
      sections: {
        createMany: {
          data: [
            {
              id: 'clz6yx1di000hu72uru83c1hx',
              title: 'Indonesian Classes of Airspace',
              link: 'https://docs.google.com/presentation/d/18/view?usp=sharing',
            },
            {
              id: 'clz6yx1di000iu72uussikkns',
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