<?php

class Comment extends Mapper {
    
    public function getAll() {
    $statement = $this->db->prepare(
        "SELECT * FROM comments"
    );
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    
    // public function post($content) {
    //     $statement = $this->db->prepare(
    //         "INSERT INTO comments (entryID, content, createdBy, createdAt)
    //         VALUES (:entryID, :content, :createdBy, NOW())"
    //     );

    //     $statement->execute([
    //         ':entryID' => 1,
    //         ':content' => $content,
    //         ':createdBy' => 1
    //     ]);
    // }

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

    // function getAllFromEntry($entryID) {
    //     $statement = $this->db->prepare(
    //         "SELECT * FROM comments 
    //         INNER JOIN entries ON comments.entryID = entries.entryID 
    //         WHERE entries.entryID = {$entryID}"
    //     );
    //     $statement->execute();
        
    //     return $statement->fetchAll(PDO::FETCH_ASSOC);
    // }

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
