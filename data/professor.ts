import { GradeType, PercentageType, RatingType } from '@/utils/types';

export const rating: RatingType = 2.6;
export const name = 'Jahan Ghofraniha';
export const reviewCount = 47;
export const email = 'YqVp3@example.com';
export const grade: GradeType = 'A-';
export const wouldTakeAgain: PercentageType = 52;
export const tags = [
  'Hilarious',
  'Respected',
  'Caring',
  'Amazing lectures',
  'Inspirational',
  'Accessible outside class',
  'Participation matters',
  'Graded by few things',
  'Clear grading criteria',
  'Get ready to read',
  'Lots of homework',
  'Tough grader',
];
export const ratingDistribution = [11, 5, 1, 7, 23];
export const gradeDistribution = [2, 15, 11, 20, 9];
export const professorSchedules = [
  {
    course: 'CMPE 132',
    section: '02',
    name: 'Information Security',
    enrollment: '10/34',
    satisfies: 'GE: A',
    units: 3,
    type: 'Lab',
    startDate: 'August 19, 2002',
    endDate: 'Dec 20, 2002',
    days: new Set(['M', 'W']),
    times: '9:00 AM - 10:15 AM',
    location: 'In Person - ENGR227',
    avgGrade: 'C-',
    avgOverallRating: 2,
    number: '23105',
  },
  {
    course: 'CMPE 180A',
    section: '01',
    name: 'Software Engineering I',
    enrollment: '33/34',
    satisfies: 'GE: A',
    units: 3,
    type: 'Lab',
    startDate: 'August 19, 2002',
    endDate: 'Dec 20, 2002',
    days: new Set(['M', 'W']),
    times: '9:00 AM - 10:15 AM',
    location: 'In Person - ENGR227',
    avgGrade: 'A+',
    avgOverallRating: 4.5,
    number: '23105',
  },
  {
    course: 'CMPE 180B',
    section: '01',
    name: 'Software Engineering II',
    enrollment: '34/34',
    satisfies: 'GE: A',
    units: 3,
    type: 'Lab',
    startDate: 'August 19, 2002',
    endDate: 'Dec 20, 2002',
    days: new Set(['M', 'W']),
    times: '9:00 AM - 10:15 AM',
    location: 'In Person - ENGR227',
    avgGrade: 'F',
    avgOverallRating: 1,
    number: '23105',
  },
];
