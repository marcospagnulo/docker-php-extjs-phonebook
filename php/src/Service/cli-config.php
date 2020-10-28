<?php
// cli-config.php
use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Phonebook\Service\DoctrineBootstrap;

$entityManager = DoctrineBootstrap::getEntityManager();
return ConsoleRunner::createHelperSet($entityManager);
