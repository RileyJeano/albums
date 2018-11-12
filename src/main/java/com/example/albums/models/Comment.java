package com.example.albums.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.example.albums.models.Artist;

@Entity
public class Comment {
	@Id
	@GeneratedValue
	private Long id;
	private String username;
	private String content;

	@JsonIgnore
	@ManyToOne
	private Artist artist;


	@ManyToOne
	private Album album;

	@JsonIgnore
	@ManyToOne
	private Song song;

	public Comment() {

	}

	public Comment(String username, String content) {
		this.username = username;
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getContent() {
		return content;
	}

	public Artist getArtist() {
		return artist;
	}

	public Album getAlbums() {
		return album;
	}

	public Song getSong() {
		return song;
	}

	public void addSong(Song song) {
		this.song = song;
	}

	public void addAritst(Artist artist) {
		this.artist = artist;
	}

	public void addAlbum(Album album) {
		this.album = album;
	}
}
