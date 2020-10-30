<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Phonebook</title>

        <style type="text/css">
        </style>
    </head>

    <body>

        <div id="container">

            <?php echo validation_errors(); ?>

            <?php echo form_open('auth/login'); ?>

                <h5><?php echo $this->lang->line('email')?></h5>
                <input type="text" name="email" value="<?php echo set_value('email'); ?>" size="50" />

                <h5><?php echo $this->lang->line('password')?></h5>
                <input type="text" name="password" value="<?php echo set_value('password'); ?>" size="50" />

                <div><input type="submit" value="<?php echo $this->lang->line('login')?>" /></div>

            <?php form_close() ?>
        </div>

    </body>
</html>
