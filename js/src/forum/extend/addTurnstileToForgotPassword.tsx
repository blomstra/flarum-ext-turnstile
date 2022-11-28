import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ForgotPasswordModal from 'flarum/forum/components/ForgotPasswordModal';

import Turnstile from '../components/Turnstile';

export default function addTurnstileToForgotPassword() {
  extend(ForgotPasswordModal.prototype, 'requestParams', function (data) {
    if (!!!app.forum.attribute('blomstra-turnstile.forgot')) return;

    data.turnstileToken = this.__turnstileToken;
  });

  extend(ForgotPasswordModal.prototype, 'fields', function (fields) {
    if (!!!app.forum.attribute('blomstra-turnstile.forgot')) return;

    fields.add(
      'turnstile',
      <Turnstile
        action="forgot_pw"
        onTurnstileStateChange={(token) => {
          this.__turnstileToken = token;
        }}
      />,
      -5
    );
  });
}
