package com.example.albums.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.albums.models.Artist;

public interface ArtistRepository extends CrudRepository<Artist, Long> {

}
