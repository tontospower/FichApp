export interface Entry {
    key: string;
    date: number;
    type: string;
    comment: string;
    diffTimeValue?: number;
    diffTime?: Date;
  }