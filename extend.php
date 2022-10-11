<?php

/*
 * This file is part of blomstra/turnstile.
 *
 * Copyright (c) 2022 Blomstra team.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Turnstile;

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->content(function (Document $document) {
            $document->head[] = '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script>';
        }),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Settings())
        ->default('blomstra-turnstile.secret_key', null)
        ->default('blomstra-turnstile.site_key', null)
        ->serializeToForum('blomstra-turnstile.site_key', 'blomstra-turnstile.site_key'),
];
