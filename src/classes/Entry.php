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

    // Posta ett nytt inlägg
    public function newPost($title, $content) {
      $statement = $this->db->prepare(
        "INSERT INTO entries (title, content, createdAt, userID)
        VALUES (:title, :content, NOW(), :userID)"
      );
      $statement->execute([
        ':title' => $title,
        ':content'=> $content,
        ':userID'=> 1
      ]);
      $self = $_SERVER['PHP_SELF'];
      header("Location: $self");
    }

  }

?>