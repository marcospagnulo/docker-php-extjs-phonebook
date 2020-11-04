<?php
/**
 * Rest api for user entity
 */
use Phonebook\Service\Repository\UserRepository;

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Users
 */
class Users extends CI_Controller {

    /**
     * @var UserRepository
     */
    private $repository;

    public function __construct() {
        parent::__construct();
        $this->repository = new UserRepository();
    }

    /**
     * @return mixed
     */
    public function index(){
        header('Content-Type: application/json');
        $users = $this->repository->findAll();
        echo json_encode($users);
    }

    public function login(){

        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');

        if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
            http_response_code(200);
            return;
        }

        $email = $this->input->post('email');
        $password = $this->input->post('password');
        $user = $this->repository->findByEmailAndPassword($email, $password);

        if($user){
            header('Content-Type: application/json');
            echo json_encode($user);
        } else {
            http_response_code(401);
        }
    }
}