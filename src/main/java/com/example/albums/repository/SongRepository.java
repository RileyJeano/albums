package com.example.albums.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.albums.models.Song;

public interface SongRepository extends CrudRepository<Song, Long> {

}
