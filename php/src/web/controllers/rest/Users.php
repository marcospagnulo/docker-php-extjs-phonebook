<?php
/**
 * Rest api for user entity
 */

use Doctrine\ORM\ORMException;
use Phonebook\Service\Entities\User;
use Phonebook\Service\Repository\UserRepository;

require_once ('RestController.php');

/**
 * Class Users
 */
class Users extends RestController {

    public function __construct() {
        parent::__construct(new UserRepository());
    }

    public function login(){

        $this->setHeaders();

        if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
            http_response_code(200);
            return;
        }

        $email = $this->input->post('email');
        $password = $this->input->post('password');
        $user = $this->repository->findByEmailAndPassword($email, $password);

        if($user){
            echo json_encode($user);
        } else {
            http_response_code(401);
        }
    }

    public function index(){

        $this->checkOptionsAndEnableCors();

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
     * @return void
     */
    public function save(){

        $this->checkOptionsAndEnableCors();

        try {

            $data = $this->input->post();

            if(isset($data['id'])){
                $user = $this->repository->findById($data['id']);
                $user->setName($data['name']);
                $user->setSurname($data['surname']);
                $user->setEmail($data['email']);
                $user->setRole($data['role']);
            } else {
                $user = new User(null, $data['name'], $data['surname'], $data['email'], $data['password'], $data['role']);
            }
            $user = $this->repository->save($user);

            echo json_encode([ "data" => $user ]);
        } catch (ORMException $e) {
            $this->handleError($e->getMessage());
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            $this->handleError($e->getMessage());
        }
    }

    /**
     * Find an entity with the given id
     *
     * @return void
     */
    public function findById() {
        // TODO: Implement findById() method.
    }

    /**
     * Find all entity
     *
     * @return void
     */
    public function findAll() {
        // TODO: Implement findAll() method.
    }

    /**
     * Find entities with pagination
     *
     * @return void
     */
    public function findAllWithPagination() {
        // TODO: Implement findAllWithPagination() method.
    }

    /**
     * Count all the entities
     *
     * @return void
     */
    public function count() {
        // TODO: Implement count() method.
    }

    /**
     * Remove an entity with the given id
     *
     * @return void
     */
    public function delete() {
        // TODO: Implement delete() method.
    }
}