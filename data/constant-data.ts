export interface Section {
  block: string;
  imgUrl: string;
  chapters: Chapter[];
}

export interface Chapter {
  chapter: number;
  name: string;
  link: string;
  isViewed: boolean;
  isPreTest?: boolean;
}

export const courses_data: Section[] = [
  {
    block: 'Welcome to IDvACC',
    imgUrl: 'https://images.pexels.com/photos/12118409/pexels-photo-12118409.jpeg?cs=srgb&dl=pexels-alireza-akhlaghi-official-12118409.jpg&fm=jpg&w=1745&h=853&fit=crop',
    chapters: [
      {
        chapter: 1,
        name: 'Welcome to IDvACC',
        link: 'https://docs.google.com/presentation/d/1/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 2,
        name: 'IDvACC Training Introduction',
        link: 'https://docs.google.com/presentation/d/2/view?usp=sharing',
        isViewed: false
      }
    ]
  },
  {
    block: 'New - Block I - Foundations',
    imgUrl: 'https://images.pexels.com/photos/18719092/pexels-photo-18719092.jpeg?cs=srgb&dl=pexels-miguel-cuenca-67882473-18719092.jpg&fm=jpg&w=1745&h=853&fit=crop',
    chapters: [
      {
        chapter: 1,
        name: 'Indonesian Airspace Introduction',
        link: 'https://docs.google.com/presentation/d/3/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 2,
        name: 'Flight Data',
        link: 'https://docs.google.com/presentation/d/4/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 3,
        name: 'Radio Technique & Communications',
        link: 'https://docs.google.com/presentation/d/5/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 4,
        name: 'Flight Rules',
        link: 'https://docs.google.com/presentation/d/6/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 5,
        name: 'Understanding METARs',
        link: 'https://docs.google.com/presentation/d/7/view?usp=sharing',
        isViewed: false
      }
    ]
  },
  {
    block: 'New - Block II - Ground Training (S1)',
    imgUrl: 'https://images.pexels.com/photos/2315265/pexels-photo-2315265.jpeg?cs=srgb&dl=pexels-joel-super-188959-2315265.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        chapter: 1,
        name: 'IFR Clearances',
        link: 'https://docs.google.com/presentation/d/8/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 2,
        name: 'Ground Surface Movement',
        link: 'https://docs.google.com/presentation/d/9/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 3,
        name: 'VFR Clearances',
        link: 'https://docs.google.com/presentation/d/10/view?usp=sharing',
        isViewed: false
      }
    ]
  },
  {
    block: 'New - Block III - Tower Training (S2)',
    imgUrl: 'https://images.pexels.com/photos/10893728/pexels-photo-10893728.jpeg?cs=srgb&dl=pexels-id23-1442770-10893728.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        chapter: 1,
        name: 'Tower Introduction',
        link: 'https://docs.google.com/presentation/d/11/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 2,
        name: 'Initial Separation',
        link: 'https://docs.google.com/presentation/d/12/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 3,
        name: 'Departures',
        link: 'https://docs.google.com/presentation/d/13/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 4,
        name: 'Arrivals',
        link: 'https://docs.google.com/presentation/d/14/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 5,
        name: 'Tower VFR Circuit',
        link: 'https://docs.google.com/presentation/d/15/view?usp=sharing',
        isViewed: false
      }
    ]
  },
  {
    block: 'S3 Rating: Radar Training',
    imgUrl: 'https://images.pexels.com/photos/3582491/pexels-photo-3582491.jpeg?cs=srgb&dl=pexels-ibrahimboran-3582491.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        chapter: 1,
        name: 'Introduction to Radar',
        link: 'https://docs.google.com/presentation/d/20/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 2,
        name: 'Radar Procedures for Airport Operations',
        link: 'https://docs.google.com/presentation/d/21/view?usp=sharing',
        isViewed: false
      },
    ]
  },
  {
    block: 'C1 Rating: Centre Training',
    imgUrl: 'https://images.pexels.com/photos/3402846/pexels-photo-3402846.jpeg?cs=srgb&dl=pexels-captainsopon-3402846.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        chapter: 1,
        name: 'Indonesian Classes of Airspace',
        link: 'https://docs.google.com/presentation/d/23/view?usp=sharing',
        isViewed: false
      },
      {
        chapter: 2,
        name: 'Area Control Centre: Enroute Operations',
        link: 'https://docs.google.com/presentation/d/24/view?usp=sharing',
        isViewed: false
      }
    ]
  }
]