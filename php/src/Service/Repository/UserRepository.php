<?php

namespace Phonebook\Service\Repository;

use Phonebook\Service\Api\DoctrineRepository;

/**
 * Class UserRepository
 *
 * @package Phonebook\Service\Repository
 */
class UserRepository extends DoctrineRepository {

    /**
     * Return the class name to be used by the entity manager
     *
     * @return string
     */
    public function getEntityClass() {
        return "Phonebook\Service\Entities\User";
    }
}