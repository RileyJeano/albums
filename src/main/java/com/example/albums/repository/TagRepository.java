package com.example.albums.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.albums.models.Tag;

public interface TagRepository extends CrudRepository<Tag, Long> {

	Tag findByTagName(String tagName);
}
