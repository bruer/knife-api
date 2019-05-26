<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Hämta alla kommentarer
  $app->get('/api/comments', function($request, $response) {
    $comment = new Comment($this->db);

    return $response->withJson($comment->getAll());
  });

  // Posta en kommentar
  $app->post('/api/comment', function($request, $response) {
    $comment = new Comment($this->db);
    $data = $request->getParsedBody();

    $comment->post($data['content']);
    
    return $response->withJson($data);
  });

  $app->post('/api/entry/{id}/comment', function($request, $response, $args) {
    $comment = new Comment($this->db);
    $entryID = $args['id'];
    $data = $request->getParsedBody();

    $comment->post($entryID, $data['content']);
    
    return $response->withJson($data);
  });

  // Uppdatera en kommentar
  $app->put('/api/comment/{id}', function($request, $response, $args) {
    $comment = new Comment($this->db);
    $commentID = $args['id'];
    $data = $request->getParsedBody();

    $comment->update($commentID, $data['content']);

    return $response->withJson($data);
  });

  // Ta bort en kommentar
  $app->delete('/api/comment/{id}', function($request, $response, $args) {
    $comment = new Comment($this->db);
    $commentID = $args['id'];

    $comment->delete($commentID);
  });

  // Hämta alla kommentarer från ett specifikt inlägg
  $app->get('/api/entry/{id}/comments', function($request, $response, $args) {
    $comment = new Comment($this->db);
    $entryID = $args['id'];

    return $response->withJson($comment->getAllFromEntry($entryID));
  });
};
