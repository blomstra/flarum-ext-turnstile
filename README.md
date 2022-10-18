# Turnstile

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/blomstra/turnstile.svg)](https://packagist.org/packages/blomstra/turnstile) [![Total Downloads](https://img.shields.io/packagist/dt/blomstra/turnstile.svg)](https://packagist.org/packages/blomstra/turnstile)

A [Flarum](http://flarum.org) extension. Implement Cloudflare Turnstile into your Flarum forum.

Turnstile is a CAPTCHA alternative that is privacy-focused. As of writing, Turnstile is in beta, and free to all Cloudflare customers on any plan.

To configure this extension, you'll need to [generate Turnstile keys on your Cloudflare account](https://dash.cloudflare.com/?to=/:account/turnstile), and input these on the admin dashboard.

## Features

At present, only the `Signup` modal is protected, further options may be added in the future.

## Installation

Install with composer:

```sh
composer require blomstra/turnstile:"*"
```

## Updating

```sh
composer update blomstra/turnstile:"*"
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/blomstra/turnstile)
- [GitHub](https://github.com/blomstra/flarum-ext-turnstile)
- [Discuss](https://discuss.flarum.org/d/31790)
