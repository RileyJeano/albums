package com.example.albums.controller;

import java.util.Collection;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.albums.models.Album;
import com.example.albums.models.Artist;
import com.example.albums.models.Song;
import com.example.albums.models.Tag;
import com.example.albums.repository.AlbumRepository;
import com.example.albums.repository.ArtistRepository;
import com.example.albums.repository.CommentRepository;
import com.example.albums.repository.SongRepository;
import com.example.albums.repository.TagRepository;

@CrossOrigin
@RestController
public class ApiController {

	@Autowired
	AlbumRepository albumRepo;

	@Autowired
	ArtistRepository artistRepo;

	@Autowired
	CommentRepository commentRepo;

	@Autowired
	SongRepository songRepo;

	@Autowired
	TagRepository tagRepo;

	@GetMapping("/api/artists")
	public Collection<Artist> showArtists() {
		return (Collection<Artist>) artistRepo.findAll();
	}

	@GetMapping("/api/{artistId}/albums")
	public Collection<Album> showArtistsAlbums(@PathVariable(value = "artistId") Long artistId) {
		return (Collection<Album>) artistRepo.findById(artistId).get().getAlbums();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}")
	public Album showAlbum(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId) {
		return albumRepo.findById(albumId).get();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}/songs")
	public Collection<Song> showAnAlbumsSongs(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId) {
		return (Collection<Song>) albumRepo.findById(albumId).get().getSongs();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}/songs/{songId}")
	public Song showSong(@PathVariable(value = "artistId") Long artistId, @PathVariable(value = "albumId") Long albumId,
			@PathVariable(value = "songId") Long songId) {
		return songRepo.findById(songId).get();
	}

	@GetMapping("/api/albums")
	public Collection<Album> showAlbums() {
		return (Collection<Album>) albumRepo.findAll();
	}

	@GetMapping("/api/songs")
	public Collection<Song> showSongs() {
		return (Collection<Song>) songRepo.findAll();
	}

	@GetMapping("/api/tags")
	public Collection<Tag> showTags() {
		return (Collection<Tag>) tagRepo.findAll();
	}

	@PostMapping("/api/artist/add")
	public void addArtist(@RequestBody String artistContent) throws JSONException {
		JSONObject json = new JSONObject(artistContent);
		String artistName = json.getString("name");
		String artistImage = json.getString("image");
		String artistAge = json.getString("age");
		String artistHome = json.getString("home");
		Artist artist = new Artist(artistName, artistImage, artistAge, artistHome);
		artist = artistRepo.save(artist);
	}

	@PostMapping("/api/artists/{id}/albums/add")
	public void addAlbum(@PathVariable(value = "id") Long id, @RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(id).get();
		JSONObject json = new JSONObject(content);
		String albumName = json.getString("name");
		String albumImage = json.getString("image");

		Album album = new Album(albumName, albumImage, artist);
		album = albumRepo.save(album);
	}

}
