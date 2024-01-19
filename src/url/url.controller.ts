import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UrlService } from './url.service';
import { Url } from './url.entity';
import { User } from '../auth/user.decorator';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(
    @Body('originalUrl') originalUrl: string,
    @User() user: User,
  ) {
    const url = await this.urlService.createShortUrl(originalUrl, user);
    return { shortUrl: url.shortUrl, clicks: url.clicks };
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async listUrls(@User() user: User): Promise<Url[]> {
    return this.urlService.getUrlsByUser(user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUrl(@Param('id') id: number, @User() user: User): Promise<void> {
    await this.urlService.deleteUrl(id, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUrlById(@Param('id') id: number, @User() user: User): Promise<Url> {
    return this.urlService.getUrlById(id, user);
  }

  // Other URL-related endpoints...
}
