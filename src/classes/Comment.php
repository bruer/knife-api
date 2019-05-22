<?php

class Comment extends Mapper {
    
    public function getAll() {
    $statement = $this->db->prepare(
        "SELECT * FROM comments"
    );
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

    public function update($commentID, $content) {
        $statement = $this->db->prepare(
            "UPDATE comments 
            SET content = :content
            WHERE commentID = :commentID"
        );
        $statement->execute([
            ':commentID' => $commentID,
            ':content' => $content
        ]);
    }

    public function delete($commentID) {
        $statement = $this->db->prepare(
            "DELETE FROM comments 
            WHERE commentID = :commentID"
        );
        $statement->execute([
            ':commentID' => $commentID
        ]);
    }
}
