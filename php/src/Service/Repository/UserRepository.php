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

    public function findByEmailAndPassword($email, $password) {

        $sql = 'SELECT u FROM Phonebook\Service\Entities\User u WHERE u.email = :email AND u.password = :password';
        $query = $this->entityManager->createQuery($sql);
        $query->setParameters(["email" => $email, "password" => $password]);
        $result = $query->getResult();

        if (sizeof($result) > 0) {
            return $result[0];
        } else {
            return false;
        }
    }
}