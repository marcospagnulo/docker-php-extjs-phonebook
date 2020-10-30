<?php
    defined('BASEPATH') OR exit('No direct script access allowed');

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Phonebook</title>
    </head>

    <body>

        <div id="container">
            <?php echo $this->lang->line('welcome').' '.$user->name ?>
            <?php echo form_open('auth/logout'); ?>
                <div><input type="submit" value="<?php echo $this->lang->line('logout') ?>" /></div>
            <?php form_close() ?>
        </div>

    </body>
</html>
