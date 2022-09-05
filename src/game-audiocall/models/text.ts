export const GAME_AUDIOCALL_TITLE = 'Аудиовызов';

// eslint-disable-next-line max-len
export const GAME_AUDIOCALL_DESCRIPTION = 'Тренировка Аудиовызов улучшает твое восприятие речи на слух.';

// eslint-disable-next-line max-len
export const GAME_AUDIOCALL_LEVEL_SELECTED = 'Игра начнется с текущими словами из словаря. Удачи!';


export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
