import { LinksService } from './modules/links/links.service';
import { LinksModule } from './modules/links/links.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  imports: [LinksModule],
  controllers: [],
  providers: [LinksService, PrismaService],
})
export class AppModule {}
