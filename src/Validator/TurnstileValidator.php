<?php

/*
 * This file is part of blomstra/turnstile.
 *
 * Copyright (c) 2022 Blomstra Ltd.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Turnstile\Validator;

use Flarum\Foundation\AbstractValidator;

class TurnstileValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'turnstile' => ['turnstile'],
    ];
}
