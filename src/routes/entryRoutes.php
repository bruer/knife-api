<?php

return function ($app) {
    // Register auth middleware
    $auth = require __DIR__ . '/../middlewares/auth.php';
    
    //GET request för att hämta alla inlägg
      $app->get('/api/allEntries', function($request, $response, $args){
        $entries = new Entry($this->db);

        return $response->withJson($entries->getAllEntries());
      });

      //Get request för att hämta de X(20) senaste inläggen
      $app->get('/api/latestposts', function($request, $response, $args){
        $entries = new Entry($this->db);

        return $response->withJson($entries->getLatestPosts(20));
      });

      //Get request för att hämta de x(3) första inläggen
      $app->get('/api/firstposts', function($request, $response, $args){
        $entries = new Entry($this->db);

        return $response->withJson($entries->getFirstPosts(3));
      });

      //Get request för att hämta inlägg från en specifik användare
      $app->get('/api/entriesfrom', function($request, $response, $args){
        $entries = new Entry($this->db);

        return $response->withJson($entries->getEntriesByUserID(13));        
      });
      //GET request för att hämta de senaste X antal entries från en speficik användare,
      //första parametern är användare och andra antal entries
      $app->get('/api/entriesfromuser', function($request, $response, $args){
        $entries = new Entry($this->db);

        return $response->withJson($entries->getEntriesFrom(1, 20));
      });

      //GET request för att hämta de första X antal entries från en speficik användare,
      //första parametern är användare och andra antal entries
      $app->get('/api/firstentriesfromuser', function($request, $response, $args){
        $entries = new Entry($this->db);

        return $response->withJson($entries->firstEntriesFrom(1,20));
      });
    }
?>