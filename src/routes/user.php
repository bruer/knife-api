<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Hämta alla användare
  $app->get('/api/users', function($request, $response, $args){
    $users = new User($this->db);
    return $response->withJson($users->getAllUsers());
  });

  // Ny användare
  $app->post('/api/user', function ($request, $response) {
    $user = new User($this->db);
    $data = $request->getParsedBody();
    $response->withJson($user->registerUser(
      $data['username'], $data['password']
    ));
    return $response->withJson($data);
  });

  // Hämta specifik användare 
  $app->get('/api/user/{id}', function ($request, $response, $args) {
    $user = new User($this->db);
    $userID = $args['id'];
    return $response->withJson($user->getUserByID($userID));
  });

  // Ta bort användare
  $app->delete('/api/user/{id}', function($request, $response, $args) {
    $user = new User($this->db);
    $userID = $args['id'];
    $user->deleteUser($userID);
  });
};
