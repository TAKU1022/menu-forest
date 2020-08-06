import { Food } from './food';

export interface DayMenu {
  breakfastId: string;
  lunchId: string;
  dinnerId: string;
}

export interface MyMenu {
  day: {
    sunday: DayMenu;
    monday: DayMenu;
    tuesday: DayMenu;
    wednesday: DayMenu;
    thursday: DayMenu;
    friday: DayMenu;
    saturday: DayMenu;
  };
  createrId: string;
  myMenuId: string;
  isPosted: boolean;
}

export interface DayMenuWithFood {
  breakfast: Food;
  lunch: Food;
  dinner: Food;
  dayOfWeek: string;
}

export interface MyMenuWithFood {
  sundayFood: DayMenuWithFood;
  mondayFood: DayMenuWithFood;
  tuesdayFood: DayMenuWithFood;
  wednesdayFood: DayMenuWithFood;
  thursdayFood: DayMenuWithFood;
  fridayFood: DayMenuWithFood;
  saturdayFood: DayMenuWithFood;
}
