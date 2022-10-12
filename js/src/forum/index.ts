import app from 'flarum/forum/app';

import addTurnstileToSignUp from './extend/addTurnstileToSignUp';

app.initializers.add('blomstra/turnstile', () => {
  addTurnstileToSignUp();
});
