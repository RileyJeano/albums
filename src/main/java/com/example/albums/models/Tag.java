package com.example.albums.models;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Tag {

	@Id
	@GeneratedValue
	private Long id;
	private String tagName;

	@ManyToMany
	private Collection<Artist> artists = new HashSet<Artist>();

	@ManyToMany
	private Collection<Album> albums = new HashSet<Album>();

	@ManyToMany
	private Collection<Song> songs = new HashSet<Song>();

	public Tag() {
	}

	public Tag(String tagName) {
		this.tagName = tagName;
	}

	public Long getId() {
		return id;
	}

	public String getTagName() {
		return tagName;
	}

	public void addArtist(Artist artist) {
		artists.add(artist);
	}

	public Collection<Artist> getArtists() {
		return artists;
	}

	public void addAlbum(Album album) {
		albums.add(album);
	}

	public Collection<Album> getAlbums() {
		return albums;
	}

	public void addSong(Song song) {
		songs.add(song);
	}

	public Collection<Song> getSongs() {
		return songs;
	}
}
