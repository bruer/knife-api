<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';
  
  //GET request för att hämta alla inlägg
  $app->get('/api/entries', function($request, $response, $args){
    $entries = new Entry($this->db);
    
    return $response->withJson($entries->getAllEntries());
  });
  
  //GET request för att hämta de senaste X antal entries från en speficik användare,
  //första parametern är användare och andra antal entries
  $app->get('/api/entries/{userID}/{quantity}', function($request, $response, $args){
    $entries = new Entry($this->db);
    $userID = $args['userID'];
    $quantity = $args['quantity'];
  
    return $response->withJson($entries->getEntriesFrom($userID, $quantity));
  });

      //Get request för att hämta specifikt inlägg
      $app->get('/api/entry/{entryID}', function($request, $response, $args){
        $entry = new Entry($this->db);
        $entryID = $args['entryID'];
        
        return $response->withJson($entry->getEntryID($entryID));
      });

      //delete request för att radera ett entry
      $app->delete('/api/entry/{entryID}', function($request, $response, $args){
        $entry = new Entry($this->db);
        $entryID = $args['entryID'];
        
        if ($entry->removeEntry($entryID)) {
         return $response->withJson(['success'=>TRUE]); 
        } else {
          return $response->withJson(['success'=>FALSE]);
        };
      });

      //Put request för att ändra ett entry
      $app->put('/api/entry/{entryID}/{content}', function($request, $response, $args){
        $entry = new Entry($this->db);
        $entryID = $args['entryID'];
        $content = $args['content'];
        
        if ($entry->updateEntry($entryID, $content)) {
          return $response->withJson(['success'=>TRUE]);
        } else {
          return $response->withJson(['success'=>FALSE]);
        }
      });
    }
?>