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
     * @param object $entity Entity to persist
     *
     * @return object
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
     * @return object
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
     * @param int   $page  Numner of page
     * @param int   $limit Number of results
     * @param array $sort  Array containing properties and directions for sorting results
     *
     * @return mixed|void
     */
    public function findAllWithPagination($page, $limit, $sort){

        $first = $page * $limit;
        $class = $this->getEntityClass();
        $dql = 'SELECT e FROM ' . $class . ' e';

        if(isset($sort)){
            $sortBy = "";
            foreach($sort as $s){
                $sortBy = $sortBy === "" ? " ORDER BY e.".$s->property." ".$s->direction : ", e.".$s->property." "
                    .$s->direction;
            }
            $dql .= $sortBy;
        }

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