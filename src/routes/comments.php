<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  $app->get('/api/comments', function($request, $response) {
    $comment = new Comment($this->db);

    return $response->withJson($comment->getAll());
  });

  $app->post('/api/comment', function($request, $response) {
    $comment = new Comment($this->db);

    $data = $request->getParsedBody();

    $response->withJson($comment->post(
      $data['entryID'], $data['content'], $data['createdBy'], $data['createdAt']
    ));
    
    return $response->withJson($data);
  });
};
