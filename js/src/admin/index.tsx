import app from 'flarum/admin/app';

app.initializers.add('blomstra/turnstile', () => {
  app.extensionData
    .for('blomstra-turnstile')
    .registerSetting({
      setting: 'blomstra-turnstile.site_key',
      type: 'text',
      label: app.translator.trans('blomstra-turnstile.admin.settings.site_key'),
      help: app.translator.trans('blomstra-turnstile.admin.settings.help_text', {
        a: <a href="https://dash.cloudflare.com/?to=/:account/turnstile" target="_blank" rel="noopener" />,
      }),
    })
    .registerSetting({
      setting: 'blomstra-turnstile.secret_key',
      type: 'text',
      label: app.translator.trans('blomstra-turnstile.admin.settings.secret_key'),
    })
    .registerSetting({
      setting: 'blomstra-turnstile.signup',
      type: 'bool',
      label: app.translator.trans('blomstra-turnstile.admin.settings.signup'),
    })
    .registerSetting({
      setting: 'blomstra-turnstile.signin',
      type: 'bool',
      label: app.translator.trans('blomstra-turnstile.admin.settings.signin'),
    })
    .registerSetting({
      setting: 'blomstra-turnstile.forgot',
      type: 'bool',
      label: app.translator.trans('blomstra-turnstile.admin.settings.forgot'),
    });
});
