<?php

class Comment extends Mapper {
  public function getComments() {
    $statement = $this->db->prepare("SELECT * FROM comments");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}
