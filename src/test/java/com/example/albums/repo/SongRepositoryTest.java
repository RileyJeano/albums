package com.example.albums.repo;

import static org.hamcrest.Matchers.hasItems;
import static org.junit.Assert.assertThat;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.albums.models.Song;
import com.example.albums.repository.SongRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class SongRepositoryTest {
	@Resource
	SongRepository repo;

	@Test
	public void shouldReturnAllAlbums() {
		Song song = repo.save(new Song());
		Song song2 = repo.save(new Song());

		// Act
		Iterable<Song> result = repo.findAll();

		// Assert
		assertThat(result, hasItems(song2));
	}
}
