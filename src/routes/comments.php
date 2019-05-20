<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  $app->get('/api/comments', function ($request, $response) {
    $comment = new Comment($this->db);

    return $response->withJson($comment->getComments());
  });
};
