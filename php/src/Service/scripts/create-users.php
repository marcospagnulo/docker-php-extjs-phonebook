<?php

/**
 * Initialize the user table with some users
 */

use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Phonebook\Service\DoctrineBootstrap;
use Phonebook\Service\Entities\Role;
use Phonebook\Service\Entities\User;

require_once __DIR__ . '/../../../vendor/autoload.php';

try {

    $entityManager = DoctrineBootstrap::getEntityManager();

    echo "Clear user table...\n";
    $repository = $entityManager->getRepository(User::class);
    $entities = $repository->findAll();
    foreach ($entities as $entity) {
        $entityManager->remove($entity);
    }

    echo "\n\nCreate admin user..\n";
    $admin = new User(null, 'Administrator', '', 'admin@localhost.it', 'admin', 1);
    $entityManager->persist($admin);
    $entityManager->flush();
    echo "Created Admin user with ID " . $admin->getId() . "\n";

    echo "\n\nCreate users...\n";
    for($i = 0; $i < 100; $i ++){
        $user = new User(null, 'Name ' .$i, 'Surname ' .$i, 'user'.$i.'@localhost.it', 'user', 2);
        $entityManager->persist($user);
        $entityManager->flush();
    }
    $entityManager->flush();
} catch (OptimisticLockException $e) {
    echo 'An error has occured:'.$e->getMessage();
} catch (ORMException $e) {
    echo 'An error has occured:'.$e->getMessage();
}