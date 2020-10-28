<?php
/**
 * Define the behaviour of a repository
 */
namespace Phonebook\Service\Api;

use stdClass;

/**
 * Interface Repository
 *
 * @package Phonebook\Service\Api
 */
interface Repository {

    /**
     * Persist an entity
     *
     * @param stdClass $entity Entity to persist
     *
     * @return stdClass
     */
    public function save($entity);

    /**
     * Find an entity with the given id
     *
     * @param int $id Entity id
     *
     * @return stdClass
     */
    public function findById($id);

    /**
     * Find all entity
     *
     * @return array
     */
    public function findAll();

    /**
     * Remove an entity with the given id
     *
     * @param int $id Entity id
     *
     * @return void
     */
    public function delete($id);
}