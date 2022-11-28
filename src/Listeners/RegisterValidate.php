<?php

/*
 * This file is part of blomstra/turnstile.
 *
 * Copyright (c) 2022 Team Blomstra.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Turnstile\Listeners;

use Blomstra\Turnstile\Validator\TurnstileValidator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class RegisterValidate
{
    /**
     * @var TurnstileValidator
     */
    protected $validator;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(TurnstileValidator $validator, SettingsRepositoryInterface $settings)
    {
        $this->validator = $validator;
        $this->settings = $settings;
    }

    public function handle(Saving $event)
    {
        if (! $event->user->exists && $this->settings->get('blomstra-turnstile.signup')) {
            $this->validator->assertValid([
                'turnstile' => Arr::get($event->data, 'attributes.turnstileToken'),
            ]);
        }
    }
}
