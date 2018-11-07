package com.example.albums.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.albums.models.Album;

public interface AlbumRepository extends CrudRepository<Album, Long> {

}
