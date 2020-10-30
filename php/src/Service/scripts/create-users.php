<?php

/**
 * Initialize the user table with some users
 */

use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Phonebook\Service\DoctrineBootstrap;
use Phonebook\Service\Entities\User;

require_once __DIR__ . '/../../../vendor/autoload.php';

$admin = new User();
$admin->setName('Administrator');
$admin->setSurname('');
$admin->setEmail('admin@localhost.it');
$admin->setPassword('admin');

try {
    $entityManager = DoctrineBootstrap::getEntityManager();
    $entityManager->persist($admin);
    $entityManager->flush();
} catch (OptimisticLockException $e) {
    echo 'An error has occured:'.$e->getMessage();
} catch (ORMException $e) {
    echo 'An error has occured:'.$e->getMessage();
}

echo "Created Admin user with ID " . $admin->getId() . "\n";