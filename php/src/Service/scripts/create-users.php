<?php

/**
 * Initialize the user table with some users
 */

use Phonebook\Service\Entities\User;

require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';

$user = new User();
$user->setName('Administrator');