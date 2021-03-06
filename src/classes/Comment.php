<?php

class Comment extends Mapper {
    
    public function getAll() {
    $statement = $this->db->prepare(
        "SELECT * FROM comments"
    );
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    // New comment
    public function post($entryID, $content, $createdBy) {
        $statement = $this->db->prepare(
            "INSERT INTO comments (entryID, content, createdBy, createdAt)
            VALUES (:entryID, :content, :createdBy, NOW())"
        );

        $statement->execute([
            ':entryID' => $entryID,
            ':content' => $content,
            ':createdBy' => $createdBy
        ]);
    }

    // Update comment
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

    // Delete comment
    public function delete($commentID) {
        $statement = $this->db->prepare(
            "DELETE FROM comments 
            WHERE commentID = :commentID"
        );
        $statement->execute([
            ':commentID' => $commentID
        ]);
    }

    // Get comments
    function getAllFromEntry($entryID) {
        $statement = $this->db->prepare(
            "SELECT * FROM comments 
            WHERE entryID = {$entryID}
            ORDER BY createdAt DESC"
        );
        $statement->execute();
        
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}
