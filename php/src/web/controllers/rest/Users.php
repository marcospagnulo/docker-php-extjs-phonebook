<?php
/**
 * Rest api for user entity
 */
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
}