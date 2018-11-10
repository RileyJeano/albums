package com.example.albums.repo;

import static org.hamcrest.Matchers.hasItems;
import static org.junit.Assert.assertThat;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.albums.models.Artist;
import com.example.albums.repository.ArtistRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ArtistRepositoryTest {
	@Resource
	ArtistRepository repo;

	@Test
	public void shouldReturnAllAlbums() {
		Artist artist = repo.save(new Artist());
		Artist artist2 = repo.save(new Artist());

		// Act
		Iterable<Artist> result = repo.findAll();

		// Assert
		assertThat(result, hasItems(artist2));
	}
}
