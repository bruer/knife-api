<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Add a login route
  $app->post('/api/login', function ($request, $response) {
    
    $user = new User($this->db);
    $formdata = $request->getParsedBody();

    $users = $user->getUserByName($formdata['username-login']);

    foreach($users as $userdata) {
      
      if(password_verify($formdata['password-login'], $userdata['password'])){
        $_SESSION['loggedIn'] = true;
        $_SESSION['userID'] = $userdata['userID'];
        $_SESSION['username'] = $userdata['username'];
  
        return $response->withJson($userdata);
      }
    }

    return $response->withStatus(401);;

  });

  // Add a ping route
  $app->get('/api/ping', function ($request, $response, $args) {
    return $response->withJson(['loggedIn' => true]);
  })->add($auth);
};

