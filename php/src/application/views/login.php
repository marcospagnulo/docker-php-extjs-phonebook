<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Phonebook</title>

        <style type="text/css">
            #container{
                margin: 0 auto;
                width: 300px;
            }
            h5 {
                text-align: center;
                margin: 10px 0;
            }
            input {
                width: 100%;
            }
            input[type="submit"] {
                width: auto;
                margin: 15px auto;
                display: block;
            }
            .error {
                color: red;
            }
        </style>
    </head>

    <body>

        <div id="container">

            <div class="error">
                <?php
                    echo validation_errors();
                    if(isset($error)){
                        echo $error;
                    }
                 ?>
            </div>

            <?php echo form_open('auth/login'); ?>

                <h5><?php echo $this->lang->line('email')?></h5>
                <input type="text" name="email" value="<?php echo set_value('email'); ?>" />

                <h5><?php echo $this->lang->line('password')?></h5>
                <input type="text" name="password" value="<?php echo set_value('password'); ?>"  />

                <input type="submit" value="<?php echo $this->lang->line('login')?>" />

            <?php form_close() ?>
        </div>

    </body>
</html>
