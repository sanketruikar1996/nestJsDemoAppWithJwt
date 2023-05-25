import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Auth/Auth.guard';
import { BlogService } from './blog.service';
@UseGuards(AuthGuard)
@Controller('blog')
export class BlogController {
  constructor(private blgService: BlogService) {}

  @Get()
  getBlogs() {
    return this.blgService.getBlogs();
  }

  @Post('/createBlog')
  signUp(
    @Body('id') id: number,
    @Body('title') title: string,
    @Body('details') details: string,
    @Body('tags') tags: string,
  ) {
    return this.blgService.createBlog(id, title, details, tags);
  }
}
