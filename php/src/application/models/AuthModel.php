<?php

/**
 * Class AuthModel
 */
class AuthModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        $this->load->library('form_validation');
        $this->load->database();
    }

    public function isUserLogged(){
        return isset($this->session->user);
    }

    public function getCurrentUser(){
        return $this->session->user;
    }

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
                $this->session->set_userdata('user',$result[0]);
                return true;
            } else {
                return false;
            }
        }
    }

    public function logout(){
        $this->session->set_userdata('user', null);
    }
}