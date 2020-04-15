import { Controller, Get, Res } from '@nestjs/common';
import { readdirSync } from 'fs';
import { AppService } from './app.service';

@Controller('/api/getRandomImg')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getRandomImg(@Res() res): Promise<any> {
    const path = '/root/tms-cdn/cdn-web/files/chrome-plug/all/';
    const allFiles = await readdirSync(path);
    const files = [];
    allFiles.map(item => {
      if (/\.(png|jpg|gif|jpeg|webp)$/.test(item)) {
        files.push(item);
      }
    });
    return res.sendFile(`${path}${files[Math.floor((Math.random() * files.length))]}`);
  }
}
