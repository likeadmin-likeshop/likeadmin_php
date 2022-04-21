# Guzzle Commands

This library uses Guzzle and provides the foundations to create fully-featured
web service clients by abstracting Guzzle HTTP *requests* and *responses* into
higher-level *commands* and *results*. A *middleware* system, analogous to, but
separate from, the one in the HTTP layer may be used to customize client
behavior when preparing commands into requests and processing responses into
results.

### Commands

Key-value pair objects representing an operation of a web service. Commands
have a name and a set of parameters.

### Results

Key-value pair objects representing the processed result of executing an
operation of a web service.

## Installing

This project can be installed using [Composer](https://getcomposer.org/):

```
composer require guzzlehttp/command
```

## Service Clients

Service Clients are web service clients that implement the
`GuzzleHttp\Command\ServiceClientInterface` and use an underlying Guzzle HTTP
client (`GuzzleHttp\ClientInterface`) to communicate with the service. Service
clients create and execute *commands* (`GuzzleHttp\Command\CommandInterface`),
which encapsulate operations within the web service, including the operation
name and parameters. This library provides a generic implementation of a service
client: the `GuzzleHttp\Command\ServiceClient` class.

## Instantiating a Service Client

The provided service client implementation (`GuzzleHttp\Command\ServiceClient`)
can be instantiated by providing the following arguments:

1. A fully-configured Guzzle HTTP client that will be used to perform the
   underlying HTTP requests. That is, an instance of an object implementing
   `GuzzleHttp\ClientInterface` such as `new GuzzleHttp\Client()`.
1. A callable that transforms a Command into a Request. The function should
   accept a `GuzzleHttp\Command\CommandInterface` object and return a
   `Psr\Http\Message\RequestInterface` object.
1. A callable that transforms a Response into a Result. The function should
   accept a `Psr\Http\Message\ResponseInterface` object and optionally a
   `Psr\Http\Message\RequestInterface` object, and return a
   `GuzzleHttp\Command\ResultInterface` object.
1. Optionally, a Guzzle HandlerStack (`GuzzleHttp\HandlerStack`), which can be
   used to add command-level middleware to the service client.

Below is an example configured to send and receive JSON payloads:

```php
use GuzzleHttp\Command\CommandInterface;
use GuzzleHttp\Command\Result;
use GuzzleHttp\Command\ResultInterface;
use GuzzleHttp\Command\ServiceClient;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\UriTemplate\UriTemplate;
use GuzzleHttp\Utils;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

$client = new ServiceClient(
    new HttpClient(),
    function (CommandInterface $command): RequestInterface {
        return new Request(
            'POST',
            UriTemplate::expand('/{command}', ['command' => $command->getName()]),
            ['Accept' => 'application/json', 'Content-Type' => 'application/json'],
            Utils::jsonEncode($command->toArray())
        );
    },
    function (ResponseInterface $response, RequestInterface $request): ResultInterface {
        return new Result(
            Utils::jsonDecode((string) $response->getBody(), true)
        );
    }
);
```

## Executing Commands

Service clients create command objects using the ``getCommand()`` method.

```php
$commandName = 'foo';
$arguments = ['baz' => 'bar'];
$command = $client->getCommand($commandName, $arguments);
```

After creating a command, you may execute the command using the `execute()`
method of the client.

```php
$result = $client->execute($command);
```

The result of executing a command will be an instance of an object implementing
`GuzzleHttp\Command\ResultInterface`. Result objects are `ArrayAccess`-ible and
contain the data parsed from HTTP response.

Service clients have magic methods that act as shortcuts to executing commands
by name without having to create the ``Command`` object in a separate step
before executing it.

```php
$result = $client->foo(['baz' => 'bar']);
```

## Asynchronous Commands

@TODO Add documentation

* ``-Async`` suffix for client methods
* Promises

```php
// Create and execute an asynchronous command.
$command = $command = $client->getCommand('foo', ['baz' => 'bar']);
$promise = $client->executeAsync($command);

// Use asynchronous commands with magic methods.
$promise = $client->fooAsync(['baz' => 'bar']);
```

@TODO Add documentation

* ``wait()``-ing on promises.

```php
$result = $promise->wait();

echo $result['fizz']; //> 'buzz'
```

## Concurrent Requests

@TODO Add documentation

* ``executeAll()``
* ``executeAllAsync()``.
* Options (``fulfilled``, ``rejected``, ``concurrency``)

## Middleware: Extending the Client

Middleware can be added to the service client or underlying HTTP client to
implement additional behavior and customize the ``Command``-to-``Result`` and
``Request``-to-``Response`` lifecycles, respectively.

## Security

If you discover a security vulnerability within this package, please send an email to security@tidelift.com. All security vulnerabilities will be promptly addressed. Please do not disclose security-related issues publicly until a fix has been announced. Please see [Security Policy](https://github.com/guzzle/command/security/policy) for more information.

## License

Guzzle is made available under the MIT License (MIT). Please see [License File](LICENSE) for more information.

## For Enterprise

Available as part of the Tidelift Subscription

The maintainers of Guzzle and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/packagist-guzzlehttp-command?utm_source=packagist-guzzlehttp-command&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)
