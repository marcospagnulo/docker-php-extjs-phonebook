<?php

/**
 * Docktrine bootstrap
 */

namespace Phonebook\Service;

use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

/**
 * Class DocktrineBootstrap
 *
 * @package Phonebook\Service
 */
class DoctrineBootstrap {

    /**
     * Return the entity manager for access to db
     *
     * @return EntityManager
     * @throws ORMException
     */
    public static function getEntityManager(){

        $isDevMode = true;
        $proxyDir = null;
        $cache = null;
        $useSimpleAnnotationReader = false;
        $config = Setup::createAnnotationMetadataConfiguration(array(__DIR__ . "/../Service"), $isDevMode, $proxyDir, $cache, $useSimpleAnnotationReader);

        // database configuration parameters
        $conn = array(
            'driver'   => 'pdo_mysql',
            'host'     => '172.20.0.4',
            'dbname'   => 'phonebook',
            'user'     => 'root',
            'password' => 'example'
        );

        // obtaining the entity manager
        return $entityManager = EntityManager::create($conn, $config);
    }
}