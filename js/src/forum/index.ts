import app from 'flarum/forum/app';

app.initializers.add('blomstra/turnstile', () => {
  console.log('[blomstra/turnstile] Hello, forum!');
});
