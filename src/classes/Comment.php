<?php

class Comment extends Mapper {
    
    public function getAll() {
    $statement = $this->db->prepare("SELECT * FROM comments");
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function post($entryID, $content, $createdBy, $createdAt) {
        $statement = $this->db->prepare(
            "INSERT INTO comments (entryID, content, createdBy, createdAt)
            VALUES (:entryID, :content, :createdBy, :createdAt)"
        );

        $statement->execute([
            ':entryID' => $entryID,
            ':content' => $content,
            ':createdBy' => $createdBy,
            ':createdAt' => $createdAt
        ]);
    }
}
