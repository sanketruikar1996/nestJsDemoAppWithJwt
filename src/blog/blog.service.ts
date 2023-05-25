import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/Auth/Auth.guard';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

  getBlogs() {
    return this.blogRepo.find();
  }

  async createBlog(id: number, title: string, details: string, tags: string) {
    const blog = new Blog();
    (blog.id = id),
      (blog.title = title),
      (blog.details = details),
      (blog.tags = tags);

    await this.blogRepo.save(blog);
    return blog;
  }
}
