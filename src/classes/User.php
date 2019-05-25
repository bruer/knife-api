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

  // Registrera användare 
  public function registerUser($username, $password) {
    $statement = $this->db->prepare(
      "INSERT INTO users(username, password)
      VALUES(:username, :password)"
    );
    $statement->execute([
      ':username' => $username,
      ':password'=> password_hash($_POST['password'], PASSWORD_BCRYPT)
    ]);
  }

  // Ta bort användare
  public function deleteUser($userID) {
    $statement = $this->db->prepare(
        "DELETE FROM users 
        WHERE userID = :userID"
    );
    $statement->execute([
        ':userID' => $userID
    ]);
}
}