import app from 'flarum/common/app';

app.initializers.add('blomstra/turnstile', () => {
  console.log('[blomstra/turnstile] Hello, forum and admin!');
});
