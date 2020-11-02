<?php

/**
 * Model for Auth controller
 */
class AuthModel extends CI_Model {

    /**
     * AuthModel constructor.
     */
    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        $this->load->library('form_validation');
        $this->load->database();
    }

    /**
     * Check if a user is authenticated in current session
     *
     * @return bool
     */
    public function isUserLogged(){
        return isset($this->session->user);
    }

    /**
     * Retrieve the user logged in current session
     *
     * @return mixed
     */
    public function getCurrentUser(){
        return $this->session->user;
    }

    /**
     * Query database with the given email and password and return the matching user
     *
     * @return array|bool
     */
    public function login(){

        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        // Login validation rules
        $this->form_validation->set_rules('email', 'Email', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required');

        if ($this->form_validation->run() == FALSE) {
            return false;
        }
        else {

            $email = $this->input->post('email');
            $password = $this->input->post('password');
            $query = $this->db->get_where('user' , ['email' => $email, 'password' => $password]);
            $result = $query->result();

            if(sizeof($result) > 0){
                return $result[0];
            } else {
                return false;
            }
        }
    }

    /**
     * Clear the user in session
     */
    public function logout(){
        $this->session->set_userdata('user', null);
    }
}