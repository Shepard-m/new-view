import { FilterLevel, FilterType } from '../const';

export type FilterTypeKeys = keyof typeof FilterType;
export type FilterTypeValues = (typeof FilterType)[FilterTypeKeys];
export type FilterLevelsKeys = keyof typeof FilterLevel;
export type FilterLevelsValues = (typeof FilterLevel)[FilterLevelsKeys];
