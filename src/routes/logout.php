<?php

return function ($app) {
    
    $auth = require __DIR__ . '/../middlewares/auth.php';

    $app->get('/api/logout', function ($request, $response) {   
      
      // $_SESSION = array();
      session_destroy();   
      
    })->add($auth);
};