<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  $app->post('/api/newpost', function ($request, $response) {
    $entry = new Entry($this->db);
    $data = $request->getParsedBody();
    var_dump($data);
    $response->withJson($entry->newPost(
      $data['title'], $data['content']
    ));
    return $response->withJson($data);
});
};