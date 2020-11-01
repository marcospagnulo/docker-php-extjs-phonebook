<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Auth
 */
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
        $this->lang->load(['common', 'login', 'home', 'error']);
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
     * Execute the authentication and redirect to home page if credentials are valid
     */
	public function login(){

        $user = $this->authModel->login();
        if ($user) {
            $this->session->set_userdata('user',$user);
            $this->load->view('home', ['user' => $this->authModel->getCurrentUser()]);
        }
        else {
            $this->load->view('login', ['error' => $this->lang->line('wrongCredentials')]);
        }
    }

    /**
     * Log out the user and redirect to login page
     */
    public function logout(){
	    $this->authModel->logout();
        $this->load->view('login');
    }
}
