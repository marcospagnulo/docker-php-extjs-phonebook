<?php


use Doctrine\ORM\ORMException;
use Phonebook\Service\Api\DoctrineRepository;

abstract class RestController extends CI_Controller {

    /**
     * @var DoctrineRepository
     */
    protected $repository;

    /**
     * RestController constructor.
     *
     * @param DoctrineRepository $repository
     */
    public function __construct(DoctrineRepository $repository) {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Set headers for enable cross domain and json response type.
     *
     * @return void
     */
    protected function checkOptionsAndEnableCors(){

        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header('Access-Control-Allow-Methods: *');
        header('Content-Type: application/json');

        if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
            http_response_code(200);
            exit;
        }
    }

    /**
     * Put in response an object containing the error
     *
     * @param string $msg Error message
     *
     * @return void
     */
    protected function handleError($msg){
        http_response_code(500);
        echo json_encode([ "data" => $msg]);
    }

    /**
     * Persist an entity
     *
     * @return void
     */
    public abstract function save();
    /**
     * Find an entity with the given id
     *
     * @return void
     */
    public abstract function findById();

    /**
     * Find all entity
     *
     * @return void
     */
    public abstract function findAll();

    /**
     * Find entities with pagination
     *
     * @return void
     */
    public abstract function findAllWithPagination();

    /**
     * Count all the entities
     *
     * @return void
     */
    public abstract function count();

    /**
     * Remove an entity with the given id
     *
     * @return void
     */
    public abstract function delete();
}