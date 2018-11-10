package com.example.albums.repo;

import static org.hamcrest.Matchers.hasItem;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.albums.models.Song;
import com.example.albums.models.Tag;
import com.example.albums.repository.TagRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TagRepositoryTest {

	@Resource
	TagRepository tagRepo;

	@Test
	public void shouldAddATag() {
		Tag tag1 = new Tag("tag");
		tagRepo.save(tag1);

		Iterable<Tag> result = tagRepo.findAll();
		Assert.assertThat(result, hasItem(tag1));

	}

	public void shouldAddATagToSong() {
		Tag tag1 = new Tag("tag");

		Song song = new Song();
		song.addTag(tag1);

		Assert.assertThat(song.getTags(), hasItem(tag1));
	}
}
