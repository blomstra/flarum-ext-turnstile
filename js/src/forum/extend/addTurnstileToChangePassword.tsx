import app from 'flarum/forum/app';
import { override, extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import ChangePasswordModal from 'flarum/forum/components/ChangePasswordModal';

import Turnstile from '../components/Turnstile';

export default function addTurnstileToForgotPassword() {
  ChangePasswordModal.prototype.__turnstileToken = null;

  extend(ChangePasswordModal.prototype, 'oninit', function (this: ChangePasswordModal) {
    this.loading = true;
  });

  override(ChangePasswordModal.prototype, 'content', function (this: ChangePasswordModal, original) {
    if (!!!app.forum.attribute('blomstra-turnstile.forgot')) return;

    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <p className="helpText">{app.translator.trans('core.forum.change_password.text')}</p>
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary Button--block',
                type: 'submit',
                loading: this.loading,
                disabled: this.loading,
              },
              app.translator.trans('core.forum.change_password.send_button')
            )}
          </div>
          <Turnstile
            action="forgot_pw"
            onTurnstileStateChange={(token) => {
              this.__turnstileToken = token;
              this.loading = false;
              m.redraw();
            }}
          />
        </div>
      </div>
    );
  });

  override(ChangePasswordModal.prototype, 'onsubmit', function (this: ChangePasswordModal, original, e: SubmitEvent) {
    if (!!!app.forum.attribute('blomstra-turnstile.forgot')) return;

    e.preventDefault();

    this.loading = true;

    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/forgot',
        body: {
          email: app.session.user!.email(),
          turnstileToken: this.__turnstileToken,
        },
      })
      .then(this.hide.bind(this), this.loaded.bind(this));
  });
}
