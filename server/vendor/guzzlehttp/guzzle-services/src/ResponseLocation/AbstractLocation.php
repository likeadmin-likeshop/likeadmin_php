<?php

namespace GuzzleHttp\Command\Guzzle\ResponseLocation;

use GuzzleHttp\Command\Guzzle\Parameter;
use GuzzleHttp\Command\ResultInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * Class AbstractLocation
 */
abstract class AbstractLocation implements ResponseLocationInterface
{
    /** @var string */
    protected $locationName;

    /**
     * Set the name of the location
     */
    public function __construct($locationName)
    {
        $this->locationName = $locationName;
    }

    /**
     * @return ResultInterface
     */
    public function before(
        ResultInterface $result,
        ResponseInterface $response,
        Parameter $model
    ) {
        return $result;
    }

    /**
     * @return ResultInterface
     */
    public function after(
        ResultInterface $result,
        ResponseInterface $response,
        Parameter $model
    ) {
        return $result;
    }

    /**
     * @return ResultInterface
     */
    public function visit(
        ResultInterface $result,
        ResponseInterface $response,
        Parameter $param
    ) {
        return $result;
    }
}
