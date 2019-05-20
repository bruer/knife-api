<?php

class Entry extends Mapper {
    public function getAllEntries() {
      $statement = $this->db->prepare("SELECT * FROM entries");
      $statement->execute();

      return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getLatestPosts($quantity) {

        $statement = $this->db->prepare("SELECT * FROM entries ORDER BY createdAt DESC LIMIT {$quantity}");
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFirstPosts($quantity){

        $statement = $this->db->prepare("SELECT * FROM entries ORDER BY createdAt ASC LIMIT {$quantity}");
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEntriesByUserID($user){

      $statement = $this->db->prepare("SELECT * FROM entries WHERE userID = {$user}");
      $statement->execute();

      return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEntriesFrom($user, $quantity){

      $statement = $this->db->prepare("SELECT * FROM entries WHERE userID = {$user} ORDER BY createdAt DESC LIMIT {$quantity}");
      $statement->execute();

      return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function firstEntriesFrom($user, $quantity){
      $statement = $this->db->prepare("SELECT * FROM entries WHERE userID = {$user} ORDER BY createdAt ASC LIMIT {$quantity}");
      $statement->execute();

      return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
  }

?>