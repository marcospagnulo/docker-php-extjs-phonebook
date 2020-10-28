<?php

use Phonebook\Service\Repository\UserRepository;

defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

    /**
     * @var UserRepository
     */
    private $repository;

    public function __construct() {
        return $this->repository = new UserRepository();
    }

    /**
     * @return mixed
     */
    public function index(){
        header('Content-Type: application/json');
        $users = $this->repository->findAll();
        echo json_encode($users);
    }
}