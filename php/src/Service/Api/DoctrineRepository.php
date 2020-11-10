<?php


namespace Phonebook\Service\Api;

use Doctrine\ORM\ORMException;
use Phonebook\Service\DoctrineBootstrap;
use stdClass;

/**
 * Class DoctrineRepository
 *
 * @package Phonebook\Service\Api
 */
abstract class DoctrineRepository implements Repository {

    protected $entityManager;

    protected $repository;

    /**
     * DoctrineRepository constructor.
     *
     * @throws ORMException
     */
    public function __construct() {
        $this->entityManager = DoctrineBootstrap::getEntityManager();
        $className = $this->getEntityClass();
        $this->repository = $this->entityManager->getRepository($className);
    }

    /**
     * Persist an entity
     *
     * @param stdClass $entity Entity to persist
     *
     * @return stdClass
     * @throws ORMException
     */
    public function save($entity) {
        $this->entityManager->persist($entity);
        $this->entityManager->flush();
        return $entity;
    }

    /**
     * Find an entity with the given id
     *
     * @param int $id Entity id
     *
     * @return stdClass
     */
    public function findById($id) {
        return $this->repository->find($id);
    }

    /**
     * Find all entity
     *
     * @return array
     */
    public function findAll() {
        return $this->repository->findAll();
    }

    /**
     * Find entities with pagination
     *
     * @param int $page  Numner of page
     * @param int $limit Number of results
     *
     * @return mixed|void
     */
    public function findAllWithPagination($page, $limit){

        $first = $page * $limit;
        $class = $this->getEntityClass();
        $dql = 'SELECT e FROM ' . $class . ' e';
        return $this->entityManager->createQuery($dql)
                                   ->setFirstResult($first)
                                   ->setMaxResults($limit)
                                   ->getResult();
    }

    /**
     * Count all the entities
     *
     * @return int
     */
    public function count(){
        return $this->repository->count([]);
    }

    /**
     * Remove an entity with the given id
     *
     * @param int $id Entity id
     *
     * @return void
     * @throws ORMException
     */
    public function delete($id) {
        $entity = $this->findById($id);
        $this->entityManager->remove($entity);
        $this->entityManager->flush();
    }

    /**
     * Return the class name to be used by the entity manager
     *
     * @return string
     */
    public abstract function getEntityClass();
}