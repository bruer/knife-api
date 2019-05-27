<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Add a login route
  $app->post('/api/login', function ($request, $response) {
    
    $user = new User($this->db);
    $data = $request->getParsedBody();

    $userdata = $user->getUserByName($data['username-login']);

    if(password_verify($data['password-login'], $userdata['password'])){
      $_SESSION['loggedIn'] = true;
      $_SESSION['userID'] = $userdata['userID'];
      $_SESSION['username'] = $userdata['username'];
      return $response->withJson($userdata);
    }
    else {
      return $response->withStatus(401);
    }

    // if ($data['username-login'] && $data['password-login']) {
    //   // In a real example, do database checks here
    //   $_SESSION['loggedIn'] = true;
    //   $_SESSION['username-login'] = $data['username-login'];

    //   return $response->withJson($data);
    // } else {
    //   return $response->withStatus(401);
    // }
  });

  // Add a ping route
  $app->get('/api/ping', function ($request, $response, $args) {
    return $response->withJson(['loggedIn' => true]);
  })->add($auth);
};

