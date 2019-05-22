<?php

class Entry extends Mapper {
    public function getAllEntries() {
      $statement = $this->db->prepare("SELECT * FROM entries");
      $statement->execute();

      return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEntryID($entryID){
      $statement = $this->db->prepare("SELECT * FROM entries WHERE entryID = {$entryID}");
      $statement->execute();

      return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function removeEntry($entryID){
      $statement = $this->db->prepare("DELETE FROM entries WHERE entryID = {$entryID}");
      $statement->execute();

      
    }

    public function updateEntry($entryID, $content){
      $statement = $this->db->prepare("UPDATE entries
      SET content = '{$content}'
      WHERE entryID = {$entryID}");

      $statement->execute();

    }

    public function getEntriesFrom($user, $quantity){

      $statement = $this->db->prepare("SELECT * FROM entries WHERE userID = {$user} ORDER BY createdAt DESC LIMIT {$quantity}");
      $statement->execute();

      return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

  }

?>