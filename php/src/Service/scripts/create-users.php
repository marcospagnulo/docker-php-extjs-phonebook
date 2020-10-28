<?php

/**
 * Initialize the user table with some users
 */

use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Phonebook\Service\DoctrineBootstrap;
use Phonebook\Service\Entities\User;

require_once __DIR__ . '/../../../vendor/autoload.php';

$user = new User();
$user->setName('Administrator');
$user->setSurname('');
$user->setEmail('admin@localhost.it');
$user->setPassword('admin');

try {
    $entityManager = DoctrineBootstrap::getEntityManager();
    $entityManager->persist($user);
    $entityManager->flush();
} catch (OptimisticLockException $e) {
    echo 'An error has occured:'.$e->getMessage();
} catch (ORMException $e) {
    echo 'An error has occured:'.$e->getMessage();
}

echo "Created Admin user with ID " . $user->getId() . "\n";