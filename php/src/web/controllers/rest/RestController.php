<?php


use Phonebook\Service\Api\DoctrineRepository;

abstract class RestController extends CI_Controller {

    /**
     * @var DoctrineRepository
     */
    protected $repository;

    /**
     * Set header for enable cross domain ajax and json responsetype
     */
    protected function setHeaders(){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header('Content-Type: application/json');
    }

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
     * Put in response an object containing the error
     *
     * @param string $msg Error message
     *
     * @return void
     */
    private function handleError($msg){
        http_response_code(500);
        echo json_encode([ "data" => $msg]);
    }

    public function index(){

        $this->setHeaders();

        $page = $this->input->get('page');
        $limit = $this->input->get('limit');

        if(isset($page) && isset($limit)){
            $users = $this->repository->findAllWithPagination($page - 1, $limit);
            $count = $this->repository->count();
            echo json_encode([ "data" => $users, "count" => $count ]);
        } else {
            $this->handleError('Missing page and limit parameter');
        }
    }

    /**
     * Persist an entity
     *
     * @param stdClass $entity Entity to persist
     *
     * @return stdClass
     */
    public function save($entity){

    }

    /**
     * Find an entity with the given id
     *
     * @param int $id Entity id
     *
     * @return stdClass
     */
    public function findById($id){

    }

    /**
     * Find all entity
     *
     * @return array
     */
    public function findAll(){

    }

    /**
     * Find entities with pagination
     *
     * @param int $page  Number of page
     * @param int $limit Number of results
     *
     * @return mixed
     */
    public function findAllWithPagination($page, $limit){

    }

    /**
     * Count all the entities
     *
     * @return int
     */
    public function count(){

    }

    /**
     * Remove an entity with the given id
     *
     * @param int $id Entity id
     *
     * @return void
     */
    public function delete($id){

    }
}