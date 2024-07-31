export interface Section {
  block: string;
  imgUrl: string;
  chapters: Chapter[];
  id: string
}

export interface Chapter {
  id: string;
  chapter: number;
  name: string;
  link: string;
  isViewed: boolean;
  totalSlides: number;
  isPreTest?: boolean;
}

export interface Question {
  question: string;
  choices: string[];
  answer: string;
}

export const courses_data: Section[] = [
  {
    id: 'clyy4f1ei0000w5x9q2aihwxd',
    block: 'Welcome to IDvACC',
    imgUrl: 'https://images.pexels.com/photos/12118409/pexels-photo-12118409.jpeg?cs=srgb&dl=pexels-alireza-akhlaghi-official-12118409.jpg&fm=jpg&w=1745&h=853&fit=crop',
    chapters: [
      {
        id: 'clz6yx1160000u72ujvaunxn4',
        chapter: 1,
        name: 'Welcome to IDvACC',
        link: 'https://docs.google.com/presentation/d/1/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx1160001u72uowktaiuu',
        chapter: 2,
        name: 'IDvACC Training Introduction',
        link: 'https://docs.google.com/presentation/d/2/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      }
    ]
  },
  {
    id: 'clyy4f1q00003w5x93gjd0n9m',
    block: 'New - Block I - Foundations',
    imgUrl: 'https://images.pexels.com/photos/18719092/pexels-photo-18719092.jpeg?cs=srgb&dl=pexels-miguel-cuenca-67882473-18719092.jpg&fm=jpg&w=1745&h=853&fit=crop',
    chapters: [
      {
        id: 'clz6yx12x0002u72uuttdg3m2',
        chapter: 1,
        name: 'Indonesian Airspace Introduction',
        link: 'https://docs.google.com/presentation/d/3/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx12x0003u72u3fekozpi',
        chapter: 2,
        name: 'Flight Data',
        link: 'https://docs.google.com/presentation/d/4/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx12x0004u72ujnghwy0z',
        chapter: 3,
        name: 'Radio Technique & Communications',
        link: 'https://docs.google.com/presentation/d/5/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx12x0005u72u3pmt4atl',
        chapter: 4,
        name: 'Flight Rules',
        link: 'https://docs.google.com/presentation/d/6/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx12x0006u72uoayhwchv',
        chapter: 5,
        name: 'Understanding METARs',
        link: 'https://docs.google.com/presentation/d/7/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      }
    ]
  },
  {
    id: 'clyy4f1rh0009w5x9wwc5ropl',
    block: 'New - Block II - Ground Training (S1)',
    imgUrl: 'https://images.pexels.com/photos/2315265/pexels-photo-2315265.jpeg?cs=srgb&dl=pexels-joel-super-188959-2315265.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        id: 'clz6yx14d0007u72umk6nijx5',
        chapter: 1,
        name: 'IFR Clearances',
        link: 'https://docs.google.com/presentation/d/8/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx14d0008u72ul10hd2n7',
        chapter: 2,
        name: 'Ground Surface Movement',
        link: 'https://docs.google.com/presentation/d/9/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx14d0009u72us5s5v0i5',
        chapter: 3,
        name: 'VFR Clearances',
        link: 'https://docs.google.com/presentation/d/10/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      }
    ]
  },
  {
    id: 'clyy4f1sx000dw5x9okkqozvr',
    block: 'New - Block III - Tower Training (S2)',
    imgUrl: 'https://images.pexels.com/photos/10893728/pexels-photo-10893728.jpeg?cs=srgb&dl=pexels-id23-1442770-10893728.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        id: 'clz6yx16q000au72uz68llwz0',
        chapter: 1,
        name: 'Tower Introduction',
        link: 'https://docs.google.com/presentation/d/11/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx16q000bu72uyqj5yy7w',
        chapter: 2,
        name: 'Initial Separation',
        link: 'https://docs.google.com/presentation/d/12/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx16q000cu72uqf9yyfrn',
        chapter: 3,
        name: 'Departures',
        link: 'https://docs.google.com/presentation/d/13/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx16q000du72ugcpznmha',
        chapter: 4,
        name: 'Arrivals',
        link: 'https://docs.google.com/presentation/d/14/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx16q000eu72uk1t57buj',
        chapter: 5,
        name: 'Tower VFR Circuit',
        link: 'https://docs.google.com/presentation/d/15/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      }
    ]
  },
  {
    id: 'clyy4f1ud000jw5x9lnnhjfwy',
    block: 'S3 Rating: Radar Training',
    imgUrl: 'https://images.pexels.com/photos/3582491/pexels-photo-3582491.jpeg?cs=srgb&dl=pexels-ibrahimboran-3582491.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        id: 'clz6yx1bq000fu72utbcx8hd5',
        chapter: 1,
        name: 'Introduction to Radar',
        link: 'https://docs.google.com/presentation/d/20/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx1bq000gu72utpgrjn6g',
        chapter: 2,
        name: 'Radar Procedures for Airport Operations',
        link: 'https://docs.google.com/presentation/d/21/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
    ]
  },
  {
    id: 'clyy4f1vu000mw5x9c9hluh5e',
    block: 'C1 Rating: Centre Training',
    imgUrl: 'https://images.pexels.com/photos/3402846/pexels-photo-3402846.jpeg?cs=srgb&dl=pexels-captainsopon-3402846.jpg&fm=jpg&h=853&w=1745&fit=crop',
    chapters: [
      {
        id: 'clz6yx1di000hu72uru83c1hx',
        chapter: 1,
        name: 'Indonesian Classes of Airspace',
        link: 'https://docs.google.com/presentation/d/23/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      },
      {
        id: 'clz6yx1di000iu72uussikkns',
        chapter: 2,
        name: 'Area Control Centre: Enroute Operations',
        link: 'https://docs.google.com/presentation/d/24/view?usp=sharing',
        isViewed: false,
        totalSlides: 7,
      }
    ]
  }
]


