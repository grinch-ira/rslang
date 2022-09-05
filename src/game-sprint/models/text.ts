export const GAME_SPRINT_TITLE = 'Спринт';

// eslint-disable-next-line max-len
export const GAME_SPRINT_DESCRIPTION = 'Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд.';

// eslint-disable-next-line max-len
export const GAME_SPRINT_LEVEL_SELECTED = 'Игра начнется с текущими словами из словаря. Удачи!';


export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
