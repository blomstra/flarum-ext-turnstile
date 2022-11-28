import app from 'flarum/forum/app';
import addTurnstileToForgotPassword from './extend/addTurnstileToForgotPassword';
import addTurnstileToLogin from './extend/addTurnstileToLogin';

import addTurnstileToSignUp from './extend/addTurnstileToSignUp';

app.initializers.add('blomstra/turnstile', () => {
  addTurnstileToSignUp();
  addTurnstileToLogin();
  addTurnstileToForgotPassword();
});
