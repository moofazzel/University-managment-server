import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonth,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields = ['title', 'code', 'year'];

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
