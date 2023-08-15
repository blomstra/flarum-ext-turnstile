<?php

/*
 * This file is part of blomstra/turnstile.
 *
 * Copyright (c) 2022 Blomstra Ltd.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Blomstra\Turnstile\Turnstile;

class Turnstile
{
    /**
     * @var string
     */
    protected $secretKey;

    /**
     * @var \GuzzleHttp\Client
     */
    protected $client;

    public function __construct(string $secretKey)
    {
        $this->secretKey = $secretKey;

        $this->client = new \GuzzleHttp\Client([
            'base_uri' => 'https://challenges.cloudflare.com/turnstile/v0/',
        ]);
    }

    /**
     * Sends request to Cloudflare's `siteverify` endpoint and returns the raw response.
     *
     * To check for success, access the `success` boolean property of the associative
     * array this returns.
     *
     * @param string $response
     * @return array
     */
    public function verify(string $response)
    {
        $response = $this->client->request('POST', 'siteverify', [
            'form_params' => [
                'secret' => $this->secretKey,
                'response' => $response,
                // 'remoteip' => ''
            ]
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
