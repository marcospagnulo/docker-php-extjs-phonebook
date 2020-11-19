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

    /**
     * Users constructor.
     *
     * @throws ORMException
     */
    public function __construct() {
        parent::__construct(new UserRepository());
    }

    /**
     * Find a user with the given credentials
     */
    public function login(){

        $this->checkOptionsAndEnableCors();

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
        $this->findAllWithPagination();
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

        $this->checkOptionsAndEnableCors();

        if(isset($page) && isset($limit)){
            $users = $this->repository->findAll();
            $count = $this->repository->count();
            echo json_encode([ "data" => $users, "count" => $count ]);
        } else {
            $this->handleError('Missing page and limit parameter');
        }
    }

    /**
     * Find entities with pagination
     *
     * @return void
     */
    public function findAllWithPagination() {

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

        try {

            $this->checkOptionsAndEnableCors();

            $data = $this->input->post();

            if(isset($data['id'])){
                $user = $this->repository->findById($data['id']);
                $user->setName($data['name']);
                $user->setSurname($data['surname']);
                $user->setEmail($data['email']);
                $user->setPhone($data['phone']);
                $user->setAddress($data['address']);
                $user->setPassword($data['password']);
                $user->setRole($data['role']);
            } else {
                $user = new User(null, $data['name'], $data['surname'], $data['email'], $data['password'],
                                 $data['phone'], $data['address'], $data['role']);
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
     * Remove an entity with the given id
     *
     * @return void
     */
    public function delete() {

        try{

            $this->checkOptionsAndEnableCors();

            $id = $this->input->get('id');
            if(isset($id)){
                $this->repository->delete((int) $id);
                echo json_encode([ "data" => 'User id '.$id. ' deleted' ]);
            } else {
                $this->handleError('Missing id parameter');
            }
        } catch (ORMException $e) {
            $this->handleError($e->getMessage());
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            $this->handleError($e->getMessage());
        }
    }
}