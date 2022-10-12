<?php

/*
 * This file is part of blomstra/turnstile.
 *
 * Copyright (c) 2022 Blomstra team.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Turnstile\Listeners;

use Blomstra\Turnstile\Validator\TurnstileValidator;
use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class RegisterValidate
{
    /**
     * @var TurnstileValidator
     */
    protected $validator;

    public function __construct(TurnstileValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(Saving $event)
    {
        if (!$event->user->exists) {
            $this->validator->assertValid([
                'turnstile' => Arr::get($event->data, 'attributes.turnstileToken'),
            ]);
        }
    }
}
