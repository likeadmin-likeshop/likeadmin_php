<?php

namespace GuzzleHttp\Command\Guzzle\QuerySerializer;

interface QuerySerializerInterface
{
    /**
     * Aggregate query params and transform them into a string
     *
     * @return string
     */
    public function aggregate(array $queryParams);
}
