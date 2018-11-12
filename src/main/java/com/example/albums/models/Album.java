package com.example.albums.models;

import java.util.Collection;
import java.util.HashSet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Album {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String image;
	private int rating;

	@OneToMany(mappedBy = "album")
	private Collection<Song> songs = new HashSet<Song>();

	@JsonIgnore
	@ManyToOne
	private Artist artist;

	@JsonIgnore
	@ManyToMany
	private Collection<Tag> tags = new HashSet<Tag>();

	@OneToMany(mappedBy = "album")
	private Collection<Comment> comments = new HashSet<Comment>();

	public Album() {

	}

	public Album(String name, String image, Artist artist) {
		this.name = name;
		this.image = image;
		this.artist = artist;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public int getRating() {
		return rating;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getImage() {
		return image;
	}

	public Collection<Song> getSongs() {
		return songs;
	}

	public Artist getArtist() {
		return artist;
	}

	public void addTag(Tag tag) {
		tags.add(tag);
	}

	public Collection<Tag> getTags() {
		return tags;
	}

	public Collection<Comment> getComments() {
		return comments;
	}

}
