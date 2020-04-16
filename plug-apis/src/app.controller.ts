import { Controller, Get, Res, Param } from '@nestjs/common';
import { readdirSync } from 'fs';
import { AppService } from './app.service';

const path = '/root/tms-cdn/cdn-web/files/chrome-plug/all/';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getRandomImg')
  async getRandomImg(): Promise<any> {
    const allFiles = await readdirSync(path);
    const files = [];
    allFiles.map(item => {
      if (/\.(png|jpg|gif|jpeg|webp)$/.test(item)) {
        files.push(item);
      }
    });
    return {
      data: `http://cdn.cocon.live:8008/api/img/${files[Math.floor((Math.random() * files.length))]}`,
    };
    // return res.sendFile(`${path}${files[Math.floor((Math.random() * files.length))]}`);
  }

  @Get('/img/:filename')
  async getImg(@Param('filename') filename, @Res() res): Promise<any> {
    return res.sendFile(`${path}${filename}`);
  }
}
