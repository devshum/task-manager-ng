import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeDelay = trigger('fadeDelay', [
  state('void', style({ opacity: 0} )),
  transition('void => *', [
    animate('400ms 400ms')
  ]),
  transition('* => void', [
    animate(400)
  ]),
]);

export const fadeCommon = trigger('fadeCommon', [
  state('void', style({ opacity: 0} )),
  transition(':enter, :leave', [
    animate(400)
  ]),
]);
