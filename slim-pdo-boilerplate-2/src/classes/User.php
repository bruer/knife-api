<?php

class User extends Mapper {
  public function getUserByID($userID) {
    $statement = $this->db->prepare("SELECT * FROM users WHERE userID = :userID");
    $statement->execute([
      ':userID' => $userID
    ]);
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  public function getAllNames() {
    $statement = $this->db->prepare(
      "SELECT username FROM users"
    );
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}