export const questions: Question[] = [
  {
    question: 'What is 2 + 2?',
    choices: ['4', '5', '6', '7'],
    answer: '4'
  },
  {
    question: 'What is a "mayday" call?',
    choices: ['Routine check-in', 'Emergency distress signal', 'Weather report', 'Altitude request'],
    answer: 'Emergency distress signal'
  },
  {
    question: 'What is the capital of Indonesia?',
    choices: ['Surabaya', 'Medan', 'Bali', 'Jakarta'],
    answer: 'Jakarta'
  },
  {
    question: 'Which phase of flight is considered the most critical for potential accidents?',
    choices: ['Cruise', 'Takeoff and landing', 'Taxiing', 'Holding'],
    answer: 'Takeoff and landing'
  },
  {
    question: 'What is the primary function of an altimeter?',
    choices: ['Measure airspeed', 'Measure altitude', 'Measure temperature', 'Measure wind speed'],
    answer: 'Measure altitude'
  },
  {
    question: 'What does the "black box" in an aircraft record?',
    choices: ['Passenger conversations', 'Flight data and cockpit voice recordings', 'Weather conditions', 'Fuel levels'],
    answer: 'Flight data and cockpit voice recordings'
  },
  {
    question: 'What does ATC stand for?',
    choices: ['Air Traffic Control', 'Aviation Technical Committee', 'Air Traffic Communication', 'Aerial Traffic Command'],
    answer: 'Air Traffic Control'
  },
  {
    question: 'What instrument is used to measure the angle of attack?',
    choices: ['Airspeed Indicator', 'Altimeter', 'Attitude Indicator', 'AOA Indicator'],
    answer: 'AOA Indicator'
  },
  {
    question: 'What is the purpose of a NOTAM?',
    choices: ['Weather forecast', 'Navigation update', 'Safety information', 'Regulatory changes'],
    answer: 'Safety information'
  },
  {
    question: 'What is the term for the speed at which an aircraft can safely take off?',
    choices: ['V1', 'V2', 'Vr', 'Vs'],
    answer: 'Vr'
  }
]