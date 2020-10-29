<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

    /**
     * @var AuthModel
     */
    public $authModel;

    /**
     * @var CI_Loader
     */
    public $load;

    /**
     * Auth constructor.
     */
    public function __construct() {
        parent::__construct();
        $this->load->model('authModel');
    }

    /**
     * Check if user is logged
     */
	public function index() {

        if ($this->authModel->isUserLogged()) {
            $this->load->view('home', ['user' => $this->authModel->getCurrentUser()]);
        } else {
            $this->load->view('login');
        }
	}

    /**
     * Execute the authentication
     */
	public function login(){

        if ($this->authModel->login()) {
            $this->load->view('home', ['user' => $this->authModel->getCurrentUser()]);
        }
        else {
            $this->load->view('login');
        }
    }

    public function logout(){
	    $this->authModel->logout();
        $this->load->view('login');
    }
}
