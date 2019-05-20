<?php

class User extends Mapper {
  // Hämtar specifik användare
  public function getUserByID($userID) {
    $statement = $this->db->prepare("SELECT * FROM users WHERE userID = :userID");
    $statement->execute([
      ':userID' => $userID
    ]);
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  // Hämtar alla användare
  public function getAllUsers(){
    $statement = $this->db->prepare("SELECT username FROM users");
    $statement->execute();

    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}