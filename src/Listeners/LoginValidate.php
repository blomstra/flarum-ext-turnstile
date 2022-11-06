<?php

namespace Blomstra\Turnstile\Listeners;

use Blomstra\Turnstile\Validator\TurnstileValidator;
use Flarum\User\Event\LoggingIn;
use Illuminate\Support\Arr;

class LoginValidate
{
    /**
     * @var TurnstileValidator
     */
    protected $validator;

    public function __construct(TurnstileValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(LoggingIn $event)
    {
        $this->validator->assertValid([
            'turnstile' => Arr::get($event->params, 'turnstileToken'),
        ]);
    }
}
