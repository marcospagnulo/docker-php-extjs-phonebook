<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Phonebook</title>

        <style type="text/css">

        ::selection { background-color: #E13300; color: white; }
        ::-moz-selection { background-color: #E13300; color: white; }

        body {
            background-color: #fff;
            margin: 40px;
            font: 13px/20px normal Helvetica, Arial, sans-serif;
            color: #4F5155;
        }

        #container {
            margin: 10px;
            border: 1px solid #D0D0D0;
            box-shadow: 0 0 8px #D0D0D0;
        }
        </style>
    </head>

    <body>

        <div id="container">

            <?php echo validation_errors(); ?>

            <?php echo form_open('auth/login'); ?>

                <h5>Email Address</h5>
                <input type="text" name="email" value="<?php echo set_value('email'); ?>" size="50" />

                <h5>Password</h5>
                <input type="text" name="password" value="<?php echo set_value('password'); ?>" size="50" />

                <div><input type="submit" value="Submit" /></div>

            </form>
        </div>

    </body>
</html>
