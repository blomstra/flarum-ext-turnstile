import { extend } from 'flarum/common/extend';
import SignUpModal from 'flarum/forum/components/SignUpModal';

import Turnstile from '../components/Turnstile';

export default function addTurnstileToSignUp() {
  extend(SignUpModal.prototype, 'submitData', function (data) {
    data.turnstileToken = this.__turnstileToken;
  });

  extend(SignUpModal.prototype, 'fields', function (fields) {
    fields.add(
      'turnstile',
      <Turnstile
        action="sign_up"
        onTurnstileStateChange={(token) => {
          this.__turnstileToken = token;
        }}
      />,
      -5
    );
  });
}
