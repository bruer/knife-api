<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Basic protected GET route 
  $app->get('/user/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $user = new User($this->db);

    return $response->withJson($user->getUserByID($userID));
  })->add($auth);

  // 
  $app->post('/api/user', function ($request, $response) {
      $user = new User($this->db);
      $data = $request->getParsedBody();
      $response->withJson($user->registerUser(
        $data['username'], $data['password']
      ));
      return $response->withJson($data);
  });

  // Get all users
  $app->get('/api/users', function($request, $response, $args){
    $users = new User($this->db);
    
    return $response->withJson($users->getAllUsers());
  });
};
