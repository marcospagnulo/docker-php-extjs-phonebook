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
     * Find entities with pagination
     *
     * @param int   $page  Number of page
     * @param int   $limit Number of results
     * @param array $sort  Array containing properties and direction for sorting results
     *
     * @return mixed
     */
    public function findAllWithPagination($page, $limit, $sort);

    /**
     * Count all the entities
     *
     * @return int
     */
    public function count();

    /**
     * Remove an entity with the given id
     *
     * @param int $id Entity id
     *
     * @return void
     */
    public function delete($id);
}