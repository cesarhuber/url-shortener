import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  generateShortUrl(length: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      hash += characters.charAt(randomIndex);
    }

    return hash;
  }

  async createShortUrl(originalUrl: string, user: User): Promise<Url> {
    const shortUrl = this.generateShortUrl();
    const url = this.urlRepository.create({ originalUrl, shortUrl, user });
    return await this.urlRepository.save(url);
  }

  async getUrlsByUser(user: User): Promise<Url[]> {
    return await this.urlRepository.find({ where: { user } });
  }

  async deleteUrl(id: number): Promise<void> {
    await this.urlRepository.softDelete(id);
  }

  async getUrlById(id: number, user: User): Promise<Url> {
    return await this.urlRepository.findOne({ where: { id, user } });
  }

  // Other URL-related operations...
}
