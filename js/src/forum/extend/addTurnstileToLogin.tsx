import { extend } from 'flarum/common/extend';
import LogInModal from 'flarum/forum/components/LogInModal';

import Turnstile from '../components/Turnstile';

export default function addTurnstileToLogin() {
  extend(LogInModal.prototype, 'loginParams', function (data) {
    data.turnstileToken = this.__turnstileToken;
  });

  extend(LogInModal.prototype, 'fields', function (fields) {
    fields.add(
      'turnstile',
      <Turnstile
        action="log_in"
        onTurnstileStateChange={(token) => {
          this.__turnstileToken = token;
        }}
      />,
      -5
    );
  });
}
