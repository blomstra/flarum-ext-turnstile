<?php

/*
 * This file is part of blomstra/turnstile.
 *
 * Copyright (c) 2022 Team Blomstra.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Turnstile;

use Blomstra\Turnstile\Listeners\AddValidatorRule;
use Blomstra\Turnstile\Validator\TurnstileValidator;
use Flarum\Api\ForgotPasswordValidator;
use Flarum\Extend;
use Flarum\Forum\LogInValidator;
use Flarum\Frontend\Document;
use Flarum\User\Event\Saving as UserSaving;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->content(function (Document $document) {
            $document->head[] = '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script>';
        }),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->default('blomstra-turnstile.secret_key', null)
        ->default('blomstra-turnstile.site_key', null)
        ->default('blomstra-turnstile.signup', true)
        ->default('blomstra-turnstile.signin', false)
        ->default('blomstra-turnstile.forgot', true)
        ->serializeToForum('blomstra-turnstile.site_key', 'blomstra-turnstile.site_key')
        ->serializeToForum('turnstile_dark_mode', 'theme_dark_mode', 'boolVal')
        ->serializeToForum('blomstra-turnstile.signup', 'blomstra-turnstile.signup', 'boolVal')
        ->serializeToForum('blomstra-turnstile.signin', 'blomstra-turnstile.signin', 'boolVal')
        ->serializeToForum('blomstra-turnstile.forgot', 'blomstra-turnstile.forgot', 'boolVal'),

    (new Extend\Validator(TurnstileValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Validator(LogInValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Validator(ForgotPasswordValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Event())
        ->listen(UserSaving::class, Listeners\RegisterValidate::class),
];
