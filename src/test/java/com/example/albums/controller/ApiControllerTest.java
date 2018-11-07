package com.example.albums.controller;

import static org.hamcrest.core.Is.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.example.albums.models.Album;
import com.example.albums.models.Artist;
import com.example.albums.models.Song;
import com.example.albums.models.Tag;

@RunWith(SpringRunner.class)
@WebMvcTest(ApiController.class)
public class ApiControllerTest {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private ApiController apiController;

	@Test
	public void testGetArtists() throws Exception {
		Artist artist = new Artist("Potatoe", "Potatoe", "Potatoe", "Potatoe");
		List<Artist> artists = Collections.singletonList(artist);
		given(apiController.showArtists()).willReturn(artists);
		mvc.perform(get("/api/artists").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name", is(artist.getName())));
	}

	@Test
	public void testGetAlbums() throws Exception {
		Artist artist = new Artist("", "", "", "");
		Album album = new Album("", "", artist);
		List<Album> albums = Collections.singletonList(album);
		given(apiController.showAlbums()).willReturn(albums);
		mvc.perform(get("/api/albums").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name", is(album.getName())));
	}

	@Test
	public void testGetSongs() throws Exception {
		Artist artist = new Artist("", "", "", "");
		Album album = new Album("", "", artist);
		Song song = new Song("", "", "", album);
		List<Song> songs = Collections.singletonList(song);
		given(apiController.showSongs()).willReturn(songs);
		mvc.perform(get("/api/songs").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name", is(song.getName())));
	}

	@Test
	public void testGetTag() throws Exception {
		Tag tag = new Tag("");
		List<Tag> tags = Collections.singletonList(tag);
		given(apiController.showTags()).willReturn(tags);
		mvc.perform(get("/api/tags").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$[0].tagName", is(tag.getTagName())));
	}

	@Mock
	Artist artist;

	@Test
	public void testPostAlbum() throws Exception {
//		Artist artist = new Artist("", "", "", "");

		given(artist.getId()).willReturn(1L);
		Album album = new Album("", "", artist);
		List<Album> albums = Collections.singletonList(album);
		mvc.perform(post("/api/artists/1/albums/add").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

//		String jsonString = "{\"hello\":\"world\"}";
//		mvc.perform(post("/api/artists/1/albums/add").content(jsonString).header("body", "image"));

	}

}
