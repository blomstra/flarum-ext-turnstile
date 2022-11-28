<?php

/*
 * This file is part of blomstra/turnstile.
 *
 * Copyright (c) 2022 Blomstra Ltd.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Turnstile\Listeners;

use Blomstra\Turnstile\Turnstile\Turnstile;
use Flarum\Api\ForgotPasswordValidator;
use Flarum\Forum\LogInValidator;
use Flarum\Foundation\AbstractValidator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Validation\Validator;

class AddValidatorRule
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(AbstractValidator $flarumValidator, Validator $validator)
    {
        $secret = $this->settings->get('blomstra-turnstile.secret_key');

        $validator->addExtension(
            'turnstile',
            function ($attribute, $value, $parameters) use ($secret) {
                if (! is_string($value) || ! is_string($secret)) {
                    return false;
                }

                return ! empty($value) && (new Turnstile($secret))->verify($value)['success'];
            }
        );

        if ($flarumValidator instanceof LogInValidator && $this->settings->get('blomstra-turnstile.signin')) {
            $validator->addRules([
                'turnstileToken' => ['required', 'turnstile'],
            ]);
        }

        if ($flarumValidator instanceof ForgotPasswordValidator && $this->settings->get('blomstra-turnstile.forgot')) {
            $validator->addRules([
                'turnstileToken' => ['required', 'turnstile'],
            ]);
        }
    }
}
