import { PrismaService } from './../../prisma.service';
import { Test } from '@nestjs/testing';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

describe('LinksController', () => {
  let linksController: LinksController;
  let linksService: LinksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [LinksService, PrismaService], // PrismaService needs to be injected, otherwise this will be undefined
    }).compile();

    linksService = moduleRef.get<LinksService>(LinksService);
    linksController = moduleRef.get<LinksController>(LinksController);
  });

  describe('create', () => {
    it('should create a new short url and return the entity with the code', async () => {
      const long_url = 'https://example.com?some=param';
      const hash = 'ShortBana4a';

      const result = {
        id: 1,
        long_url,
        hash,
        link: `https://banana.com/${hash}`,
      };

      jest
        .spyOn(linksService, 'generateShortCode')
        .mockImplementation(() => hash);

      jest.spyOn(linksService, 'create').mockImplementation(async () => result);

      expect(await linksController.create({ long_url })).toBe(result);
    });
  });
});
