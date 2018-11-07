package com.example.albums.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.albums.models.Comment;

public interface CommentRepository extends CrudRepository<Comment, Long> {

}
